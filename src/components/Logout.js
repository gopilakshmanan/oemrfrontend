import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setAuth({})
        navigate("/", { replace: true })
    }, [setAuth, navigate])
}

export default Logout