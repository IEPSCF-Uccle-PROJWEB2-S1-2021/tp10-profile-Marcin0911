const express = require('express');
const { body, validationResult } = require('express-validator');
const createError = require('http-errors');

const router = new express.Router();

router.post('/formulaire',
  [
  body('Prenom').trim().isLength({min : 3}).escape(),
  body('Nom').trim().isLength({min : 3}).escape(),
  body('Email').trim().isEmail().normalizeEmail(),
  body('Rue').trim(),
  body('Numero').trim().isNumeric(),
  body('codePostal').trim().isNumeric().isLength({max : 4}),
  body('Commune').trim().isLength({min : 3}).escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
    console.log(errors);
    next(createError(400));
    }
    else{
      req.session.Prenom = req.body.Prenom;
      req.session.Nom = req.body.Nom;
      req.session.Email = req.body.Email;
      req.session.Rue = req.body.Rue;
      req.session.Numero = req.body.Numero;
      req.session.codePostal = req.body.codePostal;
      req.session.Commune = req.body.Commune;
      res.render('login', {title : req.session.Prenom , Prenom : req.session.Prenom, Nom : req.session.Nom, codePostal : req.session.codePostal});
    }
  }
);

router.post('/goodbye', (req, res, next) => {
  req.session.destroy();
  res.render('index', {title : "Utilisateur Anonyme"})
})

module.exports = router;
