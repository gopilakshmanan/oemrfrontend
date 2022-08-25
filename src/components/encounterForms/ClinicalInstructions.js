import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'

const ClinicalInstruction = ({ setTabSaved })  => {
    const [clinicalInstructions, setClinicalInstructions] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const handleSaveClick = async (e) => {
        e.preventDefault()
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault()
    }

    return (
        <article>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label>
                        Clinical Instructions <span className='text-danger'>*</span>
                        {isLoading
                            ? <span className='ml-2'><Spinner animation="border" size="sm" as="span" /></span>
                            : null}
                    </label>
                    <textarea
                        type="textarea"
                        value={clinicalInstructions}
                        onChange={(e) => setClinicalInstructions(e.target.value)}
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
            <button className='btn btn-danger ml-1' onClick={handleDeleteClick} disabled={isLoading || isSaving}>
                Delete
            </button>
        </article>
    )
}

export default ClinicalInstruction