import React, { useState, useEffect } from "react";
import "./ContactModal.scss";

import { validateInternationalPhone } from "../../../utils/validation";
import { useTranslation } from "react-i18next";
import SuccessModal from "../SuccessModal/SuccessModal";

const ContactModal = ({ isOpen, onClose, country, vacancyName, vacancyId }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullname: '',
    tell: '',
    city: '',
    country: country || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d+\s-]/g, "");
    setFormData((prev) => ({
      ...prev,
      tell: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        vacancy: vacancyId ? parseInt(vacancyId) : null,
      };

      const response = await fetch(
        "https://api.togetherrecruitment.kg/api/v2/info/appform_add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData({
          fullname: '',
          tell: '',
          city: '',
          country: '',
        });
        
        setIsSuccessModalOpen(true);
        console.log("SuccessModal opened");
        
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          console.log("SuccessModal closed");
          onClose();
        }, 3000);
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log("Current isSuccessModalOpen state:", isSuccessModalOpen);

  if (!isOpen) return null;

  return (
    <>
      <div className="contact-modal-overlay">
        <div className="contact-modal">
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={onClose}>
                ×
              </button>

              <div className="contact-info">
                <h3>Наши контакты</h3>
                <div className="contact-item">
                  <img src="/email-icon.svg" alt="email" />
                  <a href="mailto:europework@gmail.com">europework@gmail.com</a>
                </div>
                <div className="contact-item">
                  <img src="/phone-icon.svg" alt="phone" />
                  <div>
                    <a href="tel:+996705254855">+996 705 254 855</a>
                    <br />
                    <a href="tel:+996705959855">+996 705 959 855</a>
                  </div>
                </div>
                <div className="contact-item">
                  <img src="/location-icon.svg" alt="location" />
                  <span>Куатова 139/6</span>
                </div>
              </div>

              <div className="form-section">
                <h3>{t("forms.contact.title")}</h3>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>{t("forms.contact.fullName")}</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder={t("forms.contact.fullNamePlaceholder")}
                      required
                      maxLength="100"
                      minLength="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("forms.contact.phone")}</label>
                    <input
                      type="tel"
                      name="tell"
                      value={formData.tell}
                      onChange={handlePhoneChange}
                      placeholder={t("forms.contact.phonePlaceholder")}
                      required
                      maxLength="100"
                      minLength="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("forms.contact.country")}</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder={t("forms.contact.countryPlaceholder")}
                      disabled={!!country}
                      className={country ? "disabled-input" : ""}
                      maxLength="100"
                    />
                  </div>

                  <div className="form-group">
                    <label>{t("forms.contact.city")}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder={t("forms.contact.cityPlaceholder")}
                      maxLength="100"
                    />
                  </div>

                  {vacancyName && (
                    <div className="form-group">
                      <label>{t("forms.contact.vacancy")}</label>
                      <input
                        type="text"
                        value={vacancyName}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`submit-button ${loading ? "loading" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "" : t("forms.contact.submit")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => {
          console.log("SuccessModal close button clicked");
          setIsSuccessModalOpen(false);
        }}
      />
    </>
  );
};

export default ContactModal;
