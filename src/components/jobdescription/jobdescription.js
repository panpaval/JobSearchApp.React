import { useState, useEffect } from 'react';
import { FetchSuperJobData } from '../services/Superjobservice';
import SkeletonForJobList from '../skeleton/skeleton';


const JobDescription = ({ jobId }) => {
  const { loading, request } = FetchSuperJobData();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await request();
        const job = response.find(item => item.id === jobId);

        if (job) {
          setJobDetails(job);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [request, jobId]);

 

  // Parse the vacancyRichText into separate sections
  const vacancyRichText = jobDetails.vacancyRichText;
  const sections = vacancyRichText.split('<p>');

  return (

    //сделать условие на loading что бы подставлять скелетон во время зашрузки

    <div>
      <h2>{jobDetails.profession}</h2>

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
  );
}

export default JobDescription;
