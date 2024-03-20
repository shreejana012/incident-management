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

