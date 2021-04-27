const User = require('../database/models/user.model');

exports.createUser = ({ username, email, password }) => {
  const passwordHashed = User.hashPassword(password);
  const newUser = new User({ username, email, password: passwordHashed });
  return newUser.save();
}

exports.findAllUsers = () => {
  return User.find().exec();
}

exports.findUserById = (id) => {
  return User.findById(id).exec();
}

exports.findUserByUsername = (username) => {
  return User.findOne({ username }).exec();
}

exports.findUserToConnect = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (user) { // Vérification du mot de passe
      delete user.password;
      return user;
    }

    throw new Error("user not found");
  }
  catch (e) { throw e }
}

exports.addFollow = async (idForFollow, idCurrentUser) => {
  const currentUser = await this.findUserById(idCurrentUser);

  if (currentUser.follows.includes(idForFollow)){
    throw new Error("You already follow this user")
  }

  currentUser.follows.push(idForFollow);
  User.updateOne(currentUser, () => console.log("follow add with success!"));
}

exports.removeFollow = async (idForUnfollow, idCurrentUser) => {
  const currentUser = await this.findUserById(idCurrentUser);

  if (!currentUser.follows.includes(idForUnfollow)){
    throw new Error("You don't follow this user")
  }

  const i = currentUser.follows.indexOf(idForUnfollow);
  currentUser.follows.splice(i, 1);
  User.updateOne(currentUser, () => console.log("follow remove with success!"));
}