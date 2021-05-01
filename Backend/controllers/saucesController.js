const Sauce = require('../Models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const data = Json.parse(req.body.sauce)  //string format => converted to json
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    userId: data.userId,
    name: data.name,
    manufacturer: data.manufacturer,
    description: data.description,
    mainPepper: data.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: data.heat,
    likes: data.likes,
    deslikes: data.deslikes,
    usersLiked: data.usersLiked,
    userDisliked: data.userDisliked
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce ({ __id: req.params._id })
  if (req.file) {
    const data = Json.parse(req.body.sauce)  //string format => converted to json
    const url = req.protocol + '://' + req.get('host');
  sauce = {
    _id: req.params.id,
    userId: data.userId,
    name: data.name,
    manufacturer: data.manufacturer,
    description: data.description,
    mainPepper: data.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: data.heat,
    likes: data.likes,
    deslikes: data.deslikes,
    usersLiked: data.usersLiked,
    userDisliked: data.userDisliked
  };
  } else {
  sauce = {
    _id: req.params.id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    deslikes: req.body.deslikes,
    usersLiked: req.body.usersLiked,
    userDisliked: req.body.userDisliked
  };
  }
  
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
   Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};