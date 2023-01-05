const express = require('express')
const recordController = require('../Controllers/recordController')
const { createRecord } = recordController

const router = express.Router()

router.post('/', createRecord)

module.exports = router