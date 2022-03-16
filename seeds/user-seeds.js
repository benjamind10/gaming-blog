const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "Krishna",
    email: "every2millenia@cbc.ca",
    password: "TigaTiga!",
  },
  {
    username: "LaoTzu",
    email: "Toadejing",
    password: "badMan=Job4goodMan!",

    username: "Muhammad",
    email: "butterflysting@sogou.com",
    password: "UmrahMedina",
  },
  {
    username: "Yeshuwa",
    email: "fortydaze&nites@last.fm",
    password: "Ioftheneedle",
  },
  {
    username: "Apollo",
    email: "sungod@goo.ne.jp",
    password: "Horus!",
  },
  {
    username: "Kang",
    email: "imortus@marvel.com",
    password: "Theconquorer",
  },
  {
    username: "Zoe",
    email: "mercurysvoice@imdb.com",
    password: "L!fe",
  },
  {
    username: "Artimis",
    email: "ganjafarm@feedburner.com",
    password: "moongoddess",
  },
  {
    username: "Zelda",
    email: "Specialsword@china.com.cn",
    password: "16Bits",
  },
  {
    username: "Luigi",
    email: "littlebrosyndrome@google.ru",
    password: "Psylocibin",
  },
  {
    username: "CaptainAmerica",
    email: "ibogaine.gov",
    password: "ExitfromHell",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
