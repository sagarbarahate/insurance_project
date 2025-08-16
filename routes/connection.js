var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    host:"bvdhyquzfvdps41odb8h-mysql.services.clever-cloud.com",
    user:"ufuycywoe21qzyvh",
    password:"AojoIgeALEgv9e0Irg6e",
    database:"bvdhyquzfvdps41odb8h"
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;