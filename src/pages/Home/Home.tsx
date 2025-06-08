import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/Banner";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className='h-[200vh] bg-white mt-[200px]'>
        <Banner />
      </div>
      <Footer />
    </>
  );
};

export default Home;