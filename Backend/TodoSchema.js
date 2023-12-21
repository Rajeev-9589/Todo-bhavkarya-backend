const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    Title: {
        required :true,
        type :String
    },
    Note:{
        required:true,
        type: String
    }
})

const Todoschema = mongoose.model('Bhav.Karya',todoSchema);
module.exports =Todoschema; 