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

  if (!country) return <div className="flex justify-center items-center h-screen">Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:text-blue-600 transition duration-300 mb-6 inline-block">
        &larr; Voltar
      </Link>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img src={country.flags.svg} alt={country.name.common} className="h-48 w-full object-cover md:w-48" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Capital:</strong> {country.capital}</p>
              <p><strong>Região:</strong> {country.region}</p>
              <p><strong>Sub-região:</strong> {country.subregion}</p>
              <p><strong>População:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Área:</strong> {country.area.toLocaleString()} km²</p>
              <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>
              <p><strong>Moedas:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
              <p><strong>Fuso Horário:</strong> {country.timezones.join(', ')}</p>
              <p><strong>Domínio de Internet:</strong> {country.tld.join(', ')}</p>
              <p><strong>Código de Discagem:</strong> {country.idd.root}{country.idd.suffixes.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;