import useAuth from "./useAuth"

const useHasRole = () => {
    const { auth } = useAuth()

    const hasRole = (role) => {
        if (role === 'MA')
            return auth?.roles?.find(role => role === 'Front Office') || auth?.roles?.find(role => role === 'Accounting')
        else if (role === 'MD')
            return auth?.roles?.find(role => role === 'Clinicians') || auth?.roles?.find(role => role === 'Physicians')
        else if (role === 'ADMIN')
            return auth?.roles?.find(role => role === 'Administrators')
        else
            return false
    }
    
    return hasRole
}

export default useHasRole