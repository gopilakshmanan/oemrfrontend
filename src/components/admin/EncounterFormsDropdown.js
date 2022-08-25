import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Spinner from 'react-bootstrap/Spinner'

const EncounterFormsDropDown = ({ tabItems, setTabUsed, eid, isLoading }) => {
    return (
        <>
            {isLoading
                ? <span className='mr-2'><Spinner animation="border" size="sm" as="span" /></span>
                : null}
            <DropdownButton
                as={ButtonGroup}
                title='Add Form'
                variant='secondary'
                disabled={eid === null || isLoading ? true : false}
            >
                {tabItems.map((t, index) => {
                    return t.form_id === null
                        ? <Dropdown.Item
                            key={t.id}
                            eventKey={t.id}
                            onSelect={(e) => { setTabUsed(e) }}
                            href="#">{t.name}
                        </Dropdown.Item>
                        : null
                })}
            </DropdownButton>
        </>
    )
}

export default EncounterFormsDropDown