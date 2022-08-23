const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/my_database',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    username: String,
    password: String,

  
},{
    collection: 'account'
});

const AccountModel = mongoose.model('account', AccountSchema)
module.exports = AccountModel