import React from 'react';
import {
  Hero,
  Support,
  TopCategories,
  TopGames,
  TopGears,
} from '../components/home';

function Home(props) {
  return (
    <div className='background-dark paddingX pb-10'>
      {/* <Navbar/> */}
      <Hero />
      <TopGames />
      <TopGears />
      <TopCategories />
      <Support />
    </div>
  );
}

export default Home;
