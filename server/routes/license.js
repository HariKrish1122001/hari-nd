const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');
router.post('/', licenseController.createLicense);
router.get('/', licenseController.getLicense);
router.put('/one/:id', licenseController.updateLicense); 
router.delete('/one/:id', licenseController.removeGUID); 
router.delete('/two/:id', licenseController.deleteLicense); 
module.exports = router;