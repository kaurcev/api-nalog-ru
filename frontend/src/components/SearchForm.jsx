import React from 'react';

const SearchForm = ({
  onSubmit,
  companyName,
  setCompanyName,
  loading,
  regions,
  selectedRegion,
  onRegionChange
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyName, 1, selectedRegion);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Введите название компании или ИНН"
        disabled={loading}
      />

      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        disabled={loading}
        className="region-select"
      >
        {regions.map(region => (
          <option key={region.code} value={region.code}>
            {region.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Поиск...' : 'Найти'}
      </button>
    </form>
  );
};

export default SearchForm;