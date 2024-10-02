import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        console.error("Erro ao buscar detalhes do país:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryDetails();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <Link to="/" className="mb-4 inline-block text-blue-600">Voltar para a Página Inicial</Link>
      <h1 className="text-2xl font-bold">{country.name.common}</h1>
      <img src={country.flags.svg} alt={country.name.common} className="w-48 h-auto" />
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Região:</strong> {country.region}</p>
      <p><strong>Sub-região:</strong> {country.subregion}</p>
      <p><strong>População:</strong> {country.population}</p>
      <p><strong>Área:</strong> {country.area} km²</p>
      <p><strong>Idiomas:</strong> {Object.values(country.languages).join(', ')}</p>
      <p><strong>Moedas:</strong> {Object.values(country.currencies).map(curr => curr.name).join(', ')}</p>
      <p><strong>Fusos Horários:</strong> {country.timezones.join(', ')}</p>
      <p><strong>Domínio de Internet (Código TLD):</strong> {country.tld.join(', ')}</p>
      <p><strong>Código de Discagem:</strong> {country.idd.root + country.idd.suffixes.join(', ')}</p>
    </div>
  );
};

export default CountryDetails;
