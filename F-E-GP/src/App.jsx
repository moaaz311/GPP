import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import './App.css'
import Home from './Components/Home/Home'
import About from "./Components/About/About"
import AllJobs from './Components/AllJobs/AllJobs'
import Login from './Components/Login/Login'
import RegisterState from './Components/RegisterState/RegisterState'
import RegisterEmployee from "./Components/RegisterEmployee/RegisterEmployee"
import RegisterCompany from "./Components/RegisterCompany/RegisterCompany"
import InternetSpeedChecker from './Components/InternetSpeed/InternetSpeed'
import Industry from './Components/Industry/Industry'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import NotFound from './Components/NotFound/NotFound'
import CompanyPage from './Components/CompanyPage/CompanyPage'
import { TheUserContext } from './Components/UserContext/UserContext'
import CVBuilder from './Components/CVBuilder/CVBuilder'
import EmployeePage from './Components/EmployeePage/EmployeePage'
import JobDetails from './Components/JobDetails/JobDetails'
function App() {
  const { userData } = useContext(TheUserContext);
  return (
    <>
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/alljobs' element={<ProtectedRoute userData={userData}><AllJobs/></ProtectedRoute>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={< RegisterState/>}/>
      <Route path='/registeremployee' element={<RegisterEmployee/>}/>
      <Route path='/registeremployer' element={< RegisterCompany/>}/>
      <Route path='/companypage' element={< CompanyPage/>}/>
      <Route path='/employeepage' element={< EmployeePage />}/>
      <Route path='/internetspeed' element={< InternetSpeedChecker/>}/>
      <Route path='/industry' element={<Industry/>}/>
      <Route path='/cvbuilder' element={<ProtectedRoute userData={userData}><CVBuilder /></ProtectedRoute>}/>
      <Route path='/*' element={<NotFound/>}/>
      <Route path='/companypage' element={<CompanyPage/>}/>
      <Route path='/jobdetails' element={<ProtectedRoute userData={userData}><JobDetails/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
