import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom'
import useEncounterProps from '../../hooks/useEncounterProps'
import axios from '../../config/axios'
import Config from '../../config/Config.json'
import { format } from 'date-fns'
import ConfirmDelete from './ConfirmDelete'

const SoapNotes = ({ setTabSaved, setTabDeleted, form_id }) => {
    const navigate = useNavigate()

    const { encProps } = useEncounterProps()
    const [subjective, setSubjective] = useState('')
    const [objective, setObjective] = useState('')
    const [assessment, setAssessment] = useState('')
    const [plan, setPlan] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                if (form_id === null) {
                    setIsLoading(false)
                } else {
                    const response = await axios.get('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/soap_note/${form_id}`,
                        { signal: controller.signal })
                    setSubjective(response.data.subjective)
                    setObjective(response.data.objective)
                    setAssessment(response.data.assessment)
                    setPlan(response.data.plan)
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
            setIsSaving(true)
            const data = {
                "date": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                "subjective": subjective,
                "objective": objective,
                "assessment": assessment,
                "plan": plan
            }
            if (form_id === null) {
                const response = await axios.post('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/soap_note`,
                    data)
                form_id = response.data.sid
            } else {
                await axios.put('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/soap_note/${form_id}`,
                    data)
            }
            setTabSaved("11", form_id)
            setIsSaving(false)
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/se', { replace: true })
            }
            if (error?.code !== "ERR_CANCELED") {
                setIsSaving(false)
                console.error(error)
            }
        }
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        setShowDeleteConfirmation(true)
    }
    const handleDeleteYesClick = async (e) => {
        e.preventDefault()
        try {
            setIsDeleting(true)
            if (form_id !== null){
                await axios.delete('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/soap_note/${form_id}`)
            }
            setTabDeleted("11")
            setShowDeleteConfirmation(false)
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
    const handleDeleteNoClick = (e) => {
        e.preventDefault()
        setShowDeleteConfirmation(false)
    }

    return (
        <article>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label>
                        Subjective
                        {isLoading
                            ? <span className='ml-2'><Spinner animation="border" size="sm" as="span" /></span>
                            : null}
                    </label>
                    <textarea
                        type="textarea"
                        value={subjective}
                        onChange={(e) => setSubjective(e.target.value)}
                        className="form-control"
                        rows={3}
                    />
                </div>
                <div className="form-group col-md-12">
                    <label>Objective</label>
                    <textarea
                        type="textarea"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        className="form-control"
                        rows={3}
                    />
                </div>
                <div className="form-group col-md-12">
                    <label>Assessment</label>
                    <textarea
                        type="textarea"
                        value={assessment}
                        onChange={(e) => setAssessment(e.target.value)}
                        className="form-control"
                        rows={3}
                    />
                </div>
                <div className="form-group col-md-12">
                    <label>Plan</label>
                    <textarea
                        type="textarea"
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        className="form-control"
                        rows={3}
                    />
                </div>
            </div>
            <button className='btn btn-primary' onClick={handleSaveClick} disabled={isLoading || isSaving}>
                {isSaving
                    ? <span className='mr-2'><Spinner animation="border" size="sm" as="span" /></span>
                    : null}
                Save
            </button>
            <button className='btn btn-danger ml-1' onClick={handleDeleteClick} disabled={isLoading || isSaving}>
                Delete
            </button>

            <ConfirmDelete 
                bodymsg='Are you sure you want to delete SOAP?' 
                showDeleteConfirmation={showDeleteConfirmation}
                handleDeleteNoClick={handleDeleteNoClick}
                handleDeleteYesClick={handleDeleteYesClick}
                isDeleting={isDeleting}
            />
        </article>
    )
}

export default SoapNotes