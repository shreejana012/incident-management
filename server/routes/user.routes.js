import express from 'express'
import userCtrl from '../controllers/user.controller.js' 
// import authCtrl from '../controllers/auth.controller'
import authCtrl from '../controllers/auth.controller.js'
import incidentCtrl from '../controllers/incident.controller.js'

 const router = express.Router()
 router.route('/api/users').post(userCtrl.create)
 router.route('/api/users').get(userCtrl.list)
 router.route('/api/users/:userId')
.get(authCtrl.requireSignin, userCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
router.param('userId', userCtrl.userByID)
 router.route('/api/users/:userId').get(userCtrl.read)
 router.route('/api/users/:userId').put(userCtrl.update)
 router.route('/api/users/:userId').delete(userCtrl.remove)

 router.route('/api/incidents').post(incidentCtrl.create)
 router.route('/api/incidents').get(incidentCtrl.getAllIncidents)
 router.param('incidentId', incidentCtrl.incidentByID)
 router.route('/api/incidents/:incidentId').get(incidentCtrl.read)
 router.route('/api/incidents/:incidentId').put(incidentCtrl.update)
 router.route('/api/incidents/:incidentId').delete(incidentCtrl.remove)

 export default router
