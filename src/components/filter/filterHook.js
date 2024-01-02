import { useState, useEffect } from 'react';
import { requestIndustryName } from '../services/Superjobservice'; 

export function useFetchIndustries() {

    const [options, setOptions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        
        try{
        
        const response = await requestIndustryName();
        
        setOptions(response);
        } catch(error) {
        console.log(error);
        setOptions(null);
        
        } finally {
          
        }
      };
  
      fetchData();
    }, []);

    return options || [];

  };