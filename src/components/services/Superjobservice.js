import { useState, useCallback } from "react";


export const FetchSuperJobData = () => {
  
  const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
  const jobid = 44;

  const [loading, setLoading] = useState(false);

  const request = useCallback(async () => {
    
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.052dbb4d62538fab11c93ccff5d4b7e9d3719772.22c24c494942cfc1291dcb7043605691a6c080e1'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false)//куда ставить?
      const data = await response.json();
      //положить в локал сторадж
      return data.objects || [];
      //или сюда?
    
    } catch (error) {
      console.error('Error fetching SuperJob data:', error);
      
      setLoading(false);
    }
  }, [API_KEY, apiUrl]);



  const requestSingleVacancy = useCallback(async () => {
    
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}${jobid}`, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.052dbb4d62538fab11c93ccff5d4b7e9d3719772.22c24c494942cfc1291dcb7043605691a6c080e1'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false)
      const data = await response.json();
      return data.objects || [];
    
    } catch (error) {
      console.error('Error fetching SuperJob data:', error);
      
      setLoading(false);
    }
  }, [API_KEY, apiUrl]);

  return { loading, request, requestSingleVacancy};
};



/* async function fetchSuperJobData() {


  const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'; 

  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';

  const apiUrlID ='https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/:id/'

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-App-Id': API_KEY,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': 'Bearer v3.r.137440105.6f619c6f8f1e989bcc8020366665282a751c5c44.3eee79de7fb5bda8061414341307e1fd6d8c0576'
      },
      
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();
    return data.objects || [];
  } catch (error) {
    console.error('Error fetching SuperJob data:', error);
  }
}


export default fetchSuperJobData; */