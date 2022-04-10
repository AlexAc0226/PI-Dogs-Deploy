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
        },
      },
    });

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

module.exports = {
  getDogsApiDb,
  concatDataApiDb,
  getApiDbId,
  resultDataApi,
  createDog,
  filterByTemperament,
};
