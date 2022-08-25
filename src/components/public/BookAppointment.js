import { useRef, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import Spinner from 'react-bootstrap/Spinner'
import useAxios from '../../hooks/useAxios'
import Config from "../../config/Config.json"
import { MandatoryMsg } from '../../constants/CommonConstants'

const NAME_REGEX = /^[a-zA-Z][a-zA-Z. ]{3,23}$/
const TIME_REGEX = /^[0-1][0-9][:][0-5][0-9]$/

const BookAppointment = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)
    const [firstNameFocus, setFirstNameFocus] = useState(false)

    const [lastName, setLastName] = useState('')
    const [validLastName, setValidLastName] = useState(false)
    const [lastNameFocus, setLastNameFocus] = useState(false)

    const [dob, setDob] = useState('')
    const [validDob, setValidDob] = useState(false)
    const [dobFocus, setDobFocus] = useState(false)

    const [sex, setSex] = useState('')
    const [validSex, setValidSex] = useState(false)
    const [sexFocus, setSexFocus] = useState(false)

    const [apptDate, setApptDate] = useState('')
    const [validApptDate, setValidApptDate] = useState(false)
    const [apptDateFocus, setApptDateFocus] = useState(false)

    const [apptTime, setApptTime] = useState('')
    const [validApptTime, setValidApptTime] = useState(false)
    const [apptTimeFocus, setApptTimeFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName))
    },[firstName])
    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName))
    }, [lastName])
    useEffect(() => {
        if (new Date(dob) < new Date())
            setValidDob(true)
        else
            setValidDob(false)
    }, [dob])
    useEffect(() => {
        if (sex==='Male' || sex==='Female')
            setValidSex(true)
        else
            setValidSex(false)
    }, [sex])
    useEffect(() => {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        if (new Date(apptDate) >= date)
            setValidApptDate(true)
        else
            setValidApptDate(false)
    }, [apptDate])
    useEffect(() => {
        setValidApptTime(TIME_REGEX.test(apptTime))
    }, [apptTime])

    useEffect(() => {
        setErrMsg('')
    },[firstName,lastName,dob,sex,apptDate,apptTime])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //TODO: perform client side validation
        /*if (!validator.allValid()) {
            showValidationMessage(true)
            return
        }*/

        try {
            setIsLoading(true)
            const patientParams = { 
                DOB: dob,
                fname: firstName,
                lname: lastName,
                sex: sex
            }
            const patientResponse = await axios.post('/apis/' + Config.site +'/api/patient', patientParams)
            const aptDt = new Date(apptDate)
            let month = aptDt.getMonth()+1
            let day = aptDt.getDate()
            if (month.toString().length === 1) month = '0' + month
            if (day.toString().length === 1) day = '0' + day
            const appointmentParams = {
                pc_catid: "5",
                pc_title: "Office Visit",
                pc_duration: "900",
                pc_hometext: "fever....",
                pc_apptstatus: "-",
                pc_eventDate: aptDt.getFullYear() + "-" + month + "-" + day,
                pc_startTime: apptTime,
                pc_facility: "3",
                pc_billing_location: "3",
                pc_eid: "1",
                pc_aid: Config.availableNextProvider,
                username: "admin"
            }
            await axios.post('/apis/default/api/patient/' + patientResponse.data.data.pid +'/appointment', appointmentParams)
            navigate("/thankyou", { replace: true })
        } catch (error) {
            console.error(error)
            setErrMsg('Some thing went wrong.')
        }
        setIsLoading(false)
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "text-danger" : "d-none"}>{errMsg}</p>
            <h1>Book an Appointment</h1>
            <MandatoryMsg />
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="firstName">
                            First Name <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validFirstName ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="firstNameNote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                            className="form-control"
                        />
                        <p id="firstNameNote" className={firstNameFocus && firstName && !validFirstName ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Letters space and period allowed.
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="lastName">
                            Last Name <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validLastName ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastNameNote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                            className="form-control"
                        />
                        <p id="lastNameNote" className={lastNameFocus && lastName && !validLastName ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Letters space and period allowed.
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="dob">
                            Date of Birth <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validDob ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validDob || !dob ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="date"
                            id="dob"
                            autoComplete="off"
                            onChange={(e) => setDob(e.target.value)}
                            aria-invalid={validDob ? "false" : "true"}
                            aria-describedby="dobNote"
                            onFocus={() => setDobFocus(true)}
                            onBlur={() => setDobFocus(false)}
                            className="form-control"
                        />
                        <p id="dobNote" className={dobFocus && dob && !validDob ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter your date of bith.
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="sex">
                            Sex <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validSex ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validSex || !sex ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="text"
                            id="sex"
                            autoComplete="off"
                            onChange={(e) => setSex(e.target.value)}
                            aria-invalid={validSex ? "false" : "true"}
                            aria-describedby="sexNote"
                            onFocus={() => setSexFocus(true)}
                            onBlur={() => setSexFocus(false)}
                            className="form-control"
                        />
                        <p id="sexNote" className={sexFocus && sex && !validSex ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter Male or Female.
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="apptdate">
                            Appointment Date <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validApptDate ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validApptDate || !apptDate ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="date"
                            id="apptdate"
                            autoComplete="off"
                            onChange={(e) => setApptDate(e.target.value+' 00:00:00')}
                            aria-invalid={validApptDate ? "false" : "true"}
                            aria-describedby="apptDateNote"
                            onFocus={() => setApptDateFocus(true)}
                            onBlur={() => setApptDateFocus(false)}
                            className="form-control"
                        />
                        <p id="apptDateNote" className={apptDateFocus && apptDate && !validApptDate ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter appointment date (today or future).
                        </p>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="appttime">
                            Appintment Time <span className='text-danger'>*</span>
                            <FontAwesomeIcon icon={faCheck} className={validApptTime ? "d-inline text-success" : "d-none"} />
                            <FontAwesomeIcon icon={faTimes} className={validApptTime || !apptTime ? "d-none" : "d-inline text-danger"} />
                        </label>
                        <input
                            type="text"
                            id="appttime"
                            autoComplete="off"
                            onChange={(e) => setApptTime(e.target.value)}
                            aria-invalid={validApptTime ? "false" : "true"}
                            aria-describedby="apptTimeNote"
                            onFocus={() => setApptTimeFocus(true)}
                            onBlur={() => setApptTimeFocus(false)}
                            className="form-control"
                        />
                        <p id="apptTimeNote" className={apptTimeFocus && apptTime && !validApptTime ? "d-block" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter appointment time (HH:MM format).
                        </p>
                    </div>
                </div>

                <button className="btn btn-primary"
                    disabled={!validFirstName || !validLastName || !validDob || !validSex || !validApptDate || !validApptTime || isLoading ? true : false}>
                    {isLoading
                        ? <span className='mr-2'><Spinner animation="border" size="sm" /></span>
                        : ''}
                    Book an Appointment
                </button>
            </form>
        </section>
    )
}

export default BookAppointment