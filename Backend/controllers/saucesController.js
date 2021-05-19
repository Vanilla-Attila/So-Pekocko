const Sauce = require('../Models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const data = JSON.parse(req.body.sauce)  //string format => converted to json
  // Getting the host and using for images
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    userId: data.userId,
    name: data.name,
    manufacturer: data.manufacturer,
    description: data.description,
    mainPepper: data.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: data.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
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
        message: error
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

exports.modifySauce = async (req, res, next) => {

  // using mongose to select the sause then get the image URL out in a  variable then use this variable with the update function 
  let sauce = new Sauce ({ _id: req.params._id })
  if (req.file) {
    const data = JSON.parse(req.body.sauce)  //string format => converted to json
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
    dislikes: data.dislikes,
    usersLiked: data.usersLiked,
    usersDisliked: data.usersDisliked
  };
  } else {
   
   let ss = await Sauce.findOne({_id : req.params.id}).then(sauce => sauce)
   
  sauce = {
    _id: req.params.id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: ss.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.deslikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.userDisliked
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

exports.likeSauce = async (req, res, next) => {
  try {
    const foundSauce = await Sauce.findOne({ _id: req.params.id }) ;
    const userId = req.body.userId;
    const like = req.body.like;
  if (like === 1){
      if(!foundSauce.usersLiked.includes(userId)){
        foundSauce.usersLiked.push(userId)
      }
  }else{
    if (foundSauce.usersLiked.includes(userId)){
      const userindex = foundSauce.usersLiked.indexOf(userId)
      foundSauce.usersLiked.splice(userindex)
    }
  foundSauce.likes = foundSauce.usersLiked.length
  }if(like === -1){
  if(!foundSauce.usersDisliked.includes(userId)){
        foundSauce.usersDisliked.push(userId)
      }
  }else{
  if (foundSauce.usersDisliked.includes(userId)){
      const userindex = foundSauce.usersDisliked.indexOf(userId)
      foundSauce.usersDisliked.splice(userindex)
    }
  }
  foundSauce.dislikes = foundSauce.usersDisliked.length

foundSauce.save()
res.status(200).json({
  message : 'user liked or dislikes successfully'
})
 } catch (error) {
    console.log(error)
  res.status(400).json({
    error
  })
  }

};

