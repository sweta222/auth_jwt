var express = require('express');
 var app = express();
 var mysql = require('mysql');
 const cors = require('cors');
 var bodyParser = require('body-parser');
 const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use(cors());
 // default route
 app.get('/', function (req, res) {
     return res.send({ error: true, message: 'hello' })
 });
 // set port
 app.listen(3000, function () {
     console.log('Node app is running on port 3000');
 });

 // connection configurations
 var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_js_api'
});
// connect to database
dbConn.connect(); 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json(results);
    });
});
// Retrieve user with id 
app.get('/read-user/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    if (!user_id) {
        return res.status(400).send({message: 'Please provide user_id' });
    }
 else{
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results[0], message: 'users list.' });
    });
}
});
// Add a new user  
app.post('/add-user', function (req, res) {
 
    //let user = req.body.user;
    let {name,email} = req.body;
 //console.log(req.body);
    if (!req.body) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
 else{
    dbConn.query("INSERT INTO users SET ? ", { name: name,email:email }, function (error, results) {
        if (error) throw error;
        return res.send({data: results, message: 'New user has been created successfully.' });
    });
}
});
//  Update user with id
app.put('/update-user/:id', function (req, res) {
 let id = Number(req.params.id);
 let {name,email} = req.body;
 //console.log(id);
 console.log(req.body)
    if (!req.body) {
        return res.status(400).send({ message: 'Please provide user and user_id' });
    }
 else{
    //console.log(`UPDATE users SET name=${name} email=${email} WHERE id = ${id}`);
    dbConn.query("UPDATE users SET name=?, email=? WHERE id = ?", [name,email,id],function (error, results) {
        if (error) throw error;
        return res.send({data: results, message: 'user has been updated successfully.' });
    });
}
});
//  Delete user
app.delete('/delete-user/:id', function (req, res) {
 
    let id = req.params.id;
 
    if (!id) {
        return res.status(400).send({message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [id], function (error, results) {
        if (error) throw error;
        return res.send({data: results, message: 'User has been updated successfully.' });
    });
}); 

app.post('/login',(req,res) => {
    // let {name,email} = req.body;
    // dbConn.query('SELECT * FROM users WHERE name = ? AND email = ?',[name,email],(error,results) => {
    //     if(results.length > 0){
    //         //console.log(results)
    //         const createJWT = (name,email,duration) => {
    //             const payload = {
    //                 name,email,duration
    //             };
    //             return jwt.sign(payload,"auth",{
    //                 expiresIn:duration
    //             });
    //         }
    //         var access_token = createJWT(name,email,59);
    //         //console.log(access_token);
    //         jwt.verify(access_token,"auth",(err,decoded) => {
    //             if (err) {
    //                 return res.status(500);
    //               }
    //               if (decoded) {
    //                 return res.status(200).json({
    //                   msg: "successfully logged in",
    //                   token: access_token,
    //                   email:email
    //                 });
    //               }
    //         });
    //     }
    //     if(error){
    //         return res.status(500).send(error);
    //     }
    //  });

    let {email,password} = req.body;
    var dbData = [];
    if(req.body !== null || undefined){
        dbConn.query('SELECT * FROM users WHERE email = ?',email,(err,result) => {
            dbData = result;
            let hashedPassword = dbData.map((z) => z.password);
            if(result.length >0){
                bcrypt.compare(password, String(hashedPassword[0]), (errors, results) => {
                    console.log(results);
                    if (!results) {
                        res.status(500).send('incorrect credentials');
                    }
                    else {
                        const createJWT = (email, password, duration) => {
                            const payload = {
                                email, password, duration
                            };
                            return jwt.sign(payload, "auth", {
                                expiresIn: duration
                            });
                        };
                        var access_token = createJWT(email, password, 60);
                        //console.log(access_token);
                        jwt.verify(access_token, "auth", (err, decoded) => {
                            if (err) {
                                return res.status(500);
                            }
                            if (decoded) {
                                return res.status(200).json({
                                    msg: "successfully logged in",
                                    token: access_token,
                                    email: email
                                });
                            }
                        });
                    }
                });
            }
            else{
                res.status(500).json(err);
            }
        });
    }
    else{
        res.status(500).send({msg:"provide email and password"})
    }
});
app.get("/getdashboarddata",(req,res) => {
    let {email} = req.body;
    if(email !== null || undefined){
        res.status(200).json({email:email,msg:"success"});
    }
    else{
        res.status(500).send({msg:"failed"});
    }
});

app.post("/register",(req,res) => {
    let {name,email,password} =  req.body;
    if(req.body !== null || undefined){
        // dbConn.query("INSERT INTO users SET ? ", {email:email ,password:password},(err,result) => {
        //     if(result){
        //         res.status(200).json(result);
        //     }
        //     else{
        //         res.status(500).send(err);
        //     }
        // });
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(password,salt,(err,hash) => {
                if (err) {
                    throw err;
                  }
                  let encryptedPassword = hash;
                  dbConn.query("INSERT INTO users SET ? ", {name:name,email:email ,password:encryptedPassword},(err,result) => {
                    if(result){
                        res.status(200).json(result);
                    }
                    else{
                        res.status(500).send(err);
                    }
                });
            });
        });
    }
    else{
        res.status(500).send({msg:"plz provide correct data"});
    }
});
module.exports = app;