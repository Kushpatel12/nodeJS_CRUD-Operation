const express = require('express');
const router = express.Router();

const menuItems = require('./../models/menuItems');

router.post('/', async (req,res) => {
  try {
    const data = req.body;
    const newMenuItems = new menuItems(data);
    const response = await newMenuItems.save();
    res.status(200).json(response);
    console.log("data saved");
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

router.get('/', async(req,res) => {
  try {
    const data = await menuItems.find();
    res.status(200).json(data);
    console.log("data fetch");
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
})

router.get('/:foodName', async (req,res) => {
  try {
    const foodName = req.params.foodName;
    if(foodName == 'pizza' || foodName == 'sandwich', foodName == 'dosa'){
      const data = await menuItems.find({name: foodName});
      res.status(200).json(data);
      console.log("data fetched");
    } 
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'}); 
  }
})

module.exports = router;