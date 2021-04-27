const router = require('express').Router();

router.get('/', (req, res) => res.render('pages/home'));
router.get('/*', (req, res) => {
    res.render('pages/404', {
        protocol: req.protocol,
        host: req.headers.host,
        url: req.originalUrl
    })
});

module.exports = router;
