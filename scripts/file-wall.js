let fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
    console.log(req.url);
    let router = req.url.split('/');
    let file = router[router.length - 1];
    let ext = file.split('.')[1];
    let dir = router[router.length - 2];
    if(ext === "pw"){
        //deny access to .pw files
        res.status(403).send('Forbidden');
        return;
    }
    
    //try to get .pw file from the same directory
    let checked_path = [];
    let deny_access = false;
    console.log(router);
    for(let i = 0; i < router.length; i++){
        if(checked_path.length != router.length - 1){
            console.log(router[i]);
            checked_path.push(router[i]);
            let pw_file = path.join(__dirname + "/.." + checked_path.join('/') + '/.pw');
            console.log(pw_file);
            let pw_ignore_file = path.join(__dirname + "/.." + checked_path.join('/') + '/.pw.ignore');
            if(await fs.existsSync(pw_file)){
                //check password
                let pw = fs.readFileSync(pw_file, 'utf8');
                if(pw == req.query.pw){
                    //password is correct
                    console.log("correct password");
                    deny_access = false;
                }else if(await fs.existsSync(pw_ignore_file)){
                    //ignore password
                    console.log("ignoring password");
                    deny_access = false;
                }else{
                    //password is incorrect
                    console.log("incorrect password");
                    deny_access = true;
                }
            }
        }else{
            if(file === "folder" && deny_access == false){
                console.log("folder request");
                let files = fs.readdirSync(path.join(__dirname + "/../files" + checked_path.join('/')));
                let file_list = [];
                for(let i = 0; i < files.length; i++){
                    if(files[i].split('.')[1] != "pw" && files[i].split('.')[1] != "pw.ignore"){
                        file_list.push(files[i]);
                    }
                }
                res.send(file_list);
                return;
            }
            console.log(router[i]);
            let pw_file = path.join(__dirname + "/../files" + checked_path.join('/') + "/" + file.split(".")[0] + '.pw');
            console.log(pw_file);

            if(await fs.existsSync(pw_file)){
                console.log("found pw file");
                //check password
                let pw = fs.readFileSync(pw_file, 'utf8');
                if(pw == req.query.pw){
                    //password is correct
                    next();
                    return;
                }else{
                    //password is incorrect
                    res.status(403).send('Forbidden');
                    return;
                }
            }
            console.log("no pw file");
            break;
        }
        
    }
    if(deny_access){
        res.status(403).send('Forbidden');
        return;
    }
    next();
  };
  