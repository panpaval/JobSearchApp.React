
import { useState, useCallback } from "react";



export const FetchSuperJobData = () => {
  
  const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
  const apiUrlcatalogues = 'https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/' 
 


  const [loading, setLoading] = useState(false);

  const requestIndustryName = useCallback(async () => {
    
    setLoading(true);

    try {
      const response = await fetch(apiUrlcatalogues, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.4ed7dd0156259873295df77d13e864e41425168f.ee30c027043ae8ec9e2d92596b806356beaaa40d'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false)
      const data = await response.json();
      console.log(data);
      return data.objects || [];
      
    
    } catch (error) {
      console.error('Error fetching SuperJob data:', error);
      
      setLoading(false);
    }
  }, [API_KEY, apiUrlcatalogues]);



  const request = useCallback(async () => {
    
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.4ed7dd0156259873295df77d13e864e41425168f.ee30c027043ae8ec9e2d92596b806356beaaa40d'
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

  


  const requestSingleVacancy = useCallback(async (id) => {
    
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}${id}`, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.4ed7dd0156259873295df77d13e864e41425168f.ee30c027043ae8ec9e2d92596b806356beaaa40d'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false)
      const data = await response.json();
      console.log(data);
      return data;
    
    } catch (error) {
      console.error('Error fetching SuperJob data:', error);
      
      setLoading(false);
    }
  }, [API_KEY, apiUrl]);

  return { loading, request, requestSingleVacancy, requestIndustryName };
};



/* import { useState, useEffect, useCallback } from "react";

export const FetchSuperJobData = () => {

  const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
  
  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';

  const [id, setId] = useState(null);

  const [singleData, setSingleData] = useState(null);

  const [loading, setLoading] = useState(false);

  const request = useCallback(async () => {

    setLoading(true);

    try {
    
      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.573f13fc0387b26f7f3ced71443a6c7f7a326cd5.94824a8137fdec25c59c5d3746a17374c88bef2c'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false);
      
      const data = await response.json();

      return data.objects || [];

    } catch (error) {

      console.error('Error fetching SuperJob data:', error);

      setLoading(false);
    }

  }, [API_KEY, apiUrl]);

  const requestSingleVacancy = useCallback(async (id) => {

    setLoading(true);

    try {

      const response = await fetch(`${apiUrl}${id}`, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.573f13fc0387b26f7f3ced71443a6c7f7a326cd5.94824a8137fdec25c59c5d3746a17374c88bef2c'
        },
      });

      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }

      setLoading(false);

      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
    
      console.error('Error fetching SuperJob data:', error);

      setLoading(false);
    }

  }, [API_KEY, apiUrl, setSingleData]);

  useEffect(() => {
    if (!singleData && id) {
      requestSingleVacancy(id);
    }
  }, [singleData, id]);

  const updateId = (newId) => {
    setId(newId);
  };

  return {
    loading,
    request,
    requestSingleVacancy,  
    updateId 
  };

}; */






/* export const useRequest = () => {
    const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
    const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
  
    const [loading, setLoading] = useState(true);
  
    const request = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-App-Id': API_KEY,
            'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
            'Authorization': 'Bearer v3.r.137440105.e303fd6e7162b4671d170c72460a2b9a93435618.4cf62e4c0162508998a8d65830a115e6ddd0eae4'
          },
        });
  
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }
  
        const data = await response.json();
        setLoading(false);
        // положить в локал сторадж
        return data.objects || [];
      } catch (error) {
        console.error('Error fetching SuperJob data:', error);
        setLoading(false);
        throw error;
      }
    };
  
    return {request, loading};
  };
  

export const useRequestSingleVacancy = (id) => {
  const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
  const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';

  const [loading, setLoading] = useState(true);

  const requestSingleVacancy = async () => {
  try {
    const response = await fetch(`${apiUrl}${id}`, {
      headers: {
        'X-Api-App-Id': API_KEY,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': 'Bearer v3.r.137440105.e303fd6e7162b4671d170c72460a2b9a93435618.4cf62e4c0162508998a8d65830a115e6ddd0eae4'
      },
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();
    setLoading(false);
    return data;
  } catch (error) {
    console.error('Error fetching SuperJob data:', error);
    setLoading(false);
    throw error;
  }
}

return{ loading, requestSingleVacancy}
};
 */
/////////////////////////////////////////////////////////////////////


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