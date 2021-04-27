const { createToken } = require('../services/jwt.service');
const { resolve } = require('path');
const multer = require('multer');
const {
  createUser,
  findAllUsers,
  findUserByUsername,
  findUserToConnect,
  findUserById,
  addFollow,
  removeFollow,
} = require('../queries/users.queries');

exports.getUsersList = async (req, res, next) => {
  try {
    const users = await findAllUsers();
    res.render('pages/signin-signup-page', { users });
  }
  catch (e) {
    console.log(e.message);
    next(e);
  } 
}

exports.getUserProfile = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await findUserByUsername(username);
    const touites = await findTouitesByUser(user._id);
    res.render('pages/include/user-profile', { user, touites });
  }
  catch (e) {
    console.log(e.message);
    res.redirect("/");
  }
}

exports.signupForm = (req, res) => {
  res.render('pages/signin-signup-page', { signup: true });
}

exports.signinForm = (req, res) => {
  res.render('pages/signin-signup-page', { signup: false });
}

exports.signup = async (req, res) => {
  const { body } = req;
  try {
    await createUser(body);
    res.redirect('/users/signin');
  }
  catch (e) {
    console.log(e.message);
    res.render('pages/signin-signup-page', {
      signup: true,
      errors: [ e.message ],
    });
  }
}

exports.signin = async (req, res) => {
  const { body } = req;
  try {
    const user = await findUserToConnect(body);
    const token = createToken(user);
    res.cookie('jwt', token, {
      maxAge: 1000*60*60*24*30
    });
    res.redirect('/touites');
  }
  catch (e) {
    console.log(e.message);
    res.render('pages/signin-signup-page', {
      signup: false,
      errors: [ e.message ],
    });
  }
}

exports.signout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
}

const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve('public', 'img', 'avatars'));
    },
    filename: (req, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`;
      callback(null, filename);
    }
  })
});

exports.updateUserImage = [
  uploadImage.single('inputAvatar'),
  async (req, res, next) => {
    try {
      const user = await findUserById(req.user.sub);
      user.avatar = `/static/img/avatars/${req.file.filename}`;
      await user.save();
      res.redirect('/');
    }
    catch (e) { 
      console.log(e.message);
      next(e)
    }
  }
]


exports.followUser = async (req, res) => {
  const { userId } = req.params;
  const { sub, follows } = req.user;
  try {
    if (userId === sub) {
      throw new Error("You can't follow yourself")
    }

    follows.push(userId);
    await addFollow(userId, sub);
    res.redirect("/touites")
  }
  catch (e) {
    console.log(e.message);
    res.redirect("/touites")
  }
}

exports.unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const { sub, follows } = req.user;
  try {
    if (!follows.includes(userId)) {
      throw new Error("You don't follow this user")
    }

    const i = follows.indexOf(userId);
    follows.splice(i, 1);
    await removeFollow(userId, sub);
    res.redirect("/touites")
  }
  catch (e) {
    console.log(e.message);
    res.redirect("/touites")
  }
}