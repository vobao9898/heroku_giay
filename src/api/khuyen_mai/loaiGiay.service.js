const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into khuyen_mai(ngay_bat_dau, ngay_ket_thuc, ten_khuyen_mai, mo_ta, phan_tram, hinh_anh, date_create) values (?,?,?,?,?,?,?)`, [
                data.ngay_bat_dau,
                data.ngay_ket_thuc,
                data.ten_khuyen_mai,
                data.mo_ta,
                data.phan_tram,
                data.hinh_anh,
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
    getKhuyenMaiNow: (data, callBack) => {
        pool.query(
            `select * from khuyen_mai as k, chi_tiet_khuyen_mai as c WHERE k.id = c.id_khuyen_mai and '${data.date_now}' BETWEEN k.ngay_bat_dau AND k.ngay_ket_thuc`, [data.date_now],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getSanPhamKMNow: (data, callBack) => {
        pool.query(
            `select g.* from khuyen_mai as k, chi_tiet_khuyen_mai as c, giay as g WHERE k.id = c.id_khuyen_mai and c.id_giay = g.id and '${data.date_now}' BETWEEN k.ngay_bat_dau AND k.ngay_ket_thuc`, [],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getKM: (data, callBack) => {
        pool.query(
            `select * from khuyen_mai as k, chi_tiet_khuyen_mai as c, giay as g WHERE k.id = c.id_khuyen_mai and c.id_giay = g.id and '${data.date_now}' BETWEEN k.ngay_bat_dau AND k.ngay_ket_thuc`, [],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getTen: (ten_loai_giay, callBack) => {
        pool.query(`select * from khuyen_mai where ten_khuyen_mai = ?`, [ten_khuyen_mai], (error, results, fields) => {
            if (error) {
                callBack(error);
            }

            return callBack(null, results[0]);
        });
    },
    getById: (id, callBack) => {
        pool.query(`select * from khuyen_mai where id = ?`, [id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    getKhuyenMai: (callBack) => {
        pool.query(`select * from khuyen_mai`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateKhuyenMai: (data, callBack) => {
        console.log(data);
        pool.query(
            `update khuyen_mai set ngay_bat_dau=?, ngay_ket_thuc=?, ten_khuyen_mai = ?, mo_ta=?, phan_tram=?, hinh_anh=?, date_update=? where id = ?`, [
                data.ngay_bat_dau,
                data.ngay_ket_thuc,
                data.ten_khuyen_mai,
                data.mo_ta,
                data.phan_tram,
                data.hinh_anh,
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
    deleteKhuyenMai: (data, callBack) => {
        pool.query(`DELETE FROM khuyen_mai WHERE id = ?`, [data.id], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
};