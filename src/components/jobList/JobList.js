import React from 'react';
import Item from '../jobItem/JobItem';
import { FetchSuperJobData } from '../services/Superjobservice';
import { useState, useEffect } from 'react';
import { Pagination } from '@mantine/core';
import SkeletonForJobList from '../skeleton/skeleton';
import JobDescription from '../jobdescription/jobdescription';
import './jobList.css'
  


const JobList = () => {
  const {loading, request} = FetchSuperJobData();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);//для JobDescription
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMore(true);
        const response = await request();

        setData(response);
        setPageNumber(1);
        setLoadingMore(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingMore(false);
      }
    };

    fetchData();
  }, [request]);
  

  const loadMoreData = async () => {
    try {
      setLoadingMore(true); // Start loading more data
      const nextPage = pageNumber + 1;
      const response = await request({ page: nextPage });

      setData((prevData) => [...prevData, ...response]);
      setPageNumber(nextPage);
      setLoadingMore(false); // Stop loading more data

    } catch (error) {
      console.error('Error fetching more data:', error);
      setLoadingMore(false); // Stop loading more data on error
    }
  };

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
      vacancyRichText
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
      vacancyRichText
    };

  });


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const limitedData = filteredData.slice(startIndex, endIndex);

  


  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    if (page % 5 === 0 ) {
      // If user navigates to the 5th page, load more data
      loadMoreData();
    }
  };

  const handleClickToJobDescription = (id) => {
    setSelectedJobId(id); //правильно достаю Id?
}




  return (
    <div>

        {selectedJobId ? (
          <JobDescription jobId={selectedJobId} />
        ) : (
          <>
            {loading ? <><SkeletonForJobList /></> : limitedData.map((item) => (
              <Item key={item.id} data={item} onClick={() => handleClickToJobDescription(item.id)} />
            ))}
          </>
        )}

{/*         {loading ? <> <SkeletonForJobList /> </>: limitedData.map((item) => (
          <Item key={item.id} data={item} />
        ))} */}
      
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
    </div>
  );
};

export default JobList;

