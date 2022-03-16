const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const { response } = require('express');

// get all posts for homepage
router.get('/', withAuth, (req, res) => {
  const releases = [];
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'created_at',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  }).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    try {
      const fetch = axios
        .get(
          `http://www.gamespot.com/api/games/?api_key=${process.env.GAMESPOT_API}&format=json&limit=10`
        )
        .then(response => {
          let tmp = response.data.results
            .filter(e => {
              return e.description !== '';
            })
            .filter(e => {
              return e.image !== null;
            });

          // console.log('Response', response.data);
          res.render('homepage', {
            posts,
            response: tmp,
            username: req.session.username,
            loggedIn: req.session.loggedIn,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json;
      window.location('/');
    }
  });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'created_at',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/chat', withAuth, (req, res) => {
  const userObj = {
    id: req.session.user_id,
    username: req.session.username,
  };
  res.render('chat', {
    userObj,
    loggedIn: req.session.loggedIn,
  });
});

router.get('/about-us', (req, res) => {
  res.render('about-us');
});

router.get('/forum', withAuth, (req, res) => {
  const userObj = {
    id: req.session.user_id,
    username: req.session.username,
  };

  Post.findAll({
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'created_at',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('forum', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
