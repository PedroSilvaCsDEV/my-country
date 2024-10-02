import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import CountryFilters from './CountryFilters';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      // Ordenar países por nome em ordem crescente
      const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries); // Inicialmente, os países filtrados são iguais aos países carregados
    };

    fetchCountries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Renderizando o CountryFilters uma vez */}
      <CountryFilters countries={countries} setFilteredCountries={setFilteredCountries} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;