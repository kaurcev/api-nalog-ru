import React from 'react';
import CompanyItem from './CompanyItem';

const ResultsList = ({
    results,
    loading
}) => {
    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (results.length === 0) {
        return null;
    }

    return (
        <div className="companies">
            {results.map((company, index) => (
                <CompanyItem
                    key={`${company.i}-${company.o}-${index}`}
                    company={company}
                />
            ))}
        </div>
    );
};

export default ResultsList;