const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into giay(id, ten_giay, mo_ta, id_loai_giay, date_create, gia_ban, trang_thai) values (?,?,?,?,?,?,?)`, [data.id_g, data.ten_giay, data.mo_ta, data.id_loai_giay, data.date_create, data.gia_ban, data.trang_thai],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByGiayTen_giay: (ten_giay, callBack) => {
        pool.query(`select * from giay where ten_giay = ?`, [ten_giay], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getUserByGiayId: (id, callBack) => {
        pool.query(`select * from giay where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getGiay: (callBack) => {
        pool.query(`select * from giay`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    page: (callBack) => {
        pool.query(`select * from nhan_vien limit ? offset ?`, [2, 2], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateGiay: (data, callBack) => {
        pool.query(
            `update giay set ten_giay=?, mo_ta=?,id_loai_giay=?, date_update=?, gia_ban=?, trang_thai=?  where id = ?`, [data.ten_giay, data.mo_ta, data.id_loai_giay, data.date_update, data.gia_ban, data.trang_thai, data.id_g],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteGiay: (data, callBack) => {
        pool.query(`DELETE FROM giay WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};