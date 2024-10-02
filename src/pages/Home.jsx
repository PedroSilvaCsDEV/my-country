import React from 'react';
import CountryList from '../components/CountryList';

const Home = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4">Explorador de Países</h1>
      <CountryList />
    </div>
  );
};

export default Home;