import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useValidator from '../hooks/useValidator'
import Config from '../config/Config.json'
import axios from '../config/axios'
import Spinner from 'react-bootstrap/Spinner'
import { MandatoryMsg } from '../constants/CommonConstants'

const Login = () => {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [validator, showValidationMessage] = useValidator()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    },[])
    useEffect(() => {
        setErrMsg('')
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validator.allValid()) {
            showValidationMessage(true)
            return
        }

        try {
            setIsLoading(true)
            const params = new URLSearchParams({ client_id: Config.auth.client_id })
            params.append('grant_type', 'password')
            params.append('user_role', 'users')
            params.append('scope', Config.auth.scope)
            params.append('username', user)
            params.append('password', pwd)
            const authResponse = await axios.post('/oauth2/' + Config.site +'/token', params.toString(),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            )
            const userResponse = await axios.get('/apis/' + Config.site + `/api/findbyusername/list/${user}`,
                {
                    headers:
                    {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": `Bearer ${authResponse.data.access_token}`
                    }
                }
            )
            const groupResponse = await axios.get('/apis/' + Config.site + `/api/usergroups/list/${user}`,
                { headers: 
                    { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${authResponse.data.access_token}`
                    } 
                }
            )
            setAuth({ id: userResponse.data.id, user, pwd, roles: groupResponse.data.map(r => r.name), accessToken: authResponse.data.access_token })
            setUser('')
            setPwd('')
            navigate('/dashboard', { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section>
            <h2>Facility Login</h2>
            <div className="jumbotron">
                <div className="container">
                    <MandatoryMsg />
                    <p ref={errRef} className={errMsg ? "text-danger" : "d-none"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username <span className='text-danger'>*</span></label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                className="form-control"
                            />
                            {validator.message("user", user, "required")}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password <span className='text-danger'>*</span></label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                className="form-control"
                            />
                            {validator.message("pwd", pwd, "required")}
                        </div>
                        <button className="btn btn-primary" disabled={isLoading}>
                            {isLoading
                                ? <span className='mr-2'><Spinner animation="border" size="sm" /></span>
                                : ''}
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login