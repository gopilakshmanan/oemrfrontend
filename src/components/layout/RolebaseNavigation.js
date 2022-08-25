import useAuth from "../../hooks/useAuth"
import useHasRole from "../../hooks/useHasRole"
import { Link } from "react-router-dom"

const RolebasedNavigation = () => {
    const { auth } = useAuth()
    const hasRole = useHasRole()

    let navs = []
    let key=0
    if (hasRole('MA')){
        navs.push(<div key={key++} className="nav-item"><Link to="/dashboard" className='nav-link'>Dashboard</Link></div>)
    }
    if (hasRole('MD')) {
        navs.push(<div key={key++} className='nav-item'><Link to="/dashboard" className='nav-link'>Dashboard</Link></div>)
    }
    if (hasRole('ADMIN')) {
        navs.push(<div key={key++} className='nav-item'><Link to="/dashboard" className='nav-link'>Dashboard</Link></div>)
    }
    if (auth?.user){
        navs.push(<div key={key++} className='nav-item'><Link to="/" className='nav-link'>[Book Appointment]</Link></div>)
        navs.push(<div key={key++} className='nav-item'><Link to="/logout" className='nav-link'>Logout</Link></div>)
        navs.push(<div key={key++} className='nav-item'><Link to="/md1" className='nav-link'>TODO</Link></div>)
    } else {
        navs.push(<div key={key++} className='nav-item'><Link to="/" className='nav-link'>Book Appointment</Link></div>)
        navs.push(<div key={key++} className='nav-item'><Link to="/login" className='nav-link'>Facility Login</Link></div>)
        navs.push(<div key={key++} className='nav-item'><Link to="/todo" className='nav-link'>TODO</Link></div>)
    }
    
    return (navs)
}

export default RolebasedNavigation