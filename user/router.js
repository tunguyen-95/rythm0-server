const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');
const auth = require('../auth/middleware');
const router = new Router();

router.post('/api/user', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(userAccount => {
      if (userAccount) {
        res.status(409).send({
          message:
            'This email was already used to register. Please choose another email to sign up.'
        });
      } else {
        const user = {
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        };

        User.create(user).then(userAccount => res.json(userAccount));
      }
    })
    .catch(next);
});

router.get('/api/user/:userId/', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => res.json(user))
    .catch(next);
});

router.delete('/api/user/:userId', auth, (req, res, next) => {
  User.destroy({ where: { id: req.params.userId } })
    .then(numDeleted => {
      if (numDeleted) {
        return res.status(204).end();
      }
      return res.status(404).end();
    })
    .catch(next);
});

module.exports = router;
