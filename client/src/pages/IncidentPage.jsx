import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIncident, deleteIncident, editIncident, fetchIncidents } from "../queries/incident";
import IncidentTable from "../components/IncidentTable";
import { useState } from "react";
import IncidentModal from "../components/IncidentModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';

const IncidentPage = () => {

  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);


  const { data: incidents, error, isLoading } = useQuery({ queryKey: ['incidents'], queryFn: fetchIncidents });

  const editIncidentMutation = useMutation({
    mutationFn: editIncident,
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      toast.success('Incident successfully edited!');
    }
  });

  const deleteIncidentMutation = useMutation({
    mutationFn: deleteIncident,
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      toast.success('Incident successfully deleted!');
    }
  });

  const addIncidentMutation = useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      toast.success('Incident successfully added!');
    }
  });



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;


  const handleEdit = (incident) => {
    setEditingIncident(incident);
    setShowModal(true);
  };

  const handleSave = async (incident) => {
    if (editingIncident) {
      editIncidentMutation.mutate(incident)
    } else {
      addIncidentMutation.mutate(incident)
    }
    setShowModal(false);
    setEditingIncident(null);
  };

  const handleDelete = async (incidentId) => {
    setIncidentToDelete(incidentId);
    setShowDeleteConfirmation(true);
    // console.log("delete", incidentId)
    // deleteIncidentMutation.mutate(incidentId);
  };

  const confirmDelete = () => {
    if (incidentToDelete) {
      deleteIncidentMutation.mutate(incidentToDelete, {
        onSuccess: () => {
          setShowDeleteConfirmation(false);
          setIncidentToDelete(null);
        }
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3 mt-3">
        <Button variant="success" onClick={() => setShowModal(true)}>Add New Incident</Button>
      </div>

      <IncidentTable
        incidents={incidents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <IncidentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        currentIncident={editingIncident}
      />

      <ConfirmationModal
        show={showDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmation(false)}
        handleConfirm={confirmDelete}
        message="Are you sure you want to delete this incident?"
      />
    </div>
  )
}

export default IncidentPage;