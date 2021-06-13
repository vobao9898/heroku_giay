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
    page: (data, callBack) => {
        if (data.id_loai_giay !== 0) {
            pool.query(
                `select * from giay WHERE id_loai_giay = ? limit ? offset ?`, [data.id_loai_giay, data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } else {
            pool.query(`select * from giay limit ? offset ?`, [data.limit, data.offset], (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            });
        }
    },
    pageSearch: (data, callBack) => {
        console.log(data);
        if (data.ten_giay !== '') {
            pool.query(
                `select * from giay WHERE ten_giay like '%${data.ten_giay}%' limit ? offset ?`, [data.limit, data.offset],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }

                    return callBack(null, results);
                }
            );
        } else {
            pool.query(`select * from giay limit ? offset ?`, [data.limit, data.offset], (error, results, fields) => {
                if (error) {
                    callBack(error);
                }

                return callBack(null, results);
            });
        }
    },

    getGiay: (callBack) => {
        pool.query(`select * from giay`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    newProduct: (callBack) => {
        pool.query(`select * from giay ORDER BY date_create DESC`, [], (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    newProducts: (callBack) => {
        pool.query(
            `select g.id as id_giay, g.ten_giay, g.gia_ban, g.id_loai_giay, g.mo_ta, g.gia_ban_khuyen_mai, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select id from giay ORDER BY date_create DESC LIMIT 9)AS sub)`, [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    newProductsAll: (callBack) => {
        pool.query(
            `select g.id, g.ten_giay, g.gia_ban, g.id_loai_giay, g.mo_ta, g.gia_ban_khuyen_mai, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and g.id IN (SELECT sub.id from (select id from giay ORDER BY ? ? LIMIT ? OFFSET ?)AS sub)`, [data.sortBy, data.groupBy, data.limit, data.offset],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    productLG: (data, callBack) => {
        pool.query(
            `select g.id, g.ten_giay, g.gia_ban, g.id_loai_giay, g.mo_ta, g.gia_ban_khuyen_mai, m.id, m.id_mau_sac, ms.ten_mau_sac, m.hinh_anh, s.id_size, si.ten_size, s.so_luong, l.ten_loai_giay from giay as g, chi_tiet_mau_sac as m, chi_tiet_mau_sac_size as s, mau_sac as ms, size as si, loai_giay as l WHERE g.id = m.id_giay  and m.id_mau_sac = ms.id and  m.id = s.id_ct_mau_sac and si.id = s.id_size and g.trang_thai != 0 and l.id = g.id_loai_giay and l.id = ?`, [data.id_loai_giay],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    giayLG: (data, callBack) => {
        pool.query(`SELECT * from giay WHERE id_loai_giay = ?`, [data.id_loai_giay], (error, results, fields) => {
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