const express = require('express')
const recordController = require('../Controllers/recordController')
const { createRecord, endRecord, getRecords } = recordController

const router = express.Router()

router.post('/', createRecord)
router.post('/end', endRecord)
router.get('/', getRecords)

module.exports = router