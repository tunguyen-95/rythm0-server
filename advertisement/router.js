const { Router } = require('express');
const Advertisement = require('./model');
const auth = require('../auth/middleware');
const router = new Router();

router.get('/api/gbad', (req, res, next) => {
  Advertisement.findAll()
    .then(ads => res.json(ads))
    .catch(next);
});

router.get('/api/gbad/:id', (req, res, next) => {
  Advertisement.findByPk(req.params.id)
    .then(ad => res.json(ad))
    .catch(next);
});

router.post('/api/gbad', auth, (req, res, next) => {
  Advertisement.create(req.body)
    .then(ad => res.json(ad))
    .catch(next);
});

router.put('/api/gbad/:id', auth, (req, res, next) => {
  Advertisement.findByPk(req.params.id)
    .then(ad => ad.update(req.body))
    .then(ad => res.json(ad))
    .catch(next);
});

router.delete('/api/gbad/:id', auth, (req, res, next) => {
  Advertisement.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(numDeleted => {
      if (numDeleted) {
        return res.status(204).end();
      }
      return res.status(404).end();
    })
    .catch(next);
});

module.exports = router;
