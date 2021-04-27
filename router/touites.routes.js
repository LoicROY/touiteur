const router = require('express').Router();
const {
  getTouitesPage,
  getNewTouitePage,
  createTouite,
  getEditTouitePage,
  editTouite,
  deleteTouite
} = require('../controllers/touites.controllers');

router.get('/', getTouitesPage);
router.get('/new', getNewTouitePage);
router.post('/new', createTouite);

router.get('/edit/:touiteId', getEditTouitePage);
router.post('/edit/:touiteId', editTouite);

router.get('/:touiteId', deleteTouite); //Methode DELETE non supporté par tous les navigateurs d'après cette source : https://qastack.fr/programming/165779/are-the-put-delete-head-etc-methods-available-in-most-web-browsers

module.exports = router;
