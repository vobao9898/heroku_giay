import * as giay from './sanpham.service';
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

function kt(a, b) {
    if (a == b) return true;
    return false;
}
module.exports = {
    createGiay: (req, res) => {
        const body = req.body;

        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        giay.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection errror',
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    page: (req, res) => {
        giay.page((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        giay.getUserByGiayId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getUserByGiay: (req, res) => {
        const ten_giay = req.body.ten_giay;
        giay.getUserByGiayTen_giay(ten_giay, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not Found',
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getGiay: (req, res) => {
        giay.getGiay((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    updateGiay: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        console.log(body.username);
        giay.updateGiay(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: 'updated successfully',
            });
        });
    },
    deleteGiay: (req, res) => {
        const data = req.body;
        giay.deleteGiay(data, (err, results) => {
            console.log(err, results);
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.json({
                        success: 500,
                        message: 'Giày không thể xóa',
                    });
                }
            }

            if (results == 'undefined') {
                return res.json({
                    success: 1,
                    message: 'user deleted successfully',
                });
            }
            return res.json({
                success: 0,
                message: 'Record Not Found',
            });
        });
    },
};