import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <div className="bg-grey border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link to={`/country/${country.cca3}`} className="block">
        <div className="aspect-w-3 aspect-h-2">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2 text-gray-800">{country.name.common}</h2>
          <p className="text-sm text-gray-600"><span className="font-semibold">Capital:</span> {country.capital}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Região:</span> {country.region}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">População:</span> {country.population.toLocaleString()}</p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Área:</span> {country.area.toLocaleString()} km²</p>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;