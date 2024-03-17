import express from 'express'
import incidentCtrl from '../controllers/incident.controller.js' 
const router = express.Router()
router.route('/api/incidents').post(incidentCtrl.create)
router.route('/api/incidents').get(incidentCtrl.list)
router.param('incidentId', incidentCtrl.incidentByID)
router.route('/api/incidents/:incidentId').get(incidentCtrl.read)
router.route('/api/incidents/:incidentId').put(incidentCtrl.update)
router.route('/api/incidents/:incidentId').delete(incidentCtrl.remove)
export default router
