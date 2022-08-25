import React, { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import Config from '../../config/Config.json'
import DashboardCard from './DashboardCard'
import WaitingRoom from './WaitingRoom'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import './Dashboard.css'

const Dashboard = () => {
    const axios = useAxios()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get('apis/' + Config.site + '/api/getappointments/' + format(new Date(), 'yyyy-MM-dd') + '/list/' + format(new Date(), 'yyyy-MM-dd'),
                    { signal: controller.signal }) 
                setData(response.data)
                setIsLoading(false)
            } catch(error){
                if (error.response?.status === 401) {
                    navigate('/se', { replace: true })
                }
                if (error.response?.status === 404) {
                    setData([])
                    setIsLoading(false)
                }
                if (error?.code !== "ERR_CANCELED") {
                    setData([])
                    setIsLoading(false)
                    console.error(error)
                }
            }
        })()

        return () => {
            controller.abort()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
        
            <div className="row">
                <DashboardCard isLoading={isLoading} data={data} status='-'/>
                <DashboardCard isLoading={isLoading} data={data} status='@'/>
                <DashboardCard isLoading={isLoading} data={data} status='>'/>
                <DashboardCard isLoading={isLoading} data={data} status='?'/>
            </div>

            <WaitingRoom isLoading={isLoading} data={data}/>
        </>
    )
}

export default Dashboard