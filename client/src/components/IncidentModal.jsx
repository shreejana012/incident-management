import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function IncidentModal ({ show, handleClose, handleSave, currentIncident }) {
  const initialState = { incidenttype: '', description: '', status: '' };
  const [incident, setIncident] = useState(initialState);

  useEffect(() => {
    setIncident(currentIncident || initialState);
  }, [currentIncident]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setIncident(initialState);
    handleClose();
  };

  const handleModalSave = () => {
    handleSave(incident);
    setIncident(initialState);
  };

  return (
    <Modal show={show} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Incident Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Incident Type</Form.Label>
            <Form.Control
              type="text"
              name="incidenttype"
              value={incident.incidenttype}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={incident.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={incident.status}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        <Button variant="primary" onClick={handleModalSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default IncidentModal;
