import { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import Config from '../../config/Config.json'
import { useLocation, useNavigate } from 'react-router-dom'
import PatientInfo from './PatientInfo'
import { MandatoryMsg } from '../../constants/CommonConstants'
import * as AppointmentConstants from '../../constants/AppointmentConstants'
import Spinner from 'react-bootstrap/Spinner'
import { useLocalStorage } from '../../hooks/useStorage'

const AppointmentStatus = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const axios = useAxios()

    const [status, setStatus] = useState('')
    const [provider, setProvider] = useState('')
    const [providers, setProviders] = useLocalStorage('providers',[])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [data, setData] = useState({ pc_eventDate: '', pc_startTime : '', pc_hometext :'' })

    const handleBackClick = () => {
        navigate('/dashboard')
    }
    const handleSaveClick = () => {
        (async () => {
            try {
                setIsSaving(true)
                await axios.put('apis/' + Config.site + `/api/appointment/appointment/${location.state.aid}`,
                {
                    providerid: provider,
                    apptstatus: status
                })
                navigate('/dashboard', { state: { aid: location.state.aid } })
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/se', { replace: true })
                } else {
                    console.error(error)
                }
            } finally {
                setIsLoading(false)
            }
        })()
    }

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get('apis/' + Config.site + `/api/appointment/${location.state.aid}`,
                    { signal: controller.signal })
                if (providers.length === 0){
                    const providersresponse = await axios.get('apis/' + Config.site + `/api/providers/list`,
                        { signal: controller.signal })
                    setProviders(providersresponse.data)
                }
                setData(response.data[0])
                setStatus(response.data[0].pc_apptstatus)
                setProvider(response.data[0].pc_aid)
                setIsLoading(false)
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/se', { replace: true })
                }
                if (error?.code !== "ERR_CANCELED") {
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
        <section>
            <PatientInfo puuid={location.state.puuid} />
            <h1>Appointment Status</h1>
            <MandatoryMsg />
            {isLoading
                ? <Spinner animation="border" size="sm" as="span" />
                : null}
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>
                            Appointment Date
                        </label>
                        <input
                            type="date"
                            value={data?.pc_eventDate}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label>
                            Appointment Time
                        </label>
                        <input
                            type="text"
                            value={data?.pc_startTime}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group col-md-12">
                        <label>
                            Reason for Visit
                        </label>
                        <input
                            type="text"
                            value={data?.pc_hometext}
                            className="form-control"
                            disabled
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="apptstatus">
                            Appointment Status <span className='text-danger'>*</span>
                        </label>
                        <select 
                            id='apptstatus'
                            className='form-control'
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            {
                                AppointmentConstants.OPTIONS.map((opt, index) => { return <option key={index} value={opt.key}>{opt.value}</option> })
                            }
                        </select>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="provider">
                            Assigned Provider <span className='text-danger'>*</span>
                        </label>
                        <select
                            id='provider'
                            className='form-control'
                            onChange={(e) => setProvider(e.target.value)}
                            value={provider}
                        >
                            {
                                providers.map((opt, index) => { return <option key={index} value={opt.id}>{opt.fname + ' ' + opt.lname}</option> })
                            }
                        </select>
                    </div>
                </div>
            </form>
            <button className='btn btn-primary mr-1' onClick={handleSaveClick} disabled={isLoading || isSaving}>
                {isSaving
                    ? <span className='mr-2'><Spinner animation="border" size="sm" as="span" /></span>
                    : null}
                Save
            </button>
            <button className='btn btn-secondary' onClick={handleBackClick}>Back</button>
        </section>
    )
}

export default AppointmentStatus