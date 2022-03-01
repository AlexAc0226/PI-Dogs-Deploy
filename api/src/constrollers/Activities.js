const { Country, Tourist_activity } = require("../db");

const newActivity = async (req, res) => {
  try {
    const {type, name, difficulty, duration, season, countryId } = req.body;
    const arrayId = countryId.map((e) => e.toUpperCase());
    
    const newAct = await Tourist_activity.create({
      type: type,
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });

    arrayId.forEach(async (e) => { 
      const arrayCountries = await Country.findOne({
        where: { id: e },
      });

      await arrayCountries.addTourist_activity(newAct);
    });

    res.status(200).send("CREADO CORRECTAMENTE");
  } catch (error) {
    console.error(error);
  }
};




const getActivity = async(req , res ) =>{
    try{
      const  { name } = req.query;
      const normalize = name.toLowerCase();

      if(name === "all"){
        
        const allActivities = await Tourist_activity.findAll({
          include: Country
        });
  
        const finalActivities = await allActivities.map(e => e.countries).flat() 

        let array = [];
        for(let i = 0; i < finalActivities.length; i++){
          for(let x = 1; x < finalActivities.length; x++){
            if(finalActivities[x] === finalActivities[i])
              array.push(finalActivities[i])
          }
        } 
       
        res.status(200).json(array);
      
      }else{
        const dataFiltered = await Tourist_activity.findAll({
          include: Country
        });
  
        const result = await dataFiltered.filter(e => e.type === name).map(e => e.countries).flat()
        res.json(result)
      } 
    }catch(error){
      console.log(error)
    }
} 


module.exports = { newActivity, getActivity };
