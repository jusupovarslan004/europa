import React from 'react';
import { useTranslation } from 'react-i18next';
import './SuccessModal.scss';

const SuccessModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();


  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <button className="success-modal__close" onClick={onClose}>×</button>
        <div className="success-modal__icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>{t('forms.success.title')}</h3>
        <p>{t('forms.success.message')}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
