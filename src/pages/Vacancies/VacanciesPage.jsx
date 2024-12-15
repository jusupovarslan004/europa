import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import "./VacanciesPage.scss";
import searchIcon from "../../assets/icons/search.svg";

const VacanciesPage = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [vacancies, setVacancies] = useState([]);
  const [allVacancies, setAllVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchVacancies = async () => {
      const currentLang = i18n.language === "kg" ? "ky" : i18n.language;
      try {
        setIsLoading(true);
        let url = `https://api.togetherrecruitment.kg/api/v2/info/vacancies/?lang=${currentLang}&page=${currentPage}&count_pages=1`;

        console.log('Fetching URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);
        
        setVacancies(data.results || []);
        setTotalPages(data.count_pages || 0);

        // Получаем список стран
        if (currentPage === 1) {
          const uniqueCountries = [
            ...new Set(
              (data.results || [])
                .map((vacancy) => vacancy?.country)
                .filter(Boolean)
            ),
          ];
          setCountries(uniqueCountries);
        }
      } catch (error) {
        console.error("Error fetching vacancies:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [currentPage, i18n.language]);

  useEffect(() => {
    const fetchAllVacancies = async () => {
      const currentLang = i18n.language === "kg" ? "ky" : i18n.language;
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.togetherrecruitment.kg/api/v2/info/vacancies/?page_size=all&lang=${currentLang}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllVacancies(data || []);
      } catch (error) {
        console.error("Error fetching all vacancies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (search.trim() !== "" || selectedCountry !== "all") {
      fetchAllVacancies();
    }
  }, [search, selectedCountry, i18n.language]);

  const filteredVacancies = search.trim() !== "" || selectedCountry !== "all"
    ? allVacancies.filter(vacancy => {
        const matchesSearch = search.trim() === "" || 
          vacancy.title.toLowerCase().includes(search.toLowerCase());
        const matchesCountry = selectedCountry === "all" || 
          vacancy.country === selectedCountry;
        return matchesSearch && matchesCountry;
      })
    : vacancies;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Дата не указана";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Ошибка форматирования даты:", error.message);
      return "Неверный формат даты";
    }
  };

  return (
    <div className="vacancies-page">
      <div className="vacancies-page__search">
        <div className="container">
          <div className="search-bar">
            <div className="search-bar__input-wrapper">
              <input
                type="text"
                placeholder={t("vacancies.search.placeholder")}
                value={search}
                onChange={handleSearch}
                className="search-bar__input"
              />
              <img src={searchIcon} alt="Search" className="search-bar__icon" />
            </div>
            <div className="fancy-select-container">
              <div 
                className={`fancy-select ${isDropdownOpen ? 'active' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="fancy-select__selected">
                  <span className="fancy-select__text">
                    {selectedCountry === 'all' 
                      ? t("vacancies.filters.all_countries") 
                      : selectedCountry}
                  </span>
                  <div className="fancy-select__arrow">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {isDropdownOpen && (
                  <div className="fancy-select__dropdown">
                    <div 
                      className={`fancy-select__option ${selectedCountry === 'all' ? 'selected' : ''}`}
                      onClick={() => {
                        handleCountryChange({ target: { value: 'all' } });
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{t("vacancies.filters.all_countries")}</span>
                      <div className="option-highlight"></div>
                    </div>
                    {countries.map((country, index) => (
                      <div
                        key={index}
                        className={`fancy-select__option ${selectedCountry === country ? 'selected' : ''}`}
                        onClick={() => {
                          handleCountryChange({ target: { value: country } });
                          setIsDropdownOpen(false);
                        }}
                      >
                        <span>{country}</span>
                        <div className="option-highlight"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="vacancies-page__grid">
          {filteredVacancies.map((vacancy) => (
            <Link
              to={`/vacancies/${vacancy.id}`}
              key={vacancy.id}
              className="vacancy-card"
            >
              <div className="vacancy-card__image">
                <img src={vacancy.img_api || vacancy.img} alt={vacancy.title} />
              </div>
              <div className="vacancy-card__content">
                <div className="vacancy-card__main">
                  <h3 className="vacancy-card__title">{vacancy.title}</h3>
                  <div className="vacancy-card__details">
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.country")}: </strong>
                      <span>{vacancy.country}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.program")}: </strong>
                      <span>{vacancy.program}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.specialization")}: </strong>
                      <span>{vacancy.specialization}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.salary")}: </strong>
                      <span>{vacancy.salary}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.age")}: </strong>
                      <span>{vacancy.age}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.place")}: </strong>
                      <span>{vacancy.place}</span>
                    </div>
                    <div className="vacancy-card__info-group">
                      <strong>{t("vacancies.labels.uploaded_at")}: </strong>
                      <span>{formatDate(vacancy.uploaded_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="vacancies-page__pagination">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {isLoading && <p>{t("vacancies.loading")}</p>}
      {error && <p>{t("vacancies.error")}</p>}
      {!isLoading && filteredVacancies.length === 0 && (
        <div className="no-results">
          <p>{t("vacancies.no_results")}</p>
        </div>
      )}
    </div>
  );
};

export default VacanciesPage;