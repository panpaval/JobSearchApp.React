import { useState, useEffect, useCallback } from 'react';
import { Button, Select, NumberInput, Box, useMantineTheme} from '@mantine/core';
import './filter.css'
import { ChevronDown, ChevronUp } from 'tabler-icons-react';
import { FetchSuperJobData } from '../services/Superjobservice';
import { useFetchIndustries } from './filterHook';



const initialFilters = {
  industry: '',
  salaryMin: '',
  salaryMax: '',
};

function Filter() {
  
  const [filters, setFilters] = useState(initialFilters);
  const theme = useMantineTheme();
  

  const industriesData = useFetchIndustries();
  console.log(industriesData)
  let options;
  if (industriesData) {
    options = industriesData?.map(item => ({
    value: item.key,
    label: item.title_rus
  }));
  }

  /* const options = industriesData?.map(item => ({
    value: item.key,
    label: item.title_rus
  })); */

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleFilterChange = (field, value) => {

    if (value < 0) {
      value = 0;
    }

    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleSubmit = (formData) => {
    console.log(formData); // Обрабатываем данные формы
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

        <Button style={{ marginTop: theme.spacing.md, backgroundColor: '#5E96FC', borderRadius: '8px', height: '40px', width: '275px' }}
        
        type="submit" variant="filled" >
          Применить
        </Button>
      </Box>
    </div>
    
  );
}


export default Filter;


/*   const handleIncrement = () => {
    console.log('clic ebany')
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryMin: Number(prevFilters.salaryMin) + 5000, 
    }));
  };

  const handleDecrement = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryMin: Number(prevFilters.salaryMin) - 5000, 
    }));

  }; используя этот вариант нужно было продублировать этот код с salaryMax и передеать в соответвующие onClick={}*/
