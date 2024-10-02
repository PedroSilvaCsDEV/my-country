import React, { useEffect, useState, useCallback } from 'react';
import CountryCard from './CountryCard';
import CountryFilters from './CountryFilters';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
      setVisibleCountries(sortedCountries.slice(0, 12));
    };

    fetchCountries();
  }, []);

  const loadMoreCountries = useCallback(() => {
    setVisibleCountries((prevVisible) => {
      const nextPage = page + 1;
      const nextCountries = filteredCountries.slice(nextPage * 12, (nextPage + 1) * 12);
      if (nextCountries.length > 0) {
        setPage(nextPage);
        return [...prevVisible, ...nextCountries];
      }     
      return prevVisible;
    });
  }, [page, filteredCountries]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100) {
      loadMoreCountries();
    }
  }, [loadMoreCountries]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container mx-auto px-4 py-8">
      <CountryFilters countries={countries} setFilteredCountries={setFilteredCountries} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      {visibleCountries.length < filteredCountries.length && (
        <div className="text-center mt-8">
          <button 
            onClick={loadMoreCountries} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default CountryList;