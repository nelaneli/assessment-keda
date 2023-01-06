const express = require('express')
const recordController = require('../Controllers/recordController')
const { createRecord, endRecord } = recordController

const router = express.Router()

router.post('/', createRecord)
router.post('/end', endRecord)

module.exports = router