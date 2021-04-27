const { Schema, model } = require('mongoose');

const touiteSchema = Schema({
  content: {
    type: String,
    minLength: [ 1, "Touite trop court !" ],
    maxLength: [ 140, "Touite trop long !" ],
    required: [ true, "Champ requis" ],
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  }
})

const Touite = model('touite', touiteSchema);
module.exports = Touite;
