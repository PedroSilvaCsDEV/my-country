import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      const data = await response.json();
      setCountry(data[0]);
    };

    fetchCountryDetails();
  }, [id]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Voltar
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
        <img src={country.flags.svg} alt={country.name.common} className="w-48 mb-4" />
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Região:</strong> {country.region}</p>
        <p><strong>Sub-região:</strong> {country.subregion}</p>
        <p><strong>População:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>
        <p><strong>Moedas:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
        <p><strong>Fuso Horário:</strong> {country.timezones.join(', ')}</p>
        <p><strong>Domínio de Internet:</strong> {country.tld.join(', ')}</p>
        <p><strong>Código de Discagem Internacional:</strong> {country.idd.root}{country.idd.suffixes.join(', ')}</p>
      </div>
    </div>
  );
};

export default CountryDetails;