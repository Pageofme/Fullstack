import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePage from '../components/HomePage'

const HomeLayout = () => {
  return (
    <div>
      <Header/>
      <HomePage/>
      <main>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  )
}

export default HomeLayout
