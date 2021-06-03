const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'do-an-tot-nghiep',
});
connection.connect(function(err) {
    err ? console.log('s') : console.log('ss');
});

let danhsachLogin = (req, res) => {
    var sql = 'SELECT * FROM nhan_vien';
    connection.query(sql, function(err, results) {
        if (err) throw err;
        else {
            // nhommonan = JSON.stringify({ monan: results });
            res.json({ nhan_vien: results });
        }
    });
};

let Login = (req, res) => {
    res.send({
        token: 'test123',
    });
};

module.exports = {
    danhsachLogin: danhsachLogin,
    Login: Login,
};