import React from 'react';

const CompanyItem = ({ company }) => {
  const getDirectorName = (directorString) => {
    if (!directorString) return 'Не указан';
    return directorString.replace(/^(ДИРЕКТОР|ГЕНЕРАЛЬНЫЙ ДИРЕКТОР):\s*/i, '');
  };

  return (
    <div className="company">
      <h3>{company.n || company.c || 'Название не указано'}</h3>
      <div className="details">
        <div className="detail-row">
          <span className="label">Краткое название:</span>
          <span className="value">{company.c || 'Не указано'}</span>
        </div>
        <div className="detail-row">
          <span className="label">ИНН:</span>
          <span className="value">{company.i || 'Не указан'}</span>
        </div>
        <div className="detail-row">
          <span className="label">ОГРН:</span>
          <span className="value">{company.o || 'Не указан'}</span>
        </div>
        <div className="detail-row">
          <span className="label">КПП:</span>
          <span className="value">{company.p || 'Не указан'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Дата регистрации:</span>
          <span className="value">{company.r || 'Не указана'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Дата прекращения:</span>
          <span className="value">{company.e || 'Не указана'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Руководитель:</span>
          <span className="value">{getDirectorName(company.g)}</span>
        </div>
        <div className="detail-row">
          <span className="label">Регион:</span>
          <span className="value">{company.rn || 'Не указан'}</span>
        </div>
        <div className="detail-row">
          <span className="label">Тип:</span>
          <span className="value">{company.k === 'ul' ? 'Юридическое лицо' : 'Индивидуальный предприниматель'}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;