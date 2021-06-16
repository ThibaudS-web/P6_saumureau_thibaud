const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
  console.log("Le POST fonctionne")
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    heat: sauceObject.heat,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // likes: req.body.likes,
    // dislikes: req.body.dislikes,
    // usersLikes: req.body.userLikes,
    // usersDisliked: req.body.usersDisliked,
  })
  sauce.save()
    .then(() => res.status(201).json({ message : "registered object !" }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? 
  { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }
  Sauce.updateOne({_id: req.params.id}, {sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object modified !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () =>{
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({ message: 'Object deleted !'}))
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch( error => res.status(500).json({ error }))
}

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

