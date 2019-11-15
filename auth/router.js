const { Router } = require('express');
const { toJWT } = require('./jwt');
const bcrypt = require('bcrypt');
const User = require('../user/model');

const router = new Router();

router.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send({
      message: 'Please provide a valid email and password'
    });
  } else {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist'
          });
        }
        if (bcrypt.compareSync(req.body.password, entity.password)) {
          res.send({
            userId: entity.id,
            name: entity.name,
            email: entity.email,
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: 'Password was incorrect'
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: 'Something went wrong'
        });
      });
  }
});

module.exports = router;
