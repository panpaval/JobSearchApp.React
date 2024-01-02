const API_KEY = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948';
const API_URL = 'https://startup-summer-2023-proxy.onrender.com/2.0';


// url - string, /vacancies
// params - { }
// query - { }


function handleApiCall(url, params, query) {
    const apiUrl = API_URL + url;
    /* if(params) { } */
    if(query) { }
    try {
    fetch(apiUrl, {
        headers: {
          'X-Api-App-Id': API_KEY,
          'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
          'Authorization': 'Bearer v3.r.137440105.5371eaac28259eb562bff7cddfe5e2b8224902c0.fb14b2a77e3e23aacfb50ca735c883f3b7de8c66'
        }
      }) 
    } catch (error) {}
    }

