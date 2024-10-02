import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        const data = await response.json();
        if (data.length === 0) {
          setError('País não encontrado');
        } else {
          setCountry(data[0]);
        }
      } catch (err) {
        setError('Erro ao buscar detalhes do país');
      }
    };

    fetchCountryDetails();
  }, [id]);

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  if (!country) return <div className="flex justify-center items-center h-screen">Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:text-blue-600 transition duration-300 mb-6 inline-block">
        &larr; Voltar
      </Link>
      <div className="bg-grey border shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img src={country.flags?.svg || '/placeholder-flag.png'} alt={country.name?.common || 'Sem Nome'} className="h-72 w-full object-cover md:w-full" />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{country.name?.common || 'Nome N/A'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Região:</strong> {country.region || 'N/A'}</p>
              <p><strong>Sub-região:</strong> {country.subregion || 'N/A'}</p>
              <p><strong>População:</strong> {country.population?.toLocaleString() || 'N/A'}</p>
              <p><strong>Área:</strong> {country.area?.toLocaleString() || 'N/A'} km²</p>
              <p><strong>Idiomas:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
              <p><strong>Moedas:</strong> {country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}</p>
              <p><strong>Fuso Horário:</strong> {country.timezones?.join(', ') || 'N/A'}</p>
              <p><strong>Domínio de Internet:</strong> {country.tld?.join(', ') || 'N/A'}</p>
              <p><strong>Código de Discagem:</strong> {country.idd?.root || ''}{country.idd?.suffixes?.join(', ') || '' || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;