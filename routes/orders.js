const { Router, response } = require('express');
const order = require('../controllers/OrderController');

const router = Router();


router.get('/api/order/list',  order.list);
router.post('/api/order/save',  order.save);
router.get('/api/order/show/:id',  order.show);
router.put('/api/order/update/:id',  order.update);
router.delete('/api/order/delete/:id', order.remove);



module.exports = router;