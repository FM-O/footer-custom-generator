const express = require('express');

const router = new express.Router();

router.get('/getJsonFile', (req, res) => {
    res.download('./server/files_output/custom-footer.json');
});

router.get('/list/regions', (req, res) => {
    res.status(200).end();
});

module.exports = router;
