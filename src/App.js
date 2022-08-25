import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { Routes, Route } from "react-router-dom"
import BookAppointment from './components/public/BookAppointment'
import Thankyou from './components/public/Thankyou'
import Dashboard from './components/admin/Dashboard'
import Layout from './components/layout/Layout'
import Login from './components/Login'
import Logout from './components/Logout'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'
import AppoinmentStatus from './components/admin/AppoinmentStatus'
import SessionTimedout from './components/SessionTimedout'
import Encounter from './components/admin/Encounter'
import Todo from './components/admin/Todo'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<BookAppointment />} />
        <Route path="thankyou" element={<Thankyou />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="/se" element={<SessionTimedout />} />
        <Route path="todo" element={<Todo />} />
        
        <Route element={<RequireAuth/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cs" element={<AppoinmentStatus />} />
          <Route path="enc" element={<Encounter />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
