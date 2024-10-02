import React from 'react';
import CountryList from '../components/CountryList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Explorador de Países</h1>
        </div>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
};

export default Home;