const { Post } = require('../models');

const postData = [
  {
    title: 'Elden Ring Review - Death Of The Wild',
    post_url:
      'Fifteen hours into Elden Ring, I defeated Godrick The Golden, the first of five Elden Lords. ',
    user_id: 3,
  },
  {
    title:
      'Stranger Of Paradise: Final Fantasy Origin Review - Chaos Incarnate',
    post_url:
      'When it was first announced back during E3 2021, Stranger of Paradise: Final Fantasy Origin quickly became something of a meme,',
    user_id: 1,
  },
  {
    title:
      'For WoWs Next Expansion, Blizzard Must Learn From Shadowlands Mistakes',
    post_url: `Since its launch in 2004, World of Warcraft has been the undisputed king of the MMORPG genre."`,
    user_id: 2,
  },
  {
    title: `Mandalorian Finale: Disney Did Another Uncanny CG Star Wars Character Cameo`,
    post_url: `The Mandalorian Season 2 has not been shy about bringing in elements and characters from around the Star Wars galaxy. `,
    user_id: 5,
  },
  {
    title: `The Sims 4 Drops Surprise Neighborhood Stories Update`,
    post_url: `A surprise new update has just dramatically updated how Neighborhood Stories work in The Sims 4, as picked up by Eurogamer. `,
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
