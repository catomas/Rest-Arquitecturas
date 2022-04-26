const { Router, response } = require('express');
const product = require('../controllers/ProductController');

const router = Router();


router.get('/api/product/list',  product.list);
router.post('/api/product/save',  product.save);
router.get('/api/product/show/:id',  product.show);
router.put('/api/product/update/:id',  product.update);
router.delete('/api/product/delete/:id', product.remove);



module.exports = router;