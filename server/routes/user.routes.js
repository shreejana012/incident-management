import express from 'express'
import userCtrl from '../controllers/user.controller.js' 
import incidentCtrl from '../controllers/incident.controller.js'
import authCtrl from '../controllers/auth.controller.js' 
const router = express.Router()

router.route('/api/users').post(userCtrl.create)
//router.route('/api/users').get(userCtrl.list)
router.route('/api/users').get(userCtrl.getAllUsers)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read)
router.route('/api/users/:userId').put(authCtrl.requireSignin, userCtrl.update)
router.route('/api/users/:userId').delete(authCtrl.requireSignin, userCtrl.remove)

//router.route('/api/incidents').post(authCtrl.requireSignin, incidentCtrl.create)
//router.route('/api/incidents').get(authCtrl.requireSignin, incidentCtrl.getAllIncidents)
//router.param('incidentId', authCtrl.requireSignin, incidentCtrl.incidentByID)
//router.route('/api/incidents/:incidentId').get(authCtrl.requireSignin, incidentCtrl.read)
//router.route('/api/incidents/:incidentId').put(authCtrl.requireSignin, incidentCtrl.update)
//router.route('/api/incidents/:incidentId').delete(authCtrl.requireSignin, incidentCtrl.remove)
router.route('/api/incidents').post(incidentCtrl.create)
router.route('/api/incidents').get(incidentCtrl.getAllIncidents)
router.param('incidentId', incidentCtrl.incidentByID)
router.route('/api/incidents/:incidentId').get(incidentCtrl.read)
router.route('/api/incidents/:incidentId').put(incidentCtrl.update)
router.route('/api/incidents/:incidentId').delete(incidentCtrl.remove)

router.route('/auth/signin').post(authCtrl.signin)
//router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)
router.route('/auth/signout').get(authCtrl.signout)

export default router
