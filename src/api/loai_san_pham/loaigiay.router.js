const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', checkToken, controller.getLoaiGiay);
router.post('/', controller.createLoaiGiay);
router.get('/:id', checkToken, controller.getLoaiGiayByid);
router.patch('/', checkToken, controller.updateLoaiGiay);
router.post('/delete', checkToken, controller.deleteLoaiGiay);

module.exports = router;