import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'
import useEncounterProps from '../../hooks/useEncounterProps'
import axios from '../../config/axios'
import Config from '../../config/Config.json'
import { format } from 'date-fns'

const NewEncounterForm = ({ setTabSaved }) => {
    const navigate = useNavigate()

    const { encProps, setEncProps } = useEncounterProps()
    const [chiefComplaint, setChiefComplaint] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                if (encProps.euuid === null) {
                    setIsLoading(false)
                } else {
                    const response = await axios.get('apis/' + Config.site + `/api/patient/${encProps.puuid}/encounter/${encProps.euuid}`,
                        { signal: controller.signal })
                    setChiefComplaint(response.data.data.reason)
                    setIsLoading(false)
                }
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

    const handleSaveClick = async (e) => {
        e.preventDefault()
        try {
            if (encProps.euuid === null) {
                setIsSaving(true)
                const response = await axios.post('apis/' + Config.site + `/api/patient/${encProps.puuid}/encounter`,
                    { 
                        "date": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        "onset_date": "",
                        "reason": chiefComplaint,
                        "facility": null,
                        "pc_catid": "5",
                        "facility_id": "3",
                        "billing_facility": "3",
                        "sensitivity": "normal",
                        "referral_source": "",
                        "pos_code": "0",
                        "external_id": encProps.aid,
                        "provider_id": "1",
                        "class_code": "AMB"
                    })
                setEncProps(prev => { 
                    return  {...prev, 
                        eid: response.data.data.encounter, 
                        euuid: response.data.data.uuid
                    }
                })
                setTabSaved("1")
                setIsSaving(false)
            } else {
                setIsSaving(true)
                await axios.put('apis/' + Config.site + `/api/patient/${encProps.puuid}/encounter/${encProps.euuid}`,
                    {
                        "date": format(new Date(), 'yyyy-MM-dd'),
                        "onset_date": "",
                        "reason": chiefComplaint,
                        "facility": null,
                        "pc_catid": "5",
                        "facility_id": "3",
                        "billing_facility": "3",
                        "sensitivity": "normal",
                        "referral_source": "",
                        "pos_code": "0",
                        "external_id": encProps.aid,
                        "provider_id": "1",
                        "class_code": "AMB"
                    })
                setIsSaving(false)
            }
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/se', { replace: true })
            }
            if (error?.code !== "ERR_CANCELED") {
                setIsLoading(false)
                console.error(error)
            }
        }
    }

    return (
        <article>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label>
                        Chief Complaint / Observation <span className='text-danger'>*</span>
                        {isLoading
                            ? <span className='ml-2'><Spinner animation="border" size="sm" as="span" /></span>
                            : null}
                    </label>
                    <textarea
                        type="textarea"
                        value={chiefComplaint}
                        onChange={(e) => setChiefComplaint(e.target.value)}
                        className="form-control"
                        rows={5}
                    />
                </div>
            </div>
            <button className='btn btn-primary' onClick={handleSaveClick} disabled={isLoading || isSaving}>
                {isSaving
                    ? <span className='mr-2'><Spinner animation="border" size="sm" as="span" /></span>
                    : null}
                Save
            </button>
        </article>
    )
}

export default NewEncounterForm