const client = require("../connection");
const pool = require("../connection");

const logsctrl = {};

logsctrl.logs = async (req, res) => {

    pool.query("SELECT * FROM logs;", (err, result) => {
        if (!err) {
            res.status(200).json({ mensaje: true, datos: result.rows });
        } else {
            res.status(500).json({ mensaje: err });
        }
    });
    pool.end;
    
}

module.exports = logsctrl;