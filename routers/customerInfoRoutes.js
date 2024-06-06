const express = require('express');
const router = express.Router();

const customerInfo = require('./../models/customerInfo');

router.post('/', async(req,res) => {
  try {
    const data = req.body;
    const newCustomer = new customerInfo(data);
    const response = await newCustomer.save();
  
    res.status(200).json(response);
    console.log("data saved");
    
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

router.get('/', async(req,res) => {
  try {
    const data = await customerInfo.find();
    res.status(200).json(data);
    console.log("data fetch");
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
})

router.get('/:good', async(req,res) => {
  try {
    const good = req.params.good;
    if(good == 'true' || good == 'false'){
      const data = await customerInfo.find({good: good});
      res.status(200).json(data);
      console.log("data found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

router.put('/:id', async(req,res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await customerInfo.findByIdAndUpdate(personId,updatedPersonData,{
      new: true,
      runValidators: true
    });

    if(!response){
      res.status(404).json({message: 'person not found'});
    }

    console.log("updated data");
    res.status(200).json({message: 'successfully updated data'});

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'}); 
  }
});

router.delete('/:id', async (req,res) => {
  try {
    const data = req.params.id;

    const response = await customerInfo.findByIdAndDelete(data);

    if(!response){
      return res.status(404).json({error: 'person not found'});
    }

    console.log("data deleted");
    res.status(200).json({message: 'data deleted successfully'});

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'}); 
  }
})

module.exports = router;