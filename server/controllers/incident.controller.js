import Incident from '../models/incident.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
    console.log("create:");

    const incident = new Incident(req.body)
    try {
        await incident.save()
        // console.log("create incident");
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
    // console.log("list:");
    try {
        let incidents = await Incident.find().select('name email updated created')
        res.json(incidents)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getAllIncidents = async (req, res) => {
    let strURL = JSON.stringify(req.url);
    // console.log("getAllIncidents:" + strURL);
    try {
        if (req.url.includes("incidents?username")) {
            // console.log("getAllUsers with filter");

            var idx = strURL.indexOf("[");
            var subString = strURL.substring(idx + 1, strURL.length - 2);
            // console.log("subString:" + subString);

            var strQuery = decodeURIComponent(subString);
            // console.log("strQuery:" + strQuery);
            //let products = await Product.find( { "name" : /Product 11/ } ); 
            let products = await Incident.find({ "username": { $regex: strQuery } }).select('username update_datetime hashed_password');

            res.json(products);
        }
        else {
            // console.log("getAllIncidents without filter");
            //let users = await User.find().select('name price category description quantity'); 
            //let users = await User.find(); 
            //let users = await Incident.find().select('incidenttype description update_datetime status') 
            let users = await Incident.find()
            // console.log(users);
            res.json(users);
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


const incidentByID = async (req, res, next, id) => {
    try {
        console.log("incidentByID:" + id);
        let incident = await Incident.findById(id)

        if (!incident)
            return res.status(400).json({
                error: "Incident not found"
            })
        req.profile = incident
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve incident."
        })
    }
}

const read = (req, res) => {
    console.log("read incident")
    //req.profile.hashed_password = undefined 
    //req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    console.log("update incident")
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
    console.log("remove incident");
    try {
        let incident = req.profile
        let deletedIncident = await incident.deleteOne()
        //deletedIncident.hashed_password = undefined 
        //deletedIncident.salt = undefined
        res.json(deletedIncident)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, incidentByID, read, list, remove, update, getAllIncidents }
