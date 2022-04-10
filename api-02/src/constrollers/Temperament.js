const { resultDataApi } = require("./Dogs");

const { Temperament } = require("../db.js");

const addTemperaments = async (req, res) => {
  /*  resultDataApi().then(respt => {
       
       let tempList = respt.map((e) => e.temperament).join().split(", ").join().split(",");
       const list = new Set(tempList);
       
       for(let e of list){
          Temperament.create({ name: e });
       }
   
       const getTemp = await Temperament.findAll();
       //res.status(200).json(getTemp)
       return getTemp
     }).catch(erroro => console.log(erroro))
    */
  try {
    const resultSTemperaments = await resultDataApi();

    let tempList = await resultSTemperaments.map((n) => n.temperament) 
    .join().split(", ").join().split(",");

    let allList = new Set(tempList);

    for (let e of allList) {
      await Temperament.create({ name: e });
    }

    res.status(200).json("Added temperaments!!")
  } catch (error) {
    console.log(error);
  }
};

const getTemperaments = async (req, res) => {
  try {
    const allTemperaments = await Temperament.findAll();
    
    res.status(200).json(allTemperaments);

  } catch (err) {
    console.log(err);
  }
};

module.exports = { addTemperaments, getTemperaments };
