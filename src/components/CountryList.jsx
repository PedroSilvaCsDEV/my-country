import React, { useEffect, useState, useCallback } from 'react';
import CountryCard from './CountryCard';
import CountryFilters from './CountryFilters';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [page, setPage] = useState(1);
  const countriesPerPage = 12;

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
      setDisplayedCountries(sortedCountries.slice(0, countriesPerPage));
    };

    fetchCountries();
  }, []);

  const loadMoreCountries = useCallback(() => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * countriesPerPage;
    const newCountries = filteredCountries.slice(startIndex, startIndex + countriesPerPage);

    if (newCountries.length > 0) {
      setDisplayedCountries(prevCountries => [...prevCountries, ...newCountries]);
      setPage(nextPage);
    }
  }, [page, filteredCountries]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreCountries();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreCountries]);

  useEffect(() => {
    setPage(1);
    setDisplayedCountries(filteredCountries.slice(0, countriesPerPage));
  }, [filteredCountries]);

  return (
    <div className="container mx-auto p-4">
      <CountryFilters countries={countries} setFilteredCountries={setFilteredCountries} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;