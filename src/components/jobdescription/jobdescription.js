
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FetchSuperJobData } from '../services/Superjobservice';
import SkeletonForJobList from '../skeleton/skeleton';
import './jobdescription.css'

function useFetchJobDetails(jobId) {

  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const { requestSingleVacancy } = FetchSuperJobData();
  // Используем useCallback для мемоизации функции запроса
  const fetchDetails = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await requestSingleVacancy(jobId);
      setJobDetails(response);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }

  }, [ requestSingleVacancy, jobId]);

  useEffect(() => {
    if (jobId) {
      fetchDetails();
    }
  }, [ fetchDetails, jobId])

  return { loading, jobDetails };

}



const JobDescription = ({ jobId }) => {


  const { loading, jobDetails } = useFetchJobDetails(jobId);

  const vacancyRichText = jobDetails?.vacancyRichText;
  const profession = jobDetails?.profession;

  // Используем useMemo для мемоизации
  const sections = useMemo(() => {
    return vacancyRichText?.split('<p>') || [];
  }, [vacancyRichText])

  return (

    //сделать условие на loading что бы подставлять скелетон во время зашрузки
<div>
      {loading ? (
        // Если loading равно true, показываем скелетон или текст загрузки
        <SkeletonForJobList />
      ) : (
        <>
          {/* <h2>{profession}</h2> */}
        <div style={{ padding: '24px',marginTop: '16px', backgroundColor: 'white', borderRadius: '10px'}}>
          <div>
            <h3>Обязанности:</h3>
            <ul>
              {sections[1] && (
                sections[1].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                )) 
              )}
            </ul>
          </div>

          <div>
            <h3>Требования:</h3>
            <ul>
              {sections[2] && (
                sections[2].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                ))
              )}
            </ul>
          </div>

          <div>
            <h3>Условия:</h3>
            <ul>
              {sections[3] && (
                sections[3].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                ))
              )}
            </ul>
          </div>
        </div> 
        </>
      )}
    </div>
  );
}

export default JobDescription;

/* 
Давайте кратко запишем последовательность действий и причины:

Было:

Компонент JobDescription рендерился лишние разы из-за отсутствия проверок в useEffect:


useEffect(() => {
  fetchJobDetails(); 
}, [jobId])
Запрос данных происходил при каждом рендере, так как callback функция не была мемоизирована:


const fetchJobDetails = async () => {
  // запрос
}
Стало:

Добавили проверку на изменение jobId в useEffect:


useEffect(() => {
  if (jobId) {
    fetchDetails();
  }
}, [jobId])
Применили useCallback для мемоизации функции запроса:


const fetchDetails = useCallback(async () => {
  // запрос 
}, [jobId])
Теперь компонент рендерится и делает запрос только при обновлении нужных данных.

Это оптимизирует производительность за счет предотвращения лишних вычислений и эффектов. Использование хуков как useCallback и проверки в useEffect - хорошая практика в React. */











//вариант в котором были ререндеры
/* import { useState, useEffect } from 'react';
import { FetchSuperJobData } from '../services/Superjobservice';
import SkeletonForJobList from '../skeleton/skeleton';
import './jobdescription.css'


const JobDescription = ({ jobId }) => {
  const { loading, request, requestSingleVacancy } = FetchSuperJobData();
  const [jobDetails, setJobDetails] = useState(null);


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await requestSingleVacancy(jobId);
        console.log(response);
          setJobDetails(response);
        
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [requestSingleVacancy, jobId]);

  console.log(jobId)
   // Проверяем, что jobDetails не равен null перед чтением свойств
   const vacancyRichText = jobDetails?.vacancyRichText;
   
   const profession = jobDetails?.profession;
 
   // Parse the vacancyRichText into separate sections
   const sections = vacancyRichText?.split('<p>') || [];

  return (

    //сделать условие на loading что бы подставлять скелетон во время зашрузки
<div>
      {loading ? (
        // Если loading равно true, показываем скелетон или текст загрузки
        <SkeletonForJobList />
      ) : (
        <>
          
        <div style={{ padding: '24px',marginTop: '16px', backgroundColor: 'white', borderRadius: '10px'}}>
          <div>
            <h3>Обязанности:</h3>
            <ul>
              {sections[1] && (
                sections[1].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                )) 
              )}
            </ul>
          </div>

          <div>
            <h3>Требования:</h3>
            <ul>
              {sections[2] && (
                sections[2].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                ))
              )}
            </ul>
          </div>

          <div>
            <h3>Условия:</h3>
            <ul>
              {sections[3] && (
                sections[3].split('</li>').map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: `${item}</li>` }} />
                ))
              )}
            </ul>
          </div>
        </div> 
        </>
      )}
    </div>
  );
}

export default JobDescription;
 */