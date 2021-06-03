const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', checkToken, controller.getKhuyenMai);
router.post('/', controller.create);
router.get('/:id', checkToken, controller.getById);
router.patch('/', checkToken, controller.updateKhuyenMai);
router.post('/delete', checkToken, controller.deleteKhuyenMai);

module.exports = router;