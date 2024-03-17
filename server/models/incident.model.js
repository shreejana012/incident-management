import mongoose from 'mongoose'
const IncidentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    created: {
        type: Date,
        default: Date.now
    },

    updated: {
        type: Date,
        default: Date.now
    },

    salt: String
});


export default mongoose.model('Incident', IncidentSchema);
