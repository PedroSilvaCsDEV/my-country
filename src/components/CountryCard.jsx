import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <div className="border rounded shadow p-4">
      <Link to={`/country/${country.cca3}`}>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-48 h-32 object-cover"
        />
        <h2 className="text-lg font-bold">{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Região: {country.region}</p>
        <p>População: {country.population.toLocaleString()}</p> {/* Adicionando a população */}
        <p>Área: {country.area.toLocaleString()} km²</p> {/* Adicionando a área */}
      </Link>
    </div>
  );
};

export default CountryCard;