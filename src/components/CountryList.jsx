import React, { useEffect, useState, useCallback } from 'react';
import CountryCard from './CountryCard';
import CountryFilters from './CountryFilters';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [page, setPage] = useState(0); // Página inicial

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      // Ordenar países por nome em ordem crescente
      const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(sortedCountries);
      setFilteredCountries(sortedCountries);
      setVisibleCountries(sortedCountries.slice(0, 12)); // Exibe os primeiros 20 países
    };

    fetchCountries();
  }, []);

  // Função para carregar mais países
  const loadMoreCountries = useCallback(() => {
    setVisibleCountries((prevVisible) => {
      const nextPage = page + 1; // Incrementa a página
      const nextCountries = filteredCountries.slice(nextPage * 12, (nextPage + 1) * 12); // Carrega mais 20 países
      if (nextCountries.length > 0) {
        setPage(nextPage); // Atualiza a página se houver mais países
        return [...prevVisible, ...nextCountries]; // Retorna os países visíveis atualizados
      }     
      return prevVisible; // Retorna os visíveis se não houver mais países
    });
  }, [page, filteredCountries]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY; // Posição vertical da rolagem
    const windowHeight = window.innerHeight; // Altura da janela
    const documentHeight = document.documentElement.scrollHeight; // Altura total do documento

    // Verifica se o usuário está perto do final da página
    if (scrollY + windowHeight >= documentHeight - 100) {
      loadMoreCountries(); // Carrega mais países
    }
  }, [loadMoreCountries]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpa o listener ao desmontar o componente
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