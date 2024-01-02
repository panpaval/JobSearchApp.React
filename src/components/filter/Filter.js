import { useState, useContext } from 'react';
import { JobsContext } from '../app/App';
import { Button, Select, NumberInput, Box, useMantineTheme} from '@mantine/core';
import './filter.css'
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
import { useFetchIndustries } from './filterHook';
import { request } from '../services/Superjobservice';
import { processData } from '../jobList/processData';


const initialFilters = {
  industry: '',
  salaryMin: '',
  salaryMax: '',
};

function Filter() {
  
  const [filters, setFilters] = useState(initialFilters);

  const {
          setData, 
          setPaymentFromForContext, 
          setLoadedPages, 
          setParamsForJLRequest, 
          setKeyword, 
          setCurrentPage, 
          setLoadingMore,  
          keyword,
          setPageForRequest } = useContext(JobsContext)

  const theme = useMantineTheme();

  const industriesData = useFetchIndustries();
  
   const options = industriesData?.map(item => ({
    value: item.key,
    label: item.title_rus
  }));

  
   const processDataWrapper = async (data, params) => {    
    const page = 0;
    let filteredData = data.filter(item => item.payment_from >= params.payment_from);
    
    if(filteredData.length < 20) {
      filteredData = await processData(request, params, params.payment_from, keyword, page); 
    }
    const newData = filteredData;

    return newData     
  } 
  
  const handleSubmit = async () => {
    const page = 0;
    setPageForRequest(1);

    let data;
    console.log('filters', filters)
    const params = {
      catalogues: filters.industry, 
      payment_from: filters.salaryMin,
      payment_to: filters.salaryMax
    };
    
    if(params.catalogues) {
      setKeyword('');
      setCurrentPage(1);
    }
    setPaymentFromForContext(params.payment_from);
    setParamsForJLRequest(params)
    setLoadingMore(true);
    
    if(params.catalogues || params.payment_from){
       data = await request(params, keyword, page);
      }
    if(data){
    const filteredData = await processDataWrapper(data, params);//обернул в условие что бы починит баг с красным экрамном после "применить" на пустых фильтрах
    setData(filteredData);
    console.log('filteredData', filteredData)
    }
    
    setLoadedPages([]);
    setLoadingMore(false);
     
  }
      

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setLoadedPages([]);
    setKeyword('');
    setCurrentPage(1);
    setLoadingMore(false);
    setPageForRequest(1);
  };

  const handleFilterChange = (field, value) => {
    if (value < 0) {
      value = 0;
    }

    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  
  
  return (

    
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', height: '315px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', lineHeight: '20px', fontWeight: "bolder", fontFamily: 'Inter', fontStyle: 'normal' }}>Фильтры</h2>
        <Button style={{color: '#ACADB9', height: '0%', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 500, fontSize: "14px", lineHeight: "20px"}}
        variant="link" onClick={handleResetFilters}>
          Сбросить всё
        </Button>
      </div>

      <Box onSubmit={handleSubmit}>

        <h2 style={{ marginBottom: '8px', fontSize: '16px', lineHeight: '19px', fontWeight: '900', fontFamily: 'Inter', fontStyle: 'normal' }}>Отрасль</h2>
        <Select
          rightSection={<ChevronDown color={'#ACADB9'} size={30} strokeWidth={1.5} />} 
          styles={{ rightSection: { pointerEvents: 'none' } }}
          size='md'
          transitionProps={{ transition: 'pop-top-left', duration: 200, timingFunction: 'ease' }}
          data={options}
          placeholder="Выберите отрасль"
          value={filters.industry}
          onChange={(value) => handleFilterChange('industry', value)}
        />

        
          <h2 style={{ marginBottom: '8px', marginTop: '20px', fontSize: '16px', lineHeight: '19px', fontWeight: '900', fontFamily: 'Inter', fontStyle: 'normal' }}>Оклад</h2>
         
          <NumberInput
            placeholder="От"
            min={0}
            step={5000}
            size='md'
            rightSection={  
                            <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'space-around'  }}>
                            <div onClick={() => handleFilterChange('salaryMin', Number(filters.salaryMin) + 5000)}  
                            style={{   }}>
                            <ChevronUp size={15} color={'#ACADB9'} display={'block'}/>
                            </div>
                            <div onClick={() => handleFilterChange('salaryMin', Number(filters.salaryMin) - 5000)}  style={{  }} >
                            <ChevronDown  size={15} color={'#ACADB9'} display={'block'} />  
                            </div>
                            </div>

                          }
            value={filters.salaryMin}
            onChange={(value) => handleFilterChange('salaryMin', value)}
            style={{ borderRadius: '8px', height: '40px', width: '275px', marginBottom: '8px' }}

          />
          <NumberInput
            size='md'
            placeholder="До"
            style={{ borderRadius: '8px', height: '40px', width: '275px' }}
            min={0}
            step={5000}
            rightSection={  
                            <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'space-around'  }}>
                            <div onClick={() => handleFilterChange('salaryMax', Number(filters.salaryMax) + 5000)}  
                            style={{   }}>
                            <ChevronUp size={15} color={'#ACADB9'} display={'block'}/>
                            </div>
                            <div onClick={() => handleFilterChange('salaryMax', Number(filters.salaryMax) - 5000)}  style={{  }} >
                            <ChevronDown  size={15} color={'#ACADB9'} display={'block'} />  
                            </div>
                            </div>
                          }
            value={filters.salaryMax}
            onChange={(value) => handleFilterChange('salaryMax', value)}
          />

        <Button  
        
        onClick={handleSubmit}
        style={{ marginTop: theme.spacing.md, backgroundColor: '#5E96FC', borderRadius: '8px', height: '40px', width: '275px' }}
        type="submit" variant="filled" >
          
          Применить
        </Button>
      </Box>
    </div>
    
  );
}


export default Filter;


/*     let filteredData = data.filter(item => item.payment_from >= params.payment_from);
    
    if(filteredData.length < 20) {
      const additionalData = await request(params);
      const filteredAdditionalData = additionalData.filter(item => item.payment_from >= params.payment_from);
      filteredData = [...filteredData, ...filteredAdditionalData];
    }

    let newData = filteredData;
    
    while(newData.length < 20) {
      const additionalData = await request(params);
      const filteredAdditionalData = additionalData.filter(item => item.payment_from >= params.payment_from);
      newData = [...newData, ...filteredAdditionalData];
      
    }

    if(newData.length > 20) {
      newData = newData.slice(0, 20);
    }

    return newData */