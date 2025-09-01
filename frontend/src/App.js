import React, { useState, useMemo } from 'react';
import './App.css';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const currentResults = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return results.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, results]);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      setError('Введите название компании');
      return;
    }

    setLoading(true);
    setError('');
    setCurrentPage(1);

    try {
      const response = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при поиске');
      }

      setResults(data.rows || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Поиск информации о компаниях</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="companyName">Название компании:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Введите название компании"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="results">
        {results.length > 0 ? (
          <>
            <h2>Результаты поиска:</h2>
            <div className='list'>
            {currentResults.map((company, index) => (
              <div key={index} className="company">
                <div className="company-name">{company.n || company.c}</div>
                <div className="company-details">
                  <p>ИНН: {company.i || 'Не указан'}</p>
                  <p>ОГРН: {company.o || 'Не указан'}</p>
                  <p>Дата регистрации: {company.r || 'Не указана'}</p>
                  <p>Руководитель: {company.g ? company.g.replace('ДИРЕКТОР: ', '') : 'Не указан'}</p>
                  <p>Адрес: {company.a || 'Не указан'}</p>
                </div>
              </div>
            ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Назад
                </button>
                <span className="pagination-info">
                  Страница {currentPage} из {totalPages}
                </span>
                <button 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Вперед
                </button>
              </div>
            )}
          </>
        ) : (
          !loading && <p className='center'>Введите запрос для поиска компаний</p>
        )}
      </div>

      <div className="api-docs">
        <h2>Документация API</h2>
        <p>Для прямого доступа к API используйте endpoint:</p>
        <code>POST http://localhost:3001/api/search</code>
        <p>Тело запроса (JSON):</p>
        <pre>{JSON.stringify({ companyName: "Пример" }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;