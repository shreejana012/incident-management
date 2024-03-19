import mongoose from 'mongoose'
const IncidentSchema = new mongoose.Schema({
    incidenttype: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    update_datetime: {
        type: Date,
        default: Date.now
    },
    salt: String
});


export default mongoose.model('Incident', IncidentSchema);
