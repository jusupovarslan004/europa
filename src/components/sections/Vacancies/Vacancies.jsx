import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Vacancies.scss";

const Vacancies = () => {
  const { t, i18n } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      const currentLang = i18n.language === "kg" ? "ky" : i18n.language;
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/?lang=${currentLang}`
        );
        const data = await response.json();
        // Берем только первые 4 вакансии
        setVacancies(data.results?.slice(0, 4) || []);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [i18n.language]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vacancies</div>;

  return (
    <section className="vacancies">
      <div className="container">
        <h2 className="vacancies__title">{t("vacancies.title")}</h2>
        <div className="vacancies__grid">
          {vacancies.map((vacancy) => (
            <Link
              to={`/vacancies/${vacancy.id}`}
              key={vacancy.id}
              className="vacancies__item"
            >
              <div className="vacancies__image">
                <img src={vacancy.img_api || vacancy.img} alt={vacancy.title} />
              </div>
              <div className="vacancies__content">
                <div className="vacancies__date">{vacancy.uploaded_at.split(' ')[0]}</div>
                <h3 className="vacancies__item-title">{vacancy.title}</h3>
                <div className="vacancies__requirements">
                  <p><strong>{t("vacancies.labels.country")}: </strong>{vacancy.country}</p>
                  <p><strong>{t("vacancies.labels.salary")}: </strong>{vacancy.salary}</p>
                  <p><strong>{t("vacancies.labels.specialization")}: </strong>{vacancy.specialization}</p>
                </div>
                <p className="vacancies__positions">
                  {t("vacancies.labels.place")}: {vacancy.place}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vacancies;