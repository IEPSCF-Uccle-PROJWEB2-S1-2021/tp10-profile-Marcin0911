const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if(!req.body.Prenom){
    req.body.Prenom = "Utilisateur Anonyme";
    req.body.Nom = "";
    req.body.codePostal = "";
  }
  res.render('index', { title : req.body.Prenom, Prenom : req.session.Prenom, Nom : req.session.Nom, codePostal : req.session.codePostal });
});

router.get('/formulaire', (req, res, next) => {
  res.render('formulaire', { title: 'Formulaire' });
})
module.exports = router;
