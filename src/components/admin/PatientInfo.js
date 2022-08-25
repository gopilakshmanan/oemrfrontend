import { useState, useEffect } from 'react'
import useAxios from '../../hooks/useAxios'
import Config from '../../config/Config.json'
import { format, intervalToDuration } from 'date-fns'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'

const PatientInfo = ({ puuid }) => {
    const axios = useAxios()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const calculateFullAge = (dob) => {
        const { years, months } = intervalToDuration({ start: dob, end: new Date() })
        return  years + ' Years, ' + months + ' Months'
    }

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get('apis/' + Config.site + `/api/patient/${puuid}`,
                    { signal: controller.signal })
                setData(response.data.data)
                setIsLoading(false)
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/se', { replace: true })
                }
                if (error?.code !== "ERR_CANCELED"){
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
        <section className='row border-bottom border-dark bg-light py-2'>
            <div className='col-md-2'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>First Name</div>
                    <div className='text-center'>{data.fname}</div>
                </div>
            </div>
            <div className='col-md-2'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Last Name</div>
                    <div className='text-center'>{data.lname}</div>
                </div>
            </div>
            <div className='col-md-2'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Date Of Birth</div>
                    <div className='text-center'>
                        {isLoading
                            ? <Spinner animation="border" size="sm" as="span" />
                            : data?.DOB 
                                ? format(new Date(data?.DOB), Config.dateFormat) 
                                : null}
                    </div>
                </div>
            </div>
            <div className='col-md-3'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Age</div>
                    <div className='text-center'>{data?.DOB ? calculateFullAge(new Date(data?.DOB)) : null}</div>
                </div>
            </div>
            <div className='col-md-1'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Sex</div>
                    <div className='text-center'>{ data.sex }</div>
                </div>
            </div>
            <div className='col-md-2'>
                <div className='d-flex flex-column'>
                    <div className='text-uppercase text-center'>Phone</div>
                    <div className='text-center'>
                        {data.phone_cell 
                            ? data.phone_cell 
                            : isLoading
                                ? null
                                : 'N/A'}</div>
                </div>
            </div>
        </section>
    )
}

export default PatientInfo