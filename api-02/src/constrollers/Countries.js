const axios = require("axios");
const { Op } = require("sequelize");

const { Country, Tourist_activity } = require("../db");

const infoApi = async () => {
  const resultApi = await axios.get("https://restcountries.com/v3.1/all");

  const dataApi = await resultApi.data.map((data) => {
    return {
      id: data.cca3,
      name: data.name.common,
      image: data.flags,
      continent: data.continents,
      capital: data.capital,
      subregion: data.subregion,
      area: data.area,
      population: data.population,
    };
  });

  return dataApi;
};

const addInfoDb = async (req, res) => {
  try {
    const dataApi = await infoApi();
    await dataApi.forEach((element) => {
      Country.create({
        id: element.id,
        name: element.name,
        image: element.image.png,
        continent: element.continent[0],
        capital: element.capital ? element.capital[0] : "Capital not found",
        subregion: element.subregion,
        area: element.area,
        population: element.population,
      });
    });

    res.status(200).json(dataApi);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

///////-----------///////

const getCountries = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (name) {
      const countriesByNmae = await Country.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      countriesByNmae.length
        ? res.status(200).json(countriesByNmae)
        : res.status(404).send("Country does not exist");
    } else {
      
      const actAndCountryDb = await Country.findAll({
        include: {
          model: Tourist_activity,
          attributes: ["type", "name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          }
        }
      });
      res.status(200).json(actAndCountryDb);
    }
  } catch (error) {
    console.error(error);
  }
};

const getCountriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const normalizeId = id.toUpperCase();

    const dataApi = await Country.findOne({ where: { id: normalizeId } });

    if (dataApi === null || dataApi.length > 3) {
      res.status(404).send("Id not found");
    } else {
      const actAndCountryDb = await Country.findAll({
        where: { id: normalizeId },
        include: {
          model: Tourist_activity,
          attributes: ["type", "name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          }
        }
      });
      res.status(200).json(actAndCountryDb);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCountries /*addInfoDb*/,
  getCountriesById
};
