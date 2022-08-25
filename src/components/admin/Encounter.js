import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PatientInfo from './PatientInfo'
import AppointmentInfo from './AppointmentInfo'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import EncounterFormsDropDown from './EncounterFormsDropdown'
import * as ClinicalForms from '../encounterForms'
import useEncounterProps from '../../hooks/useEncounterProps'
import { MandatoryMsg } from '../../constants/CommonConstants'
import * as CommonConstants from '../../constants/CommonConstants'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import Config from '../../config/Config.json'

const Encounter = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { encProps } = useEncounterProps()

    const [key, setKey] = useState(null)
    const [tabItems, setTabItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const setTabUsed = (id) => {
        let t = tabItems.filter((t) => t.id === id)
        t[0].used = 1
        const tt = tabItems.filter((t) => t.id !== id)
        setTabItems([...tt, ...t])
        setKey(id)
    }

    const setTabSaved = (id,form_id) => {
        let t = tabItems.filter((t) => t.id === id)
        t[0].form_id = form_id
        const tt = tabItems.filter((t) => t.id !== id)
        setTabItems([...tt, ...t])
        setKey(id)
    }

    const setTabDeleted = (id) => {
        let t = tabItems.filter((t) => t.id === id)
        t[0].form_id = null
        t[0].used = 0
        const tt = tabItems.filter((t) => t.id !== id)
        setTabItems([...tt, ...t])
        setKey("1")
    }

    const showClinicalForm = () => {
        if (key === null) return null
        const t = tabItems.filter((f) => f.id === key)
        const ClinicalForm = ClinicalForms[t[0].directory]
        return ClinicalForm === undefined
            ? ClinicalForms['four_o_four']
            : <ClinicalForm setTabSaved={setTabSaved} setTabDeleted={setTabDeleted} form_id={t[0].form_id} />
    }

    const handleBackClick = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get('apis/' + Config.site + `/api/encforms/list/${encProps.eid}`,
                    { signal: controller.signal })
                if (encProps.eid === null) {
                    let t = response.data.filter((t) => t.id === "1")
                    t[0].used = 1
                    const tt = response.data.filter((t) => t.id !== "1")
                    setTabItems([...tt, ...t])
                    setKey("1")
                } else {
                    let t = response.data.filter((t) => t.form_id !== null)
                    t[0].used = 1
                    const tt = response.data.filter((t) => t.form_id === null)
                    setTabItems([...tt, ...t])
                    setKey(t[0].id)
                }
                setIsLoading(false)
            } catch (error) {
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
            <PatientInfo puuid={encProps.puuid} />
            <AppointmentInfo apptDt={location.state.apptDt} apptTm={location.state.apptTm} rov={location.state.rov} providername={location.state.providername} />
            <h1>Encounter</h1>
            <div className='row mb-2'>
                <div className="col-md-6">
                    <div className="d-flex justify-content-start">
                        <MandatoryMsg />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-end">
                        <EncounterFormsDropDown tabItems={tabItems} setTabUsed={setTabUsed} eid={encProps.eid} isLoading={isLoading} />
                        <button className='btn btn-secondary ml-1' onClick={handleBackClick}>Back to Dashboard</button>
                    </div>
                </div>
            </div>
            
            
            {encProps.euuid === null ? <CommonConstants.EncounterFormsDisabledDropdownTip /> : null}
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                {tabItems.map((tab, index) => {
                    return tab.form_id !== null || tab.used === 1
                        ? <Tab key={index} eventKey={tab.id} title={tab.name} tabClassName={tab?.form_id ? 'text-success' : 'text-secondary'}>
                            <div className="form-group col-md-12 border-right border-bottom border-left py-3">
                                {showClinicalForm()}
                            </div>
                        </Tab>
                        : null
                })}
            </Tabs>
        </section>
    )
}

export default Encounter