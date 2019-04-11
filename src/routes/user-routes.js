let express = require('express');
let router = express.Router();
let guestModel = require('../models/guest-model');
let logger = require('../lib/logger').logger;

// guestSWU
// 50xReGJGiY5kTBD3

router.get('/character', (req, res) => {
    if (!req.query.name) {
        return res.status(400). send('Missing URL parameter: name');
    }
    logger.info('Connected to database')
    logger.info(req.query.name)
    guestModel.find({
        name: req.query.name
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        logger.error('Dans erreur', err)
        res.status(500).json(err);
    })
})

module.exports = router;