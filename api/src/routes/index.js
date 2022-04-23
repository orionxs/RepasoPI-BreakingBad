const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Character, Occupation } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://breakingbadapi.com/api/characters");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      name: el.name,
      id: el.id,
      nickname: el.nickname,
      status: el.status,
      image: el.img,
      id: el.char_id,
      occupation: el.occupation.map((el) => el),
      birthday: el.birthday,
      appearance: el.appearance.map((el) => el),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllCharacters = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/characters", async (req, res) => {
  const name = req.query.name;
  let totalCharacters = await getAllCharacters();
  if (name) {
    let characterName = await totalCharacters.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    characterName.length
      ? res.status(200).send(characterName)
      : res.status(404).send("character not found");
  } else {
    res.status(200).send(totalCharacters);
  }
});

router.get("/occupations", async (req, res) => {
  const apiInfo = await axios.get("https://breakingbadapi.com/api/characters");
  const occupations = apiInfo.data.map((el) => el.occupation);
  const occEach = occupations.map((el) => {
    for (let i = 0; i < el.length; i++) return el[i];
  });

  occEach.forEach((el) => {
    Occupation.findOrCreate({
      where: { name: el },
    });
  });
  const allOccupations = await Occupation.findAll();
  res.send(allOccupations);
});

router.post("/character", async (req, res) => {
  let { 
    name, 
    nickname, 
    birthday, 
    image, 
    status, 
    createdInDb, 
    occupation 
} = req.body;

  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    image,
    status,
    createdInDb,
  });

  let occupationDb = await Occupation.findAll({ where: { name: occupation } });
  characterCreated.addOccupation(occupationDb);
  res.send("Character succesfully created");
});

router.get('/characters/:id', async (req,res) => {
    const id = req.params.id;
    const allChar = await getAllCharacters();
    
    if(id){
        let filtrado = await allChar.filter(el => el.id == id)
        filtrado.length?
            res.status(202).json(filtrado) :
            res.status(404).send("Character id not found")
    }
})

module.exports = router;
