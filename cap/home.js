var express = require('express')
var app = express();

var mongojs = require('mongojs')
var Cstring ='mongodb+srv://Deepika:Deepika@cluster0.f7rai.mongodb.net/vedic?retryWrites=true&w=majority'
var db = mongojs(Cstring, ['donors'])

app.use(express.static('public'))
app.set('view engine','ejs')

app.get('/home',function(req,res){
	res.sendFile(__dirname+"/public/index.html")
})

app.get('/signupsubmit',function(req,res){
	var d={
		firstName:req.query.fname,
		email:req.query.email,
		password:req.query.pswd,
		mobile:req.query.mob,
		DOB:req.query.dob,
		genders:req.query.gender,
		Age:req.query.age,
		Bgrp:req.query.bgrp,
	}
	db.donors.insert(d,function(err,docs){
		if(err)
		res.send("Something went wrong .Please try again!!")
	else
		res.sendFile(__dirname+"/public/login.html")
	})
})

app.get('/loginsubmit',function(req,res){
	var d={
		email:req.query.email,
		password:req.query.pswd,
	}
	db.donors.find(d,function(err,docs){
		if(err)
			res.send("Something went wrong!!")
		
		else
			res.sendFile(__dirname+"/public/search.html")
	})
})
app.get('/searchsubmit',function(req,res){
	var d={
		Bgrp:req.query.bgrp,
	}
	db.donors.find(d,function(err,docs){
		if(err)
		res.send("Something went wrong .Please try again!!")
	if(docs.length>0){
			db.donors.find(d,function(err,docs){
				if(err)
					res.send("Something went wrong!!")
				else
					res.render("dashboard",{data : docs})
				
			})
			
		}
	else
		res.send("No Match found!!!")
	})
})



app.listen(3000)