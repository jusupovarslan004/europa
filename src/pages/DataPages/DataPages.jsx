import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './DataPages.scss';

const DataPages = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    birthLastName: '',
    currentLastName: '',
    firstName: '',
    patronymic: '',
    height: '',
    weight: '',
    birthDate: '',
    birthPlace: '',
    residence: '',
    registrationAddress: '',
    citizenship: '',
    citizenshipBirth: '',
    whatsappNumber: '',
    phoneNumber: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpirationDate: '',
    passportIssuingAuthority: '',
    schengenVisa: '',
    familyStatus: '',
    email: '',
    englishLevel: '',
    additionalLanguage: '',
    drivingLicense: '',
    education: '',
    experience: '',
    spouse: {
      name: '',
      birthDate: '',
      phone: ''
    },
    children: [{
      name: '',
      birthDate: ''
    }],
    father: {
      name: '',
      birthDate: '',
      phone: ''
    },
    mother: {
      name: '',
      birthDate: '',
      phone: ''
    }
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParentInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSpouseInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      spouse: {
        ...prev.spouse,
        [field]: value
      }
    }));
  };

  const handleChildInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [...prev.children, { name: '', birthDate: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return (
    <div className="data-pages">
      <h1 className="data-pages__title">{t('form.title')}</h1>
      <p className="data-pages__description">{t('form.description')}</p>

      <form className="data-pages__form">
        <div className="form-grid">
          <div className="form-group">
            <label>{t('form.fields.birthLastName')}</label>
            <input
              type="text"
              name="birthLastName"
              value={formData.birthLastName}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.name')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.currentLastName')}</label>
            <input
              type="text"
              name="currentLastName"
              value={formData.currentLastName}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.name')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.firstName')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.name')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.patronymic')}</label>
            <input
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.name')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.height')}</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="170"
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.weight')}</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="65"
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.birthDate')}</label>
            <input
              type="text"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.birthDate')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.birthPlace')}</label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.address')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.residence')}</label>
            <input
              type="text"
              name="residence"
              value={formData.residence}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.address')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.registrationAddress')}</label>
            <input
              type="text"
              name="registrationAddress"
              value={formData.registrationAddress}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.address')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.citizenship')}</label>
            <input
              type="text"
              name="citizenship"
              value={formData.citizenship}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.citizenshipBirth')}</label>
            <input
              type="text"
              name="citizenshipBirth"
              value={formData.citizenshipBirth}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.whatsappNumber')}</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.phone')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.phoneNumber')}</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.phone')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.passportNumber')}</label>
            <input
              type="text"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.passportIssueDate')}</label>
            <input
              type="text"
              name="passportIssueDate"
              value={formData.passportIssueDate}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.birthDate')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.passportExpirationDate')}</label>
            <input
              type="text"
              name="passportExpirationDate"
              value={formData.passportExpirationDate}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.birthDate')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.passportIssuingAuthority')}</label>
            <input
              type="text"
              name="passportIssuingAuthority"
              value={formData.passportIssuingAuthority}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.schengenVisa')}</label>
            <input
              type="text"
              name="schengenVisa"
              value={formData.schengenVisa}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.visa')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.familyStatus.familyStatus')}</label>
            <select
              name="familyStatus"
              value={formData.familyStatus}
              onChange={handleInputChange}
            >
              <option value="">{t('form.fields.familyStatus.select')}</option>
              <option value="single">{t('form.fields.familyStatus.single')}</option>
              <option value="married">{t('form.fields.familyStatus.married')}</option>
              <option value="divorced">{t('form.fields.familyStatus.divorced')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('form.fields.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.englishLevel.englishLevel')}</label>
            <select
              name="englishLevel"
              value={formData.englishLevel}
              onChange={handleInputChange}
            >
              <option value="">{t('form.fields.englishLevel.select')}</option>
              <option value="beginner">{t('form.fields.englishLevel.beginner')}</option>
              <option value="intermediate">{t('form.fields.englishLevel.intermediate')}</option>
              <option value="advanced">{t('form.fields.englishLevel.advanced')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('form.fields.additionalLanguage')}</label>
            <input
              type="text"
              name="additionalLanguage"
              value={formData.additionalLanguage}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.additionalLanguage')}
            />
          </div>

          <div className="form-group">
            <label>{t('form.fields.drivingLicense')}</label>
            <input
              type="text"
              name="drivingLicense"
              value={formData.drivingLicense}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.drivingLicense')}
            />
          </div>

          <div className="form-group full-width">
            <label>{t('form.fields.education')}</label>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.education')}
            />
          </div>

          <div className="form-group full-width">
            <label>{t('form.fields.experience')}</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder={t('form.placeholders.experience')}
            />
          </div>

          {/* Секция родителей */}
          <div className="form-section">
            <h2>{t('form.sections.parents.title')}</h2>
            <div className="parents-grid">
              <div className="parent-column">
                <h3>{t('form.sections.parents.father.title')}</h3>
                <div className="form-group">
                  <label>{t('form.sections.parents.father.name')}</label>
                  <input
                    type="text"
                    value={formData.father.name}
                    onChange={(e) => handleParentInputChange('father', 'name', e.target.value)}
                    placeholder={t('form.placeholders.name')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.sections.parents.father.birthDate')}</label>
                  <input
                    type="text"
                    value={formData.father.birthDate}
                    onChange={(e) => handleParentInputChange('father', 'birthDate', e.target.value)}
                    placeholder={t('form.placeholders.birthDate')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.sections.parents.father.phone')}</label>
                  <input
                    type="text"
                    value={formData.father.phone}
                    onChange={(e) => handleParentInputChange('father', 'phone', e.target.value)}
                    placeholder={t('form.placeholders.phone')}
                  />
                </div>
              </div>

              <div className="parent-column">
                <h3>{t('form.sections.parents.mother.title')}</h3>
                <div className="form-group">
                  <label>{t('form.sections.parents.mother.name')}</label>
                  <input
                    type="text"
                    value={formData.mother.name}
                    onChange={(e) => handleParentInputChange('mother', 'name', e.target.value)}
                    placeholder={t('form.placeholders.name')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.sections.parents.mother.birthDate')}</label>
                  <input
                    type="text"
                    value={formData.mother.birthDate}
                    onChange={(e) => handleParentInputChange('mother', 'birthDate', e.target.value)}
                    placeholder={t('form.placeholders.birthDate')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.sections.parents.mother.phone')}</label>
                  <input
                    type="text"
                    value={formData.mother.phone}
                    onChange={(e) => handleParentInputChange('mother', 'phone', e.target.value)}
                    placeholder={t('form.placeholders.phone')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Секция супруга */}
          <div className="form-section spouse-section">
            <h2>{t('form.sections.spouse.title')}</h2>
            <div className="form-group">
              <label>{t('form.sections.spouse.name')}</label>
              <input
                type="text"
                value={formData.spouse.name}
                onChange={(e) => handleSpouseInputChange('name', e.target.value)}
                placeholder={t('form.placeholders.name')}
              />
            </div>
            <div className="form-group">
              <label>{t('form.sections.spouse.birthDate')}</label>
              <input
                type="text"
                value={formData.spouse.birthDate}
                onChange={(e) => handleSpouseInputChange('birthDate', e.target.value)}
                placeholder={t('form.placeholders.birthDate')}
              />
            </div>
            <div className="form-group">
              <label>{t('form.sections.spouse.phone')}</label>
              <input
                type="text"
                value={formData.spouse.phone}
                onChange={(e) => handleSpouseInputChange('phone', e.target.value)}
                placeholder={t('form.placeholders.phone')}
              />
            </div>
          </div>

          {/* Секция детей */}
          <div className="form-section children-section">
            <h2>{t('form.sections.children.title')}</h2>
            {formData.children.map((child, index) => (
              <div key={index} className="child-fields">
                <div className="form-group">
                  <label>{t('form.sections.children.name')}</label>
                  <input
                    type="text"
                    value={child.name}
                    onChange={(e) => handleChildInputChange(index, 'name', e.target.value)}
                    placeholder={t('form.placeholders.name')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('form.sections.children.birthDate')}</label>
                  <input
                    type="text"
                    value={child.birthDate}
                    onChange={(e) => handleChildInputChange(index, 'birthDate', e.target.value)}
                    placeholder={t('form.placeholders.birthDate')}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addChild} className="add-more-btn">
              {t('form.buttons.addMore')}
            </button>
          </div>

          <button type="submit" onClick={handleSubmit} className="submit-btn">
            {t('form.buttons.submit')}
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <h3>{t('form.modal.success.title')}</h3>
            <p>{t('form.modal.success.message')}</p>
            <button onClick={() => setShowSuccessModal(false)}>
              {t('form.modal.success.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPages;
