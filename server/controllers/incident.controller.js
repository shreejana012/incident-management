import Incident from '../models/incident.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => { 
    const incident = new Incident(req.body) 
    try {
        await incident.save()
        return res.status(200).json({ 
            message: "Successfully created incident!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const list = async (req, res) => { 
    try {
        let incidents = await Incident.find().select('name email updated created') 
        res.json(incidents)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const incidentByID = async (req, res, next, id) => { 
    try {
        let incident = await Incident.findById(id) 
        if (!incident)
            return res.status('400').json({ 
                error: "Incident not found"
            })
        req.profile = incident 
        next()
    } catch (err) {
        return res.status('400').json({ 
            error: "Could not retrieve incident."
        }) 
    }
}

const read = (req, res) => {
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile) 
}

const update = async (req, res) => { 
try {
    let incident = req.profile
    incident = extend(incident, req.body) 
    incident.updated = Date.now() 
    await incident.save()
    //incident.hashed_password = undefined 
    incident.salt = undefined
    res.json(incident) 
} catch (err) {
    return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
} 
}

const remove = async (req, res) => { 
    try {
        let incident = req.profile
        let deletedIncident = await incident.deleteOne() 
        deletedIncident.hashed_password = undefined 
        deletedIncident.salt = undefined
        res.json(deletedIncident) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

export default { create, incidentByID, read, list, remove, update }
