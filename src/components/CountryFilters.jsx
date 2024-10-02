import React, { useState } from 'react';

// Dados das regiões e sub-regiões
const regionsData = {
  Africa: ['Northern Africa', 'Western Africa', 'Eastern Africa', 'Southern Africa', 'Central Africa'],
  Americas: ['North America', 'Central America', 'South America', 'Caribbean'],
  Asia: ['Eastern Asia', 'South-Eastern Asia', 'Southern Asia', 'Central Asia', 'Western Asia'],
  Europe: ['Northern Europe', 'Western Europe', 'Southern Europe', 'Eastern Europe', 'Central Europe'],
  Oceania: ['Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia'],
  Antarctic: [], // Antártica sem sub-regiões
};

// Mapeamento de tradução
const translationMap = {
  Africa: 'África',
  Americas: 'Américas',
  Asia: 'Ásia',
  Europe: 'Europa',
  Oceania: 'Oceania',
  Antarctic: 'Antártica',
  'Northern Africa': 'África do Norte',
  'Western Africa': 'África Ocidental',
  'Eastern Africa': 'África Oriental',
  'Southern Africa': 'África do Sul',
  'Central Africa': 'África Central',
  'North America': 'América do Norte',
  'Central America': 'América Central',
  'South America': 'América do Sul',
  Caribbean: 'Caribe',
  'Eastern Asia': 'Ásia Oriental',
  'South-Eastern Asia': 'Ásia do Sudeste',
  'Southern Asia': 'Ásia Meridional',
  'Central Asia': 'Ásia Central',
  'Western Asia': 'Ásia Ocidental',
  'Northern Europe': 'Europa do Norte',
  'Western Europe': 'Europa Ocidental',
  'Southern Europe': 'Europa do Sul',
  'Eastern Europe': 'Europa Oriental',
  'Central Europe': 'Europa Central',
  'Australia and New Zealand': 'Austrália e Nova Zelândia',
  Melanesia: 'Melanésia',
  Micronesia: 'Micronésia',
  Polynesia: 'Polinésia',
};

const CountryFilters = ({ countries, setFilteredCountries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');
  const [subRegion, setSubRegion] = useState('All');
  const [populationRange, setPopulationRange] = useState('All');
  const [sortOrder, setSortOrder] = useState('name'); // Novo estado para ordenação
  const [sortDirection, setSortDirection] = useState('asc'); // Novo estado para direção da ordenação

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterCountries(e.target.value, region, subRegion, populationRange, sortOrder, sortDirection);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setSubRegion('All'); // Reseta sub-região ao trocar a região
    filterCountries(searchTerm, e.target.value, 'All', populationRange, sortOrder, sortDirection);
  };

  const handleSubRegionChange = (e) => {
    setSubRegion(e.target.value);
    filterCountries(searchTerm, region, e.target.value, populationRange, sortOrder, sortDirection);
  };

  const handlePopulationChange = (e) => {
    setPopulationRange(e.target.value);
    filterCountries(searchTerm, region, subRegion, e.target.value, sortOrder, sortDirection);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    filterCountries(searchTerm, region, subRegion, populationRange, e.target.value, sortDirection);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
    filterCountries(searchTerm, region, subRegion, populationRange, sortOrder, e.target.value);
  };

  const filterCountries = (search, region, subRegion, population, sort, direction) => {
    let filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    if (region !== 'All') {
      filtered = filtered.filter(country => country.region === region);
    }

    if (subRegion !== 'All') {
      filtered = filtered.filter(country => country.subregion === subRegion);
    }

    if (population !== 'All') {
      filtered = filtered.filter(country => {
        const pop = country.population;
        if (population === '<1M') return pop < 1000000;
        if (population === '1M-10M') return pop >= 1000000 && pop < 10000000;
        if (population === '10M-100M') return pop >= 10000000 && pop < 100000000;
        if (population === '>100M') return pop > 100000000;
        return true;
      });
    }

    // Ordenação
    filtered.sort((a, b) => {
      if (sort === 'name') {
        return direction === 'asc'
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else if (sort === 'population') {
        return direction === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      } else if (sort === 'area') {
        return direction === 'asc'
          ? a.area - b.area
          : b.area - a.area;
      }
      return 0; // Retorna 0 se não houver necessidade de ordenação
    });

    setFilteredCountries(filtered);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Buscar pelo nome do país"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 rounded mr-2"
      />
      <select value={region} onChange={handleRegionChange} className="border p-2 rounded mr-2">
        <option value="All">Todas as Regiões</option>
        {Object.keys(regionsData).map(region => (
          <option key={region} value={region}>{translationMap[region]}</option>
        ))}
      </select>
      <select value={subRegion} onChange={handleSubRegionChange} className="border p-2 rounded mr-2">
        <option value="All">Todas as Sub-regiões</option>
        {region === 'All' && Object.keys(regionsData).flatMap(region => regionsData[region]).map(subReg => (
          <option key={subReg} value={subReg}>{translationMap[subReg]}</option>
        ))}
        {region !== 'All' && regionsData[region].map(subReg => (
          <option key={subReg} value={subReg}>{translationMap[subReg]}</option>
        ))}
      </select>
      <select value={populationRange} onChange={handlePopulationChange} className="border p-2 rounded mr-2">
        <option value="All">Todas as Populações</option>
        <option value="<1M">&lt; 1M</option>
        <option value="1M-10M">1M - 10M</option>
        <option value="10M-100M">10M - 100M</option>
        <option value=">100M">&gt; 100M</option>
      </select>
      <select value={sortOrder} onChange={handleSortOrderChange} className="border p-2 rounded mr-2">
        <option value="name">Ordenar por Nome</option>
        <option value="population">Ordenar por População</option>
        <option value="area">Ordenar por Área</option>
      </select>
      <select value={sortDirection} onChange={handleSortDirectionChange} className="border p-2 rounded mr-2">
        <option value="asc">Crescente</option>
        <option value="desc">Decrescente</option>
      </select>
    </div>
  );
};

export default CountryFilters;