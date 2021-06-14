var mysql = require('mysql');
var express = require('express')
var session = require('express-session')
var bodyParser = require('express');
var path =require('path')
var app = express();
var router = express.Router();
const Swal = require('sweetalert2')
// var db=require('../database');
var JSAlert = require("js-alert");
app.use(express.static('public'))
app.set('view engine','ejs')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : "user"
});
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// mysqlConnection.connect((err)=>{
// 	if(!err)
// 		console.log("db connection succeeded");
// 	else
// 		console.log("DB connection failed \n Error :"+JSON.stringify(err));
// });
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.get('/index', function (req, res) {
  res.sendFile(__dirname+"/public/index.html")
})
app.post('/loginsubmit', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM registerdetails WHERE emailid = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('strategies.html');
            } else {
                response.send('Incorrect Username and/or Password!');
                //JSAlert.alert("Incorrect Username and/or Password!")
            }            
            response.end();
        });
    } else {
    	popup.alert({
    	content: 'Hello!'
	});
       response.send('Please enter Username and Password!');
        response.end();
    }
});
app.post('/signupsubmit',function(req,res){
  // const password = req.body.password;
  // const encryptedPassword = await bcrypt.hash(password, saltRounds)
  var today=new Date();
  var users={
  	name:req.body.name,
     emailId:req.body.emailId,
     password:req.body.password,
     mobile:req.body.mobile,
     gender:req.body.gender,
     age:req.body.age,
     rdate:today
   }
  var sql='SELECT * FROM registerdetails WHERE emailId =?';
  connection.query(sql, [users.emailId] ,function (err, data, fields) {
 if(err) throw err
 if(data.length>1){
     var msg = users.emailId+ "was already exist";
     
 // }else if(inputData.confirm_password != inputData.password){
 //    var msg ="Password & Confirm Password is not Matched";
 }else{
     
    // save users data into database
    var sql = 'INSERT INTO registerdetails SET ?';
   connection.query(sql, users, function (err, data) {
      if (err) throw err;
           });
  var msg ="Your are successfully registered";
  res.sendFile(__dirname+"/public/userlogin.html")
 }
 
})
     
});
app.post('/psyloginsubmit', function(request, response) {
    var username = request.body.emailId;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM psychiatrist WHERE emailid = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('consultations.html');
            } else {
            	Swal.fire("hello");
                //response.send('Incorrect Username and/or Password!');
                // JSAlert.alert("Incorrect Username and/or Password!")
            }            
            response.end();
        });
    } else {
 //    	popup.alert({
 //    	content: 'Hello!'
	// });
       response.send('Please enter Username and Password!');
        response.end();
    }
});
  // connection.query('INSERT INTO registerdetails SET ?',users, function (error, results, fields) {
  //   if (error) {
  //     res.send({
  //       "code":400,
  //       "failed":"error ocurred"
  //     })
  //   } else {
  //     res.send({
  //       "code":200,
  //       "success":"user registered sucessfully"
  //         });
  //     }
  // });

// app.get('/userloginsubmit',function(req,res){
// 	var d={
// 		email:req.query.email,
// 		pswd:req.query.pswd,
// 	}
// 	db.donors.find(d,function(err,docs){
// 		if(err)
// 			res.send("Something went wrong!!")
		
// 		else
// 			res.sendFile(__dirname+"/public/strategies.html")
// 	})
// })
// app.get('/userloginsubmit',function(req,res){
// 	var d={
// 		email:req.query.email,
// 		password:req.query.pswd,
// 	}
// 	db.users.find(d,function(err,docs){
// 		if(err)
// 			res.send("Something went wrong!!")
		
// 		else
// 			res.sendFile(__dirname+"/public/strategies.html")
// 	})
// })
// app.get('/strategies.html', function(request, response) {
//     if (request.session.loggedin) {
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });
// var router = express.Router();
// /* GET users listing. */
// router.get('/logout', function(req, res) {
//   req.session.destroy();
//   res.redirect('/login');
// });
// module.exports = router;
app.listen(3000,function(){
	console.log("hey");
})
app.get('/users',(res,req)=>{
	mysqlConnection.query('select * from LoginDetails',(err,rows,fields)=>{
		if(!err)
			console.log(rows);
		else
			console.log(err);
	});
});