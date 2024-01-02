import React from 'react';
import { useState } from 'react';
import Header from '../header/Header'
import SearchPanel from '../search/Search';
import Filter from '../filter/Filter';
import JobList from '../jobList/JobList';
import './app.css';


export const JobsContext = React.createContext();

function App() {

  const [data, setData] = useState([]);
  const [pageForRequest, setPageForRequest] = useState(1)
  const [paymentFromForContext, setPaymentFromForContext] = useState(0)
  const [paramsForJLRequest, setParamsForJLRequest] = useState(null)
  const [keyword, setKeyword] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState([]);// Использоаваные страницы пагинации кратные пяти
  const [usedPages, setUsedPages] = useState(0); //Использованые станицы для запросов на сервер
  
  return (
    <JobsContext.Provider 
    value={{
        paymentFromForContext,
        setPaymentFromForContext,
        paramsForJLRequest,
        setParamsForJLRequest,
        keyword,
        setKeyword, 
        loadingMore, 
        setLoadingMore, 
        currentPage, 
        setCurrentPage,
        data, 
        setData,
        loadedPages, 
        setLoadedPages,
        pageForRequest, 
        setPageForRequest,
        usedPages, 
        setUsedPages
          }}>
    
      <div className="content-wrap">
      
        <Header />
        
        <div className="main">
        
          <div className="container">

            <div className="filter-wrap">
              <Filter  /> 
            </div>

            <div className="frame">
              <SearchPanel />
              
              <JobList />
              
            </div>

          </div>
        
        </div>
      
      </div>
    
    </JobsContext.Provider>
  );

}

export default App;
