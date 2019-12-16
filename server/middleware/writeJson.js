const fs = require('fs');
/**
*  The Auth Checker middleware function.
*/
module.exports = (req, res, next) => {
    if (!req.body.jsonData) {
        return res.status(401).end();
    }

    const jsonData = req.body.jsonData;

    // decode the token using a secret key-phrase
    return fs.writeFile('server/files_output/custom-footer.json', jsonData, 'utf-8', () => {
        return res.send('api/getJsonFile');
    });
};
