import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../components/Header'
import Footer from '../components/Footer'


const BookedLayout = () => {
  return (
    <div>
      <Header/>
      <main style={{ paddingTop: '150px' }}>
        <Outlet /> 
      </main>
      <Footer/>
    </div>
  )
}

export default BookedLayout
