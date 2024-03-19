import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => { 
    const user = new User(req.body) 
    try {
        await user.save()
        console.log("create user");
        return res.status(200).json({ 
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const list = async (req, res) => { 
    try {
        // let users = await User.find().select('name email updated created') 
        let users = await User.find().select('username update_datetime hashed_password') 
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const getAllUsers = async (req, res) => { 
    let strURL = JSON.stringify(req.url);
    console.log("getAllUsers:" + strURL);
    try {
        if (req.url.includes("users?username")) {
            console.log("getAllUsers with filter");

            var idx = strURL.indexOf("[");
            var subString = strURL.substring(idx+1, strURL.length-2);
            console.log("subString:" + subString);
            
            var strQuery = decodeURIComponent(subString);
            console.log("strQuery:" + strQuery);
            //let products = await Product.find( { "name" : /Product 11/ } ); 
            let products = await User.find( { "username" : { $regex: strQuery } } ).select('username update_datetime hashed_password'); 

            res.json(products);
        }
        else {
            console.log("getAllUsers without filter");
            //let users = await User.find().select('name price category description quantity'); 
            //let users = await User.find().select('username update_datetime hashed_password') 
            let users = await User.find(); 
            console.log(users);
            res.json(users);
        }
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}


const userByID = async (req, res, next, id) => { 
    try {
        console.log("userByID:" + id);
        let user = await User.findById(id) 
        if (!user)
            return res.status(400).json({ 
                error: "User not found"
            })
        req.profile = user 
        next()
    } catch (err) {
        return res.status('400').json({ 
            error: "Could not retrieve user"
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
    let user = req.profile
    user = extend(user, req.body) 
    user.updated = Date.now() 
    await user.save()
    user.hashed_password = undefined 
    user.salt = undefined
    res.json(user) 
} catch (err) {
    return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
    })
} 
}

const remove = async (req, res) => { 
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne() 
        deletedUser.hashed_password = undefined 
        deletedUser.salt = undefined
        res.json(deletedUser) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

export default { create, userByID, read, list, remove, update, getAllUsers }
