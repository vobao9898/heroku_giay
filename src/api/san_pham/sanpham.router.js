const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as giay from './sanpham.controller';
router.get('/', checkToken, giay.getGiay);
router.post('/', checkToken, giay.createGiay);
router.post('/page', checkToken, giay.page);
router.post('/pageSearch', checkToken, giay.pageSearch);
router.get('/:id', checkToken, giay.getUserByUserId);
router.post('/ten_giay', checkToken, giay.getUserByGiay);
router.patch('/', checkToken, giay.updateGiay);
router.post('/delete', checkToken, giay.deleteGiay);

module.exports = router;