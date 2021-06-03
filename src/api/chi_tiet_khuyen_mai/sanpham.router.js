const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as ctmauSac from './sanpham.controller';
router.get('/', checkToken, ctmauSac.getAll);
// router.get('/page', checkToken, ctmauSac.page);
router.post('/', checkToken, ctmauSac.create);
// router.get('/:id', checkToken, ctmauSac.getById);
// router.post('/ten_giay', checkToken, ctmauSac.getBy);
router.patch('/', checkToken, ctmauSac.update);
router.post('/delete', checkToken, ctmauSac.delete);

module.exports = router;