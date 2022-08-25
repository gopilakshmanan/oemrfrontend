import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import axios from '../../config/axios'
import Config from '../../config/Config.json'
import { useNavigate } from 'react-router-dom'
import useEncounterProps from '../../hooks/useEncounterProps'
import ConfirmDelete from './ConfirmDelete'

const Vitals = ({ setTabSaved, setTabDeleted, form_id }) => {
    const navigate = useNavigate()

    const { encProps } = useEncounterProps()
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bps, setBps] = useState('')
    const [bpd, setBpd] = useState('')
    const [pulse, setPulse] = useState('')
    const [respiration, setRespiration] = useState('')
    const [temperature, setTemperature] = useState('')
    const [temperatureLocation, setTemperatureLocation] = useState('')
    const [oxygenSaturation, setOxygenSaturation] = useState('')
    const [oxygenFlowRate, setOxygenFlowRate] = useState('')
    const [inhaledOxygenConcentration, setInhaledOxygenConcentration] = useState('')
    const [headCircumference, setHeadCircumference] = useState('')
    const [waistCircumference, setWaistCircumference] = useState('')
    const [bmi, setBmi] = useState('')
    const [bmiStatus, setBmiStatus] = useState('')
    const [otherNotes, setOtherNotes] = useState('')
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
                    const response = await axios.get('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/vital/${form_id}`,
                        { signal: controller.signal })
                    setHeight(response.data.height)
                    setWeight(response.data.weight)
                    setBps(response.data.bps)
                    setBpd(response.data.bpd)
                    setPulse(response.data.pulse)
                    setRespiration(response.data.respiration)
                    setTemperature(response.data.temperature)
                    setTemperatureLocation(response.data.temp_method)
                    setOxygenSaturation(response.data.oxygen_saturation)
                    setOxygenFlowRate(response.data.oxygen_flow_rate)
                    setInhaledOxygenConcentration(response.data.inhaled_oxygen_concentration)
                    setHeadCircumference(response.data.head_circ)
                    setWaistCircumference(response.data.waist_circ)
                    setBmi(response.data.BMI)
                    setBmiStatus(response.data.BMI_status)
                    setOtherNotes(response.data.note)
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
                "weight": weight,
                "height": height,
                "bps": bps,
                "bpd": bpd,
                "pulse": pulse,
                "respiration": respiration,
                "temperature": temperature,
                "temp_method": temperatureLocation,
                "oxygen_saturation": oxygenSaturation,
                "oxygen_flow_rate": oxygenFlowRate,
                "inhaled_oxygen_concentration": inhaledOxygenConcentration,
                "head_circ": headCircumference,
                "waist_circ": waistCircumference,
                "BMI": bmi,
                "BMI_status": bmiStatus,
                "note": otherNotes,
            }
            if (form_id === null) {
                const response = await axios.post('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/vital`,
                    data)
                form_id = response.data.vid
            } else {
                await axios.put('apis/' + Config.site + `/api/patient/${encProps.pid}/encounter/${encProps.eid}/vital/${form_id}`,
                    data)
            }
            setTabSaved("12", form_id)
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
            if (form_id !== null) {
                alert('not implemented')
            }
            setTabDeleted("12")
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
                <div className="form-group col-md-6">
                    <label>
                        Height (in) <span className='text-muted small'>(LOINC: 8302-2)</span>
                        {isLoading
                            ? <span className='ml-2'><Spinner animation="border" size="sm" as="span" /></span>
                            : null}
                    </label>
                    <input
                        type="text"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Weight (lbs) <span className='text-muted small'>(LOINC: 29463-7)</span>
                    </label>
                    <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        BP Systolic (mmHg) <span className='text-muted small'>(LOINC: 8480-6)</span>
                    </label>
                    <input
                        type="text"
                        value={bps}
                        onChange={(e) => setBps(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        BP Diastolic (mmHg) <span className='text-muted small'>(LOINC: 8462-4)</span>
                    </label>
                    <input
                        type="text"
                        value={bpd}
                        onChange={(e) => setBpd(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Pulse (per min) <span className='text-muted small'>(LOINC: 8867-4)</span>
                    </label>
                    <input
                        type="text"
                        value={pulse}
                        onChange={(e) => setPulse(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Respiration (per min) <span className='text-muted small'>(LOINC: 9279-1)</span>
                    </label>
                    <input
                        type="text"
                        value={respiration}
                        onChange={(e) => setRespiration(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Temperature (F) <span className='text-muted small'>(LOINC: 8310-5)</span>
                    </label>
                    <input
                        type="text"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Temp Location <span className='text-muted small'>(LOINC: 8327-9)</span>
                    </label>
                    <select 
                        value={temperatureLocation} 
                        onChange={(e) => setTemperatureLocation(e.target.value)}
                        className="form-control">
                        <option value=''></option>
                        <option value='Axillary'>Axillary</option>
                        <option value='Oral'>Oral</option>
                        <option value='Rectal'>Rectal</option>
                        <option value='Temporal Artery'>Temporal Artery</option>
                        <option value='Tympanic Membrane'>Tympanic Membrane</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Oxygen Saturation (%) <span className='text-muted small'>(LOINC: 59408-5)</span>
                    </label>
                    <input
                        type="text"
                        value={oxygenSaturation}
                        onChange={(e) => setOxygenSaturation(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Oxygen Flow Rate (l/min) <span className='text-muted small'>(LOINC: 3151-8)</span>
                    </label>
                    <input
                        type="text"
                        value={oxygenFlowRate}
                        onChange={(e) => setOxygenFlowRate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Inhaled Oxygen Concentration (%) <span className='text-muted small'>(LOINC: 3150-0)</span>
                    </label>
                    <input
                        type="text"
                        value={inhaledOxygenConcentration}
                        onChange={(e) => setInhaledOxygenConcentration(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6"></div>
                <div className="form-group col-md-6">
                    <label>
                        Head Circumference (in) <span className='text-muted small'>(LOINC: 9843-4)</span>
                    </label>
                    <input
                        type="text"
                        value={headCircumference}
                        onChange={(e) => setHeadCircumference(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        Waist Circumference (in)
                    </label>
                    <input
                        type="text"
                        value={waistCircumference}
                        onChange={(e) => setWaistCircumference(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        BMI (kg/m^2) <span className='text-muted small'>(LOINC: 39156-5)</span>
                    </label>
                    <input
                        type="text"
                        value={bmi}
                        onChange={(e) => setBmi(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-6">
                    <label>
                        BMI Status (Type)
                    </label>
                    <input
                        type="text"
                        value={bmiStatus}
                        onChange={(e) => setBmiStatus(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-12">
                    <label>
                        Other Notes
                    </label>
                    <textarea
                        type="textarea"
                        value={otherNotes}
                        onChange={(e) => setOtherNotes(e.target.value)}
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
                bodymsg='Are you sure you want to delete Vital?'
                showDeleteConfirmation={showDeleteConfirmation}
                handleDeleteNoClick={handleDeleteNoClick}
                handleDeleteYesClick={handleDeleteYesClick}
                isDeleting={isDeleting}
            />
        </article>
    )
}

export default Vitals