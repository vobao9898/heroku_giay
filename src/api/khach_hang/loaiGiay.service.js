const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into khach_hang(facebook_id, email, ho_khach_hang, password, phone, avatar, ten_khach_hang, accessToken) values (?,?,?,?,?,?,?,?)`, [
                data.facebook_id,
                data.email,
                data.ho_khach_hang,
                data.password,
                data.phone,
                data.avatar,
                data.ten_khach_hang,
                data.accessToken,
            ],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getById: (id, callBack) => {
        pool.query(`select * from khach_hang where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAll: (callBack) => {
        pool.query(`select * from khach_hang`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    getFBID: (data, callBack) => {
        pool.query(`select * from khach_hang where facebook_id = ? `, [data.facebook_id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getEmail: (data, callBack) => {
        pool.query(`select * from khach_hang where email = ? `, [data.email], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update khach_hang set facebook_id=?, email=?, username=?, password = ?, phone, avatar, ten_khach_hang, ngay_sinh, gioi_tinh, where id = ?`, [
                data.facebook_id,
                data.email,
                data.username,
                data.password,
                data.phone,
                data.avatar,
                data.ten_khach_hang,
                data.ngay_sinh,
                data.gioi_tinh,
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    delete: (data, callBack) => {
        pool.query(`DELETE FROM khach_hang WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};