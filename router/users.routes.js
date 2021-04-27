const router = require('express').Router();
const { checkAuth } = require('../middlewares/check-auth.middleware');
const {
  getUsersList,
  getUserProfile,
  followUser,
  unfollowUser,
  updateUserImage,
  signupForm,
  signinForm,
  signup,
  signin,
  signout,
} = require('../controllers/users.controllers');

router.get('/signup', signupForm);
router.get('/signin', signinForm);
router.get('/signout', signout);
router.post('/signup', signup);
router.post('/signin', signin);

router.get('/', checkAuth, getUsersList);
router.get('/:username', checkAuth, getUserProfile);
router.get('/follow/:userId', checkAuth, followUser);
router.get('/unfollow/:userId', checkAuth, unfollowUser);

router.post('/update/image', checkAuth, updateUserImage);

module.exports = router;
