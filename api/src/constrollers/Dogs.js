const axios = require("axios");

const { Dog, Temperament, YOUR_API_URL } = require("../db.js");

function weightDogApi(data) {
  let r1 = data;
  let r2 = r1.split("-");
  let r3 =
    r2[0] === ""
      ? parseInt(r2[1], 10)
      : r2[1] === ""
      ? parseInt(r2[0], 10)
      : isNaN(r2[0])
      ? parseInt(r2[1], 10)
      : isNaN(r2[1])
      ? parseInt(r2[0], 10)
      : (parseInt(r2[0], 10) + parseInt(r2[1], 10)) / 2;

  return r3;
}

function weightDogDb(data) {
  let r1 = data;
  let r2 = r1.split("-");
  let r3 = (parseInt(r2[0], 10) + parseInt(r2[1], 10)) / 2;
  return r3;
}

const resultDataApi = async () => {
/*   axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${YOUR_API_URL}`
  ).then(resp =>{
    let result = resp.data.map(e =>{
      return {
        id: e.id,
        name: e.name,
        height: e.height,
        weight: e.weight,
        yearsOfLife: e.life_span,
        temperament: e.temperament,
      }
    })
    return result;
  })
   */

   try {
    const resultApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${YOUR_API_URL}`
    );

    const allDataApi = resultApi.data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.imperial,
        weight: weightDogApi(e.weight.metric),
        yearsOfLife: e.life_span,
        temperament: e.temperament,
        image: e.image.url,
      };
    });

    return allDataApi;
  } catch (error) {
    console.log(error);
  } 
};

const resultDataDb = async () => {
  try {
    const resultDb = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        }
      }
    })

    return resultDb;
  } catch (error) {
    console.log(error);
  }  
};

const concatDataApiDb = async () => {
  try {
    const dataApi = await resultDataApi();
    const dataDb = await resultDataDb();
    const allData = dataApi.concat(dataDb);

    return allData;
  } catch (error) {
    console.log(error);
  } 
};

const getDogsApiDb = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let result = await concatDataApiDb();
      let allData = result.filter(
        (e) =>
          e.name.toLowerCase().replace(/ /g, "") ===
          name.toLowerCase().replace(/ /g, "")
      );

      allData.length !== 0
        ? res.status(200).json(allData)
        : res.status(404).send("Name not found");
    } else {
      let results = await concatDataApiDb();
      res.status(200).json(results);
    }
  } catch (error) {
    console.log(error);
  }
};

const getApiDbId = async (req, res) => {
  try {
    let { id } = req.params;
    let resultInfo = await concatDataApiDb();

    let resultFiltered = resultInfo.filter((e) => e.id == id);
    resultFiltered
      ? res.status(200).json(resultFiltered)
      : res.status(404).json("Dog not found");
  } catch (err) {
    console.log(err);
  }
};

const createDog = async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      yearOfLifeMin,
      yearOfLifeMax,
      temperament,
    } = req.body;

    const nameNormalize = name.charAt(0).toUpperCase() + name.slice(1);
    const height = `${heightMin} - ${heightMax} cm`;

    const weight = `${weightMin} - ${weightMax}`;
    const weightProm = weightDogDb(weight);

    const yearsOfLife = `${yearOfLifeMin} - ${yearOfLifeMax} años`;

    const create = await Dog.create({
      name: nameNormalize,
      height: height,
      weight: weightProm,
      yearsOfLife: yearsOfLife,
      temperament: temperament.toString(),
    });

    temperament.forEach(async (element) => {
      let addTemperamentsToDog = await Temperament.findOne({
        where: {
          name: element,
        },
      });

      await addTemperamentsToDog.addDog(create);
    });

    res.status(200).json("Dog created!!");
  } catch (err) {
    console.log(err);
  }
};

//*Filtrado por temperamentos
const filterByTemperament = async(req, res) => {
  const { temp } = req.query;

  concatDataApiDb().then((resp) => {
    if (temp === "all") {
      res.status(200).json(resp);
    } else {
      let resultTempFiltered = resp.filter((e) => {
        if (e.temperament) {
          return e.temperament.includes(temp);
        }
      });
      res.status(200).json(resultTempFiltered);
    }
  });
  
  /* try{
  const { temp } = req.query;
  const allResults = await concatDataApiDb();

  if(temp === "all"){
    res.status(200).json(allResults)
  }else{
    let resp = allResults.filter(e =>{
      if(e.temperament){
        return e.temperament.includes(temp)
      }
    })

    res.status(200).json(resp)
  }
  
}catch(err){
  console.log(err)
} */
};

//*Filtrado por altura
const filterByHeight = async(req, res) => {
  try{
    const { height } = req.query

    const strHeight = height.split(" ")
    const respuesta_a = parseInt(strHeight[0]) 
    const respuesta_b = parseInt(strHeight[2]) 
    
    const data = await concatDataApiDb()
    
    const dataFiltered = data.filter(e =>{
      if(e.height){
        const strHeight_filter = e.height.split(" ")
        const respuesta_a_filter = parseInt(strHeight_filter[0]) 
        const respuesta_b_filter = parseInt(strHeight_filter[2]) 
        
        return respuesta_a_filter === respuesta_a || respuesta_b_filter === respuesta_b
      }
    })


    res.status(200).json(dataFiltered)

  }catch(err){
    console.log(err);
  }
}

//*Filtrado por edad
const filterByYears = async(req, res) => {
  try{
    const { years } = req.query

    const strYear = years.split(" ")
    const respuesta_a = parseInt(strYear[0]) 
    const respuesta_b = parseInt(strYear[2]) 
    
    const data = await concatDataApiDb()
    
    const dataFiltered = data.filter(e =>{
      if(e.yearsOfLife){
        const strYear_filter = e.yearsOfLife.split(" ")
        const respuesta_a_filter = parseInt(strYear_filter[0]) 
        const respuesta_b_filter = parseInt(strYear_filter[2]) 
        
        return respuesta_a_filter === respuesta_a || respuesta_b_filter === respuesta_b
      }
    })

    res.status(200).json(dataFiltered)

  }catch(err){
    console.log(err);
  }
}

//*Filtrado por peso
const filterByWeight = async(req, res) => {
  const { weight } = req.query
  const weightRoundQuery = Math.round(weight)

  concatDataApiDb().then(results => {
    let weightFiltered = results.filter(e => {
        return Math.round(e.weight) == weightRoundQuery
    })
      res.status(200).send(weightFiltered)
  })
}



module.exports = {
  getDogsApiDb,
  concatDataApiDb,
  getApiDbId,
  resultDataApi,
  createDog,
  filterByTemperament,
  filterByHeight,
  filterByYears,
  filterByWeight,

};
