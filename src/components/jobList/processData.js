export const processData = async (request, params, paymentFromForContext, keyword, pageForRequest) => {
  let filteredJobs = [];

  let page = pageForRequest; // страница для определения порций данных
  
  while (filteredJobs.length < 20) {
    let additionalJobs;

    if (params && keyword) {
      additionalJobs = await request(params, keyword, page);
    } else if (params) {
      additionalJobs = await request(params, page);
    } else if (keyword) {
      additionalJobs = await request({}, keyword, page);
    }
    console.log('additionalJobs', additionalJobs)


    const filteredAdditionalJobs = (additionalJobs || []).filter(
      item => item.payment_from >= paymentFromForContext
    );// добавил проверку с [] для избежания ошибки Cannot read properties of undefined (reading 'filter')

    const combinedJobs = [...filteredJobs, ...filteredAdditionalJobs];

    const finallyJobs = combinedJobs.length <= 20 ? combinedJobs : combinedJobs.slice(0, 20);
    
    page++
    
    console.log('page', page)
    filteredJobs = finallyJobs;
    if (filteredJobs.length >= 20) {
      break;
    }

  }
  
  return filteredJobs;
}; 



/* import { useState, useContext } from "react";
import { JobsContext } from '../app/App';

export function useProcessData() {

const { usedPages, setUsedPages } = useContext(JobsContext)//использованые страницы для сервера
const [data, setData] = useState()//данные для экспорта из компонента

const processData = async (request, params, paymentFromForContext, keyword, pageForRequest) => {
  let filteredJobs = [];
  let page;

  if(usedPages.includes(pageForRequest)){
      page = usedPages+1;
    } else{
      page = pageForRequest;
    } // страница для определения порций данных

  
  while (filteredJobs.length < 20) {
    let additionalJobs;

    if (params && keyword) {
      additionalJobs = await request(params, keyword, page);
    } else if (params) {
      additionalJobs = await request(params, page);
    } else if (keyword) {
      additionalJobs = await request({}, keyword, page);
    }
    console.log('additionalJobs', additionalJobs)


    const filteredAdditionalJobs = (additionalJobs || []).filter(
      item => item.payment_from >= paymentFromForContext
    );// добавил проверку с [] для избежания ошибки Cannot read properties of undefined (reading 'filter')

    const combinedJobs = [...filteredJobs, ...filteredAdditionalJobs];

    const finallyJobs = combinedJobs.length <= 20 ? combinedJobs : combinedJobs.slice(0, 20);
    
    page++
    setUsedPages(page)
    console.log('page', page)
    filteredJobs = finallyJobs;
    if (filteredJobs.length >= 20) {
      break;
    }

  }
  
  setData(filteredJobs);
  };

return data;
} */



