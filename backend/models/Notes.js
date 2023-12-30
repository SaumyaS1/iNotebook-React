const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Assuming you have a User model
        required: true,
      },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: true  
        //  email is unique
    },
    tag:{
        type: String,
        default: 'General'
    },
    date:{
        type: Date,
        default: Date.now
    }


  });
//   module.exports = mongoose.model('notes', NotesSchema);
  const Notes = mongoose.model('notes', NotesSchema);
  module.exports = Notes;