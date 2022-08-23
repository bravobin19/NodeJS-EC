const express = require('express');
var app = express();
var bodyParser = require('body-parser')
const AccountModel = require('./models/account');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register',(req,res,next)=>{
    
    var username = req.body.username
    var password = req.body.password

    console.log(username, password);


    AccountModel.findOne({
        username: username
    })
    .then(data=>{
        if(data){
            res.json('rename user ')
        } else {
            AccountModel.create({

                username:username,
                password:password
            })

        }
    })
    .then(data=>{
        res.json('Success')
    })
    .catch(err=>{
        res.status(500).json('fail')
    })
})

app.post('/login' ,(req,res,next)=>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then (data=>{
        if(data){
            res.json('Login Success')
        } else{
            res.status(300).json('re write account')
        }

    })
    .catch(err=>{
        res.status(500).json('fail')
    })
})

var AccountRouter = require('./routers/account')
app.use('/api/account', AccountRouter  )

app.get('/', (req,res,next)=>{
    res.json('home')
})

app.listen(3000,()=>{
    console.log(`server started on port`)
});