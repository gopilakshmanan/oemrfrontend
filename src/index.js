import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/layout/NavigationBar'
import { Helmet, HelmetData } from 'react-helmet-async'
import Config from './config/Config.json'
import Footer from './components/layout/Footer'
import Favicon from './components/Favicon'
import { EncounterPropsProvider } from './context/EncounterPropsProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Helmet helmetData={new HelmetData({})}>
      <title>{Config.brand}</title>
    </Helmet>
    
    <BrowserRouter>
      <Favicon />
      <AuthProvider>
        <EncounterPropsProvider>
        <NavigationBar />
          <main className='container-fluid fix-view-port-height'>
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          </main>
        </EncounterPropsProvider>
      </AuthProvider>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
)
