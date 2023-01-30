let fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
    //check if the request comes from the same origin
    let origin = req.headers.origin;
    console.log(origin);
    if (!origin) {
        return res.status(401).send({ error: "Unauthorized origin" });
        }
        
    let filePath = './whitelist.txt';

    console.log(filePath);
    console.log(origin)
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        console.log(data);
        if (err) return next(err);
        console.log(data);
        let whitelist = data.split('\n');
        if (!whitelist.includes(origin)) {
            return res.status(401).send({ error: "Unauthorized origin" });
        }
            
        next();
    });
};
