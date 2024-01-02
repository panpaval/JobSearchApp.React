/* 
function handleAPICall() {}
handleApiCall(url, params, query) {}

fetchJobs() {
const data = handleApiCall('/vacancies', {...}, {...});
}


function handleApiCall(url, params, query) {
  if(params) {....}
  if(query) {...}
  try {
   fetch(url) .....
  } catch (error) {}
  } */


const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
const apiUrl = 'https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/';
const apiUrlcatalogues = 'https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/' 


export const requestIndustryName = async () => {

  try {
    const response = await fetch(apiUrlcatalogues, {
      headers: {
        'X-Api-App-Id': API_KEY,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': 'Bearer v3.r.137440105.4a5f2d7cf14dd17a20cffafd9ec5d765a4775dab.97d4ba65796bf00d4d0f26b942a1042b79df394e'
      },
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();
    return data;
  
  } catch (error) {
    console.error('Error fetching SuperJob data:', error);
  }
};

export const request = async (params, keyword, page = 1) => {
  // Добавляем параметр page к URL
  const apiUrlQuery = keyword
    ? `${apiUrl}?${new URLSearchParams(params)}&keyword=${keyword}&page=${page}`
    : `${apiUrl}?${new URLSearchParams(params)}&page=${page}`;

  try {
    const response = await fetch(apiUrlQuery, {
      headers: {
        'X-Api-App-Id': API_KEY,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': 'Bearer v3.r.137440105.4a5f2d7cf14dd17a20cffafd9ec5d765a4775dab.97d4ba65796bf00d4d0f26b942a1042b79df394e'
      }
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();
    return data.objects || [];

  } catch (error) {
    console.error('Error fetching SuperJob data:', error);
  }
};



 export const requestSingleVacancy = async (id) => {
    
  try {
    const response = await fetch(`${apiUrl}${id}`, {
      headers: {
        'X-Api-App-Id': API_KEY,
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': 'Bearer v3.r.137440105.4a5f2d7cf14dd17a20cffafd9ec5d765a4775dab.97d4ba65796bf00d4d0f26b942a1042b79df394e'
      },
    });

    if (!response.ok) {
      throw new Error('Request failed with status: ' + response.status);
    }

    const data = await response.json();
    
    return data;
  
  } catch (error) {
    console.error('Error fetching SuperJob data:', error);
    
  }
};

