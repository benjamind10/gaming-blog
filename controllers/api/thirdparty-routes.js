const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require('axios');
const fs = require('fs');
var convert = require('xml-js');

router.get('/', (req, res) => {
  try {
    const fetch = axios
      .get(
        'https://www.callofduty.com/api/papi-client/leaderboards/v2/title/mw/platform/psn/time/alltime/type/core/mode/career/page/1'
      )
      .then(response => res.json(response.data));
  } catch (error) {
    console.log(error);
  }
});

router.get('/events', (req, res) => {
  try {
    const fetch = axios
      .get(
        'https://my.callofduty.com/api/papi-client/ce/v1/title/mw/platform/Set by test scripts/match/16435623658620974427/matchMapEvents'
      )
      .then(response => res.json(response.data));
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => {
  try {
    const fetch = axios
      .get('https://s.activision.com/activision/login')
      .then(response => res.json(response.data));
  } catch (error) {
    console.log(error);
    0;
  }
});

router.get('/news', (req, res) => {
  try {
    const fetch = axios
      .get('https://gamerant.com/feed/category/gaming/')
      .then(response => {
        const filtered = response.data.replace(/\n/g, '');
        var result1 = convert.xml2json(filtered, {
          compact: false,
          spaces: 4,
        });
        res.json(result1);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
