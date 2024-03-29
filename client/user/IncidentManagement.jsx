import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {Button} from "react-bootstrap";
import {toast} from 'react-toastify';
import {Link as RouterLink} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
//import Person from '@material-ui/core/Person'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {list} from './api-user.js'
//import unicornbikeImg from './../assets/images/unicornbikeImg.jpg'
import unicornbikeImg from './../assets/images/TeamLogo.png'
import ConfirmationModal from "../src/components/ConfirmationModal";
import IncidentModal from "../src/components/IncidentModal";
import IncidentTable from "../src/components/IncidentTable";
import { createIncident, deleteIncident, editIncident, fetchIncidents } from "../src/queries/incident";
import { createIncidentEx, deleteIncidentEx, editIncidentEx, fetchIncidentsEx } from "../src/queries/incident";

const useStyles = makeStyles(theme => ({
    card: {
    // Define your card styles here
    },
    textField: {
    // Define your text field styles here
    },
    error: {
    // Define your error icon styles here
    },
    submit: {
    // Define your submit button styles here
    },
    title: {
    // Define your title styles here
    },
    root: {
    // Define your root styles here
    },
}));

export default function Users() {
const [users, setUsers] = useState([])
useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
    console.log(data)
    if (data && data.error) { 
        console.log(data.error)
    } else { 
        console.log(data)
        setUsers(data)
    } 
    })
    return function cleanup(){ 
        abortController.abort()
    } 
}, [])
 
const classes = useStyles()
const queryClient = useQueryClient();

const [showModal, setShowModal] = useState(false);
const [editingIncident, setEditingIncident] = useState(null);

const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
const [incidentToDelete, setIncidentToDelete] = useState(null);

//const { data: incidents, error, isLoading } = useQuery({ queryKey: ['incidents'], queryFn: fetchIncidents });
const { data: incidents, error, isLoading } = useQuery({ 
        queryKey: ['incidents'], queryFn: fetchIncidentsEx 
    });

/*    
const editIncidentMutation = useMutation({
    mutationFn: editIncident,
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      toast.success('Incident successfully edited!');
    }
  });
*/
const editIncidentMutation = useMutation({
    mutationFn: editIncidentEx,
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      toast.success('Incident successfully edited!');
    }
  });


/*  
const deleteIncidentMutation = useMutation({
    mutationFn: deleteIncident,
    onSuccess: () => {
        queryClient.invalidateQueries(['incidents']);
        toast.success('Incident successfully deleted!');
    }
});
*/
const deleteIncidentMutation = useMutation({
    mutationFn: deleteIncidentEx,
    onSuccess: () => {
        queryClient.invalidateQueries(['incidents']);
        toast.success('Incident successfully deleted!');
    }
});


/*
const addIncidentMutation = useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
        queryClient.invalidateQueries(['incidents']);
        toast.success('Incident successfully added!');
    }
});
*/

const addIncidentMutation = useMutation({
    mutationFn: createIncidentEx,
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
        <ToastContainer />
        <div className="d-flex justify-content-end mb-3">
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

