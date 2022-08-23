const { Router } = require('express');
const express = require('express');
var router = express.Router();
const AccountModel = require('../models/account')



//get data for db 
router.get('/',(req ,res, next)=>{
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('error')
    })
})

//add data for db
router.post('/',(req,res,next)=>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.create({
        username: username,
        password: password
    })
    .then(data=>{
        res.json('Add account success')
    })
    .catch(err=>{
        res.status(500).json('Error')
    })
})


//update data in db
router.put('/:id',(req,res,next)=>{
    var id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(id,{
        password: newPassword
    })
    .then(data=>{
        res.json('Update success')
    })
    .catch(err=>{  
        res.status(500).json('error')
    })
})

//delete data in db 
router.delete('/:id',(req,res,next)=>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('Delete success')
    })
    .catch(err=>{
        res.status(500).json('error')
    })
})

module.exports = router