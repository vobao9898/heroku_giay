const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into dat_hang(id, id_khach_hang, trang_thai, thoi_gian_dat, ten_nguoi_nhan, sdt_nguoi_nhan, dia_chi_nguoi_nhan, date_create) values (?,?,?,?, ?,?,?)`, [
                data.id_khach_hang,
                data.trang_thai,
                data.thoi_gian_dat,
                data.ten_nguoi_nhan,
                data.sdt_nguoi_nhan,
                data.dia_chi_nguoi_nhan,
                data.date_create,
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
        pool.query(`select * from dat_hang where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getAll: (callBack) => {
        pool.query(`select * from dat_hang`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    update: (data, callBack) => {
        pool.query(
            `update dat_hang set id_khach_hang=?, trang_thai=?, thoi_gian_dat=?, ten_nguoi_nhan = ?, sdt_nguoi_nhan=?, dia_chi_nguoi_nhan=?,date_update=?, where id = ?`, [
                data.id_khach_hang,
                data.trang_thai,
                data.thoi_gian_dat,
                data.ten_nguoi_nhan,
                data.sdt_nguoi_nhan,
                data.dia_chi_nguoi_nhan,
                data.date_update,
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
        pool.query(`DELETE FROM dat_hang WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};