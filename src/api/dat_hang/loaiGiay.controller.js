import * as loaigiay from "./loaiGiay.service";
var request = require("request");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

import axios from "axios";

const authAxios = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

module.exports = {
    create: (req, res) => {
        const body = req.body;
        console.log(body);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    getByid: (req, res) => {
        const id = req.params.id;
        loaigiay.getById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found",
                });
            }

            return res.json({
                success: 1,
                data: results,
            });
        });
    },
    getAll: (req, res) => {
        loaigiay.getAll((err, results) => {
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
    update: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);

        loaigiay.update(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully",
            });
        });
    },
    delete: (req, res) => {
        const data = req.body;
        loaigiay.delete(data, (err, results) => {
            if (err) {
                if (err.code === "ER_ROW_IS_REFERENCED_2") {
                    return res.json({
                        success: 500,
                        message: "đơn hàng hiện không thể xóa phẩm không thể xóa",
                    });
                }
            }
            if (results == "undefined") {
                return res.json({
                    success: 1,
                    message: "user deleted successfully",
                });
            }
            return res.json({
                success: 0,
                message: "Record Not Found",
            });
        });
    },
    postNotify: (req, res) => {
        const body = req.body;
        authAxios.post(``, body);
    },
};