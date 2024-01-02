import React, { useState, useEffect, useContext } from 'react';
import { Pagination } from '@mantine/core';
import SkeletonForJobList from '../skeleton/skeleton';
import JobDescription from '../jobdescription/jobdescription';
import Item from '../jobItem/JobItem';
import './jobList.css';
import { JobsContext } from '../app/App';
import { processData } from './processData';
import { request } from '../services/Superjobservice';

const JobList = () => {

  const itemsPerPage = 4;
  const [selectedJobId, setSelectedJobId] = useState(null); //для JobDescription

  const {  
          data = [], 
          setData,
          paymentFromForContext, 
          paramsForJLRequest, 
          keyword, 
          loadingMore, 
          setLoadingMore, 
          currentPage, 
          setCurrentPage,
          loadedPages, 
          setLoadedPages,
          pageForRequest, 
          setPageForRequest
                           } = useContext(JobsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMore(true);
        const response = await request();

        setData(response);
        setLoadingMore(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingMore(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.map((item) => {
    const {
      profession,
      client: { title: firm_name },
      town: { title: town },
      catalogues,
      type_of_work,
      payment_to,
      payment_from,
      currency,
      id,
      vacancyRichText,
    } = item;

    const industry = catalogues.length > 0 ? catalogues[0].title : '';

    return {
      profession,
      firm_name,
      town,
      industry,
      type_of_work: type_of_work.title,
      payment_to,
      payment_from,
      currency,
      id,
      vacancyRichText,
    };
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const limitedData = filteredData.slice(startIndex, endIndex);

  const loadMoreData = async () => {

    try {
      setLoadingMore(true); 
      const response = (paramsForJLRequest || keyword) ? await processData(request, paramsForJLRequest, paymentFromForContext, keyword, pageForRequest) : await request({}, keyword, pageForRequest); 
      
      console.log('response', response)

      setData([...data, ...response]); 
      setLoadingMore(false); 
    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoadingMore(false); 
    }
  };  
  

  // Пагинация с одним вызовом каждой пятой страницы и задающая параметр page для сервера(setPageForRequest)
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    if (page % 5 === 0) {
      setPageForRequest(prev => prev + 1); 
    }
    console.log('pageForRequest',pageForRequest)
    if (page > currentPage && page % 5 === 0 && !loadedPages.includes(page)) {

      loadMoreData();
      setLoadedPages([...loadedPages, page]);
    }
  };


  
  const handleClickToJobDescription = (id) => {
    setSelectedJobId(id);
  }; 

  // Управление пагинацией с клавиатуры
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      handlePaginationChange(currentPage + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
       {selectedJobId ? (
        <JobDescription jobId={selectedJobId} />
      ) : ( 
        <>
          {loadingMore ? (
            <SkeletonForJobList />
          ) : (
            <>
              {limitedData.map((item) => (
                <Item key={item.id} data={item} onClick={() => handleClickToJobDescription(item.id)} />
              ))}

              <div>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={handlePaginationChange}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: 'fit-content',
                    paddingTop: '40px',
                  }}
                />
              </div>
            </>
          )}
        </>
       )} 
    </div>
  );
};


export default JobList;








/* 
   useEffect(() => {

    const processDataJobList =  async () => {
      const filteredJobs = await processData(request, paramsForJLRequest, paymentFromForContext, keyword);//???добавить сюда page, что бы уникальный массив приходил для кейворд???
      setAdditionalJobsData(filteredJobs);
      setArrayControl(filteredJobs);
    };
    
    if (jobs.length > 0) {
      const filteredJobs = jobs.filter((item) => item.payment_from >= paymentFromForContext);
      if (filteredJobs.length < 20) {
        processDataJobList();
      } else {
        setAdditionalJobsData(filteredJobs);
      }

    } else {
      setAdditionalJobsData(data);
    }
    
    
  }, [jobs, paymentFromForContext, paramsForJLRequest, request, data, keyword]);   */

  
   /* 
   useEffect(() => {
    const processDataWrapper = async () => {
      const filteredJobs = await processData(request, paramsForJLRequest, paymentFromForContext, keyword);
      setData(filteredJobs);
    };

    if (data.length > 0) {
      
      const filteredJobs = data.filter((item) => item.payment_from >= paymentFromForContext);
      if (filteredJobs.length < 20) {
        processDataWrapper();
      }

    } else {
      setData(data);
    
    }
  }, [paymentFromForContext, paramsForJLRequest, setData, data, keyword, setLoadingMore]);  */