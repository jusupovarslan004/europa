import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Hero.scss";
import heroBg1 from "../../../assets/images/hero-bg1.jpg";
import heroBg2 from "../../../assets/images/hero-bg2.jpg";
import ContactModal from "../../common/Modal/ContactModal";

const Hero = () => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [heroBg1, heroBg2];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {images.map((img, index) => (
        <div
          key={index}
          className={`hero__background ${
            currentImage === index ? "active" : ""
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero__overlay" />
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            {t("hero.title", "Работать за границей - это легко и просто!")}
          </h1>
          <p className="hero__description">
            {t(
              "hero.description",
              "Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt eget scelerisque aliquam elit mauris feugiat id."
            )}
          </p>
          <button className="hero__button" onClick={() => setIsModalOpen(true)}>
            {t("common.leaveRequest", "Оставить заявку")}
          </button>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
