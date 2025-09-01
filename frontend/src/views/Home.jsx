import React, { useState, useEffect } from 'react';
import { useAppContext } from "../Application";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";
import ResultsList from "../components/ResultsList";

export default function HomeView() {
    const { setTitle } = useAppContext();

    const [companyName, setCompanyName] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/regions')
            .then(response => response.json())
            .then(data => setRegions(data))
            .catch(err => console.error('Ошибка загрузки регионов:', err));
    }, []);

    const handleSearch = async (searchTerm, page = 1, region = selectedRegion) => {
        if (!searchTerm.trim()) {
            setError('Введите название компании');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    companyName: searchTerm, 
                    region: region,
                    page: page 
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при поиске');
            }

            if (!data.status) {
                throw new Error(data.message || 'Произошла ошибка');
            }

            setResults(data.data || []);            
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRegionChange = (regionCode) => {
        setSelectedRegion(regionCode);
    };

    useEffect(() => {
        setTitle("Поиск информации о компаниях");
    }, [setTitle]);

    return (
        <>
            <Header />
            <main>
                <h1 className="nomarg">Поиск информации о компаниях</h1>

                <SearchForm
                    onSubmit={handleSearch}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    loading={loading}
                    regions={regions}
                    selectedRegion={selectedRegion}
                    onRegionChange={handleRegionChange}
                />

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <ResultsList
                    results={results}
                    loading={loading}
                />
            </main>
            <Footer />
        </>
    );
}