import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
//Job
import Login from './component/Login'
import Register from './component/Register'
import Dashboard from './component/DnsManager/Dashboard'
import Page_404 from './component/Page_404'
import ProtectedRoute from './ProtectedRoute'
const App = () => {

  return (
    <>
  <Router>
        <Routes>
        {/* <Route exact path='/' element={<ProtectedRoute component={Dashboard}/>}/>   */}
        <Route path='/' exact element={<Dashboard/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/signup' exact element={<Register/>}/>
        <Route path='*' element={<Page_404/>}/>
        </Routes>
  </Router>
    </>
  )
}

export default App