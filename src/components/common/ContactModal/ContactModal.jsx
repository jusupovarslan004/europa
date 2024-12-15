import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ContactModal.scss';

const ContactModal = ({ isOpen, onClose, onSuccess, prefilledCountry, vacancyId }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.togetherrecruitment.kg/api/v2/applications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          country: prefilledCountry, // Используем страну из пропсов
          vacancy_id: vacancyId
        }),
      });

      if (response.ok) {
        onSuccess();
        setFormData({
          name: '',
          phone: '',
          email: '',
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal">
        <button className="contact-modal__close" onClick={onClose}>×</button>
        <h3>{t("contact.title")}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("contact.name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={t("contact.name_placeholder")}
            />
          </div>
          <div className="form-group">
            <label>{t("contact.phone")}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder={t("contact.phone_placeholder")}
            />
          </div>
          <div className="form-group">
            <label>{t("contact.email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t("contact.email_placeholder")}
            />
          </div>
          <div className="form-group">
            <label>{t("contact.country")}</label>
            <input
              type="text"
              value={prefilledCountry}
              readOnly
              disabled
              className="disabled-input"
            />
          </div>
          <button type="submit" className="button button--primary">
            {t("contact.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal; 