import React, { useState, useEffect } from "react";
import { requestSingleVacancy } from "./FetchSuperJobData"; // Подключаем функцию запроса

const SingleVacancy = ({ jobid }) => {
  const [vacancyData, setVacancyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await requestSingleVacancy(jobid); // Выполняем запрос с помощью функции requestSingleVacancy
        setVacancyData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vacancy data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [jobid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vacancyData) {
    return <div>Error loading vacancy data</div>;
  }

  // Здесь вы можете отображать данные о вакансии в JSX
  return (
    <div>
      <h2>Vacancy Details</h2>
      <p>Title: {vacancyData.title}</p>
      <p>Description: {vacancyData.description}</p>
      {/* Другие поля описания вакансии */}
    </div>
  );
};

export default SingleVacancy;