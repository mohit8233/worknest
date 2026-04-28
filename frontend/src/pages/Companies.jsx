import React from 'react'
import Header from '../components/Header'
import TopHiringCompanies from '../jobSection/TopHiringCompanies'
import HowToApply from '../companies/HowToApply'
import Footer from '../components/Footer'
import CTASection from '../companies/CTASection'
import FAQ from '../companies/FAQ'

const Companies = () => {
  return (
    <div>
        <Header/>
        <TopHiringCompanies/>
        <HowToApply/>
        <CTASection/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default Companies