import axios from "axios";

export const fetchIncidents = async () => {
  try {
    console.log("fetching incidents");
    const response = await axios.get('http://localhost:8081/api/incidents', {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the incidents:', error);
  }
};

export const fetchIncidentsEx = async () => { 
  console.log("fetchIncidentsEx");
  try {
    let response = await fetch('/api/incidents/', { 
    method: 'GET',
  })
  return await response.json() 
  } catch(error) {
    console.error('There was an error fetching the incidents:', error);
  }
};

export const createIncident = async (params) => {
  try {
    console.log("creating incident");
    const response = await axios.post('http://localhost:8081/api/incidents', {
      incidenttype: params.incidenttype,
      description: params.description,
      status: params.status
    },
      {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      }

    );
    return response.data;
  } catch (error) {
    console.error('There was an error creating the incident:', error);
  }
};


export const createIncidentEx = async (user) => { 
  console.log("createIncidentEx");
  try {
      let response = await fetch('/api/incidents/', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
  },
  body: JSON.stringify(user) 
  })
  return await response.json() 
  } catch(error) {
      console.error('There was an error creating the incident:', error);
  }
};

export const editIncident = async (params) => {
  try {
    console.log("updating incident");
    const response = await axios.put(`http://localhost:8081/api/incidents/${params._id}`, {
      incidenttype: params.incidenttype,
      description: params.description,
      status: params.status
    },
      {
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the incident:', error);
  }
};


export const editIncidentEx = async (params) => { 
  console.log("editIncidentEx");
  try {
    let response = await fetch('/api/incidents/' + params._id, { 
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params) 
    })
    return await response.json() 
  } catch(err) {
    console.log(err) 
  }
}
  

export const deleteIncident = async (id) => {
  try {
    console.log("updating incident");
    const response = await axios.delete(`http://localhost:8081/api/incidents/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    });
    return response.data;
  } catch (error) {
    console.error('There was an error deleting the incident:', error);
  }
};

export const deleteIncidentEx = async (id) => { 
  try {
      let response = await fetch('/api/incidents/' + id, { 
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
  })
  return await response.json() 
  } catch(err) {
    console.error('There was an error deleting the incident:', error);
  }
}
