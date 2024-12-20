import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customer"}>Customers</Link>
        <Link to={"/training"}>Trainings</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <Link to={"/charts"}>Charts</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default App
