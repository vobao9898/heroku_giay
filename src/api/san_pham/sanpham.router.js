const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as giay from './sanpham.controller';
router.get('/', giay.getGiay);
router.get('/newProducts', giay.newProducts);
router.get('/newProductsAll', giay.newProductsAll);
router.post('/productLG', giay.productLG);
router.post('/giayLG', giay.giayLG);
router.get('/newProduct', giay.newProduct);
router.post('/', giay.createGiay);
router.post('/page', giay.page);
router.post('/pageSearch', giay.pageSearch);
router.get('/:id', giay.getUserByUserId);
router.post('/ten_giay', giay.getUserByGiay);
router.patch('/', giay.updateGiay);
router.post('/delete', giay.deleteGiay);

module.exports = router;
