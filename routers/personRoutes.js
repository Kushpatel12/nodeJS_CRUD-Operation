const express = require('express');
const router = express.Router();

const person = require('./../models/person');

// send data to database
router.post('/', async (req,res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    res.status(200).json(response);
    console.log("data saved");
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});
 
// get data from database
router.get('/', async (req,res) => {
  try {
    const data = await person.find();
    res.status(200).json(data);
    console.log("data fetch");
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

// get data using parameter from database
router.get('/:workType', async (req,res) => {
  try {
    const workType = req.params.workType;
    if(workType == 'waiter' || workType == 'chef' || workType == 'manager'){
      const data = await person.find({work: workType});
      res.status(200).json(data);
      console.log("data fetch");
    } else{
      res.status(500).json({error: 'data not there'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

// Update data
router.put('/:id', async (req,res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(personId,updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if(!response){
      return res.status(404).json({error: 'person not found'});
    }

    console.log("updated data");
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});

// Delete data
router.delete('/:id', async (req,res) => {
  try {
    const data = req.params.id;

    const response = await person.findByIdAndDelete(data);

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