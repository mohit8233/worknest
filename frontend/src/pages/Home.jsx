import React from 'react'
// import Header from './components/Header'
import Header from '../components/Header'
import HeroSection from '../honeSection/HeroSection'
import JobGrid from '../honeSection/JobGrid'
import Talent from '../honeSection/Talent'
import WhyChooseUs from '../honeSection/WhyChooseUs'
import jobsData from "../Data/jobData";
import ClientQuote from '../honeSection/ClientQuote';
import  { useState } from "react";
import Footer from '../components/Footer'


const Home = () => {

     const [searchTitle, setSearchTitle] = useState("");
      const [searchLocation, setSearchLocation] = useState("");
  return (
    <div>
         <Header/>
           <HeroSection
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <JobGrid
        searchTitle={searchTitle}
        searchLocation={searchLocation}
        jobsData={jobsData}
      />
          <Talent/>
          <WhyChooseUs/>
          <ClientQuote/>
          <Footer/>
    </div>
  )
}

export default Home