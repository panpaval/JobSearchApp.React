import { useState, useEffect } from 'react';
import { FetchSuperJobData } from '../services/Superjobservice';

export function useFetchIndustries() {

    const [options, setOptions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try{
        const { requestIndustryName } = FetchSuperJobData();
        const response = await requestIndustryName();
        const data = await response.json();
        
        /* if(data) {
          console.log('!', data); 
        } */ 
        setOptions(data);
        } catch(error) {
        console.log(error);
        setOptions(null);
        setError(error)
        } finally {
          setLoading(false)
        }
      };
  
      fetchData();
    }, []);
  
    console.log('options', options);
    return options || [];

  };