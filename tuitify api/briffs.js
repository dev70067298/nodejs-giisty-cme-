//dependencies
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//end

//variables
var keyword;
var mysqlconnection;
//end

//database connection
const plat = (name) => {
    keyword = name;
    switch (keyword) {
        case "test":
            mysqlconnection = mysql.createConnection({

                host: 'tuitifyxelorfrdemo.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyXelorDemo',
                password: 'TuXe!W&seTre-d',
                database: 'TuitifyXelorDemo',
                port: '3306'
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("test database is connected successfuly");
                } else {
                    console.log('test database not connected because: ' + err);
                }
            });


            break;
        case "help":
            mysqlconnection = mysql.createConnection({

                host: 'prods-tuitifylivedemo.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyLiveDemo',
                password: 'TuXe!R&seTre-d',
                database: 'TuitifyXelorDemo',
                port: '3306'
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("sandbox database is connected successfuly");
                } else {
                    console.log('sandbox database not connected because: ' + err);
                }
            });

            break;
        case "inspire":
            mysqlconnection = mysql.createConnection({

                host: 'prods-tuitifylivedemo.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyLiveDemo',
                password: 'TuXe!R&seTre-d',
                database: 'TuitifyXelorDemo',
                port: '3306'
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("sandbox database is connected successfuly");
                } else {
                    console.log('sandbox database not connected because: ' + err);
                }
            });

            break;
        case "preboarding-axa":
            mysqlconnection = mysql.createConnection({

                host: 'prods-tuitifylivedemo.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyLiveDemo',
                password: 'TuXe!R&seTre-d',
                database: 'TuitifyXelorDemo',
                port: '3306'
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("sandbox database is connected successfuly");
                } else {
                    console.log('sandbox database not connected because: ' + err);
                }
            });

            break;

        case "socialknowledge-axa":
            mysqlconnection = mysql.createConnection({

                host: 'prod-tuitifyaxasite.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyLiveDemo',
                password: 'TuXe!R&seTre-d',
                database: 'TuitifyXelorDemo',
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("axa database is connected successfuly");
                } else {
                    console.log('axa database not connected because: ' + err);
                }
            });

            break;
        default:
            mysqlconnection = mysql.createConnection({

                host: 'tuitifyxelorfrdemo.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
                user: 'TuitifyXelorDemo',
                password: 'TuXe!W&seTre-d',
                database: 'TuitifyXelorDemo',
                port: '3306'
            });
            mysqlconnection.connect((err) => {
                if (!err) {
                    console.log("test database is connected successfuly");
                } else {
                    console.log('test database not connected because: ' + err);
                }
            });

    }



}
//end

//recived data
router.get('/c_recive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        //api 
        mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.from_id = users.id where c_shared.status = ? and c_shared.to_id =?  and c_briffs.is_delete = ?', [1, req.query.user_id, 0], (err, row1) => {
            if (row1.length > 0) {

                res.send({
                    status: 'true',
                    recive: row1,
                    message: 'success'
                })

            }
            else {
                res.send({
                    status: 'false',
                    recive: [],
                    message: err
                })

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})
//end

//send data
router.get('/c_send?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        //api 
        mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.to_id = users.id where c_shared.status = ? and c_shared.from_id =?  and c_briffs.is_delete = ?', [1, req.query.user_id, 0], (err, row1) => {
            if (row1.length > 0) {

                res.send({
                    status: 'true',
                    send: row1,
                    message: 'success'
                })

            }
            else {
                res.send({
                    status: 'false',
                    send: [],
                    message: err
                })

            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//Archive data
router.get('/c_archive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end



module.exports = router;