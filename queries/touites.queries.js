const Touite = require('../database/models/touite.model');

exports.createNewTouite = (reqBody, { sub }) => {
  const newTouite = new Touite({ ...reqBody, author: sub });
  return newTouite.save();
}

exports.getTouiteById = (id) => {
  return Touite.findById(id).exec();
}

exports.findTouitesByUser = (userId) => {
  return Touite.find({author: userId}).exec();
}

exports.editTouiteById = (id, content) => {
  Touite.updateOne({_id: id}, {content: content}, () => console.log("touite update with success!"));
}

exports.deleteTouiteById = (id) => {
  Touite.deleteOne({_id: id}, () => console.log("touite remove with success!"));
}