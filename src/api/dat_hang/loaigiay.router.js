const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
import * as controller from './loaiGiay.controller';
router.get('/', checkToken, controller.getAll);
router.post('/', controller.create);
// router.get('/:id', checkToken, controller.getLoaiGiayByid);
router.patch('/', checkToken, controller.update);
router.post('/delete', checkToken, controller.delete);

module.exports = router;