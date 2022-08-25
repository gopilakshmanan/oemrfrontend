import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'

const ConfirmDelete = ({ bodymsg, showDeleteConfirmation, handleDeleteNoClick, handleDeleteYesClick, isDeleting }) => {
    return (
        <Modal show={showDeleteConfirmation} onHide={handleDeleteNoClick}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodymsg}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteYesClick} disabled={isDeleting}>
                    {isDeleting
                        ? <span className='mr-2'><Spinner animation="border" size="sm" as="span" /></span>
                        : null}
                    Yes
                </Button>
                <Button variant="secondary" onClick={handleDeleteNoClick} disabled={isDeleting}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDelete