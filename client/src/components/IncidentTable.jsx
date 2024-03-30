/* eslint-disable react/prop-types */
import { Table, Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

function IncidentTable ({ incidents, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Description</th>
          <th>Incident Type</th>
          <th>Status</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident, index) => (
          <tr key={index}>
            <td>{incident.description}</td>
            <td>{incident.incidenttype}</td>
            <td>{incident.status}</td>
            <td>{formatDistanceToNow(new Date(incident.update_datetime), { addSuffix: true })}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(incident)} style={{ marginRight: '5px' }}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(incident._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default IncidentTable;
