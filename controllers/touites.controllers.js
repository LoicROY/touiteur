const { findUserById } = require('../queries/users.queries');
const {
  createNewTouite,
  getTouiteById,
  editTouiteById,
  deleteTouiteById,
  findTouitesByUser,
 } = require('../queries/touites.queries');

exports.getTouitesPage = async (req, res) => {
  try {
    const user = await findUserById(req.user.sub);
    const touites = await findTouitesByUser(user._id);
    res.render('pages/touites-page', { touites, user });
  }
  catch (e) {
    console.log(e.message);
    res.render('pages/home', {
      errors: [e.message]
    });
   }
};

exports.getNewTouitePage = (req, res) => {
  res.render('pages/new-touite-page');
}

exports.createTouite = async (req, res) => {
  const { body, user } = req;
  try {
    await createNewTouite(body, user);
    res.redirect('/touites/new');
  }
  catch (e) { throw e }
}


exports.getEditTouitePage = async (req, res) => {
  const { touiteId } = req.params;
  try {
    const touite = await getTouiteById(touiteId);
    res.render("pages/edit-touite-page", { touite });
  } 
  catch (e) {
    console.log(e.message);
    res.redirect('/touites')
  }
}

exports.editTouite = async (req, res) => {
  const { content } = req.body;
  const { touiteId } = req.params;
  
  try {
    await editTouiteById(touiteId, content);
    res.redirect(`/touites/edit/${touiteId}`);
  }
  catch (e) {
    console.log(e.message);
    res.render("pages/edit-touite-page", {
      errors: [ e.message ],
      touite: {_id: touiteId, content}
    })
  }
}
exports.deleteTouite = async (req, res) => {
  const { touiteId } = req.params;

  try {
    await deleteTouiteById(touiteId);
    res.redirect("/touites");
  }
  catch (e) {
    console.log(e.message);
    res.redirect("/touites");
  }
}