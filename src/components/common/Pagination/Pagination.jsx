import React from 'react';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    // Стрелка влево
    pages.push(
      <button
        key="prev"
        className="pagination__button pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );

    // Первая страница
    pages.push(
      <button
        key={1}
        className={`pagination__button ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Вторая страница
    if (totalPages > 1) {
      pages.push(
        <button
          key={2}
          className={`pagination__button ${currentPage === 2 ? 'active' : ''}`}
          onClick={() => onPageChange(2)}
        >
          2
        </button>
      );
    }

    // Многоточие
    if (totalPages > 3) {
      pages.push(
        <span key="dots" className="pagination__dots">
          ...
        </span>
      );
    }

    // Предпоследняя и последняя страницы
    if (totalPages > 2) {
      pages.push(
        <button
          key={totalPages - 1}
          className={`pagination__button ${currentPage === totalPages - 1 ? 'active' : ''}`}
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages - 1}
        </button>
      );
      pages.push(
        <button
          key={totalPages}
          className={`pagination__button ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Стрелка вправо
    pages.push(
      <button
        key="next"
        className="pagination__button pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );

    return pages;
  };

  return <div className="pagination">{renderPageNumbers()}</div>;
};

export default Pagination; 