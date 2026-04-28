import React from 'react'
import Header from '../components/Header'
import FeaturedJobBanner from '../jobSection/FeaturedJobBanner'
import TopHiringCompanies from '../jobSection/TopHiringCompanies'
import JobStats from '../jobSection/JobStats'
import JobGrid from '../honeSection/JobGrid'
import JobSection from '../jobSection/JobSection'
import Footer from '../components/Footer'


const Jobs = () => {
  return (
    <div>
    <Header/>
     <FeaturedJobBanner/>
     <JobSection/>
     <TopHiringCompanies/>
     <JobStats/>
      <Footer/>
    </div>
  )
}

export default Jobs