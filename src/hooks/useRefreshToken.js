import axios from '../config/axios'
import useAuth from './useAuth'
import Config from '../config/Config.json'

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()

    const refresh = async () => {
        const params = new URLSearchParams({ client_id: Config.auth.client_id })
        params.append('grant_type', 'password')
        params.append('user_role', 'users')
        params.append('scope', Config.auth.scope)
        params.append('username', auth.user)
        params.append('password', auth.pwd)
        const response = await axios.post('/oauth2/' + Config.site + '/token', params.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        setAuth(prev => {
            return {...prev, accessToken: response.data.accessToken}
        })
        return response.data.accessToken
    }

    return refresh
}

export default useRefreshToken