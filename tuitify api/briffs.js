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
        mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.to_id =?  and c_briffs.is_delete = ?', [1, req.query.user_id, 0], (err, row1) => {
            if (row1.length > 0) {
                var a = [];

                for (let i = 0; i < row1.length; i++) {
                    mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.from_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                        if (row2.length > 0) {
                            a.push(row2[0]);
                        }
                        if (row1.length - 1 == i || row1.length == 1) {
                            res.send({
                                status: 'true',
                                recive: a,
                                message: 'success'
                            })

                        }
                    })
                }
            }
            else {
                res.send({
                    status: 'false',
                    recive: [],
                    message: 'There is no recived briffs'
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
        mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.from_id =?  and c_briffs.is_delete = ?', [1, req.query.user_id, 0], (err, row1) => {
            if (row1.length > 0) {
                var a = [];

                for (let i = 0; i < row1.length; i++) {
                    mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.to_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                        if (row2.length > 0) {
                            a.push(row2[0]);
                        }
                        if (row1.length - 1 == i || row1.length == 1) {
                            res.send({
                                status: 'true',
                                recive: a,
                                message: 'success'
                            })

                        }
                    })
                }
            }
            else {
                res.send({
                    status: 'false',
                    recive: [],
                    message: 'There is no sent briffs'
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

        mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_archived.created FROM c_archived left join TuitifyXelorDemo.c_briffs on c_archived.briff_id  = c_briffs.id left join users on c_archived.user_id = users.id where c_archived.user_id=?', [req.query.user_id], (err, row1) => {
            if (row1.length > 0) {

                res.send({
                    status: 'true',
                    archive: row1,
                    message: 'success'
                })

            }
            else {
                res.send({
                    status: 'false',
                    archive: [],
                    message: 'failed'
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

//search recived data
router.get('/search_recive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        //api 
        var keyword = req.query.keyword;
        var string = req.query.string;
        console.log(string);
        switch (keyword) {
            case "name":
                mysqlconnection.query("SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.to_id =?  and c_briffs.is_delete = ? and c_briffs.title LIKE '%" + string + "%'", [1, req.query.user_id, 0], (err, row1) => {
                    console.log(err);
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.from_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no recived briffs with this name'
                        })
                    }
                })
                break;
            case "duration":
                mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.to_id =?  and c_briffs.is_delete = ? and c_briffs.duration = ?', [1, req.query.user_id, 0, string], (err, row1) => {
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.from_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no recived briffs with this duration'
                        })
                    }
                })
                break;
            case "date":
                mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.to_id =?  and c_briffs.is_delete = ? and c_shared.created = ?', [1, req.query.user_id, 0, string], (err, row1) => {
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.from_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no recived briffs with this date'
                        })
                    }
                })
                break;
            default:
                console.log('no data');
        }

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})
//end

//search send data
router.get('/search_send?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        //api 


        var keyword = req.query.keyword;
        var string = req.query.string;
        console.log(string);
        switch (keyword) {
            case "name":
                mysqlconnection.query("SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.from_id =?  and c_briffs.is_delete = ? and c_briffs.title LIKE '%" + string + "%'", [1, req.query.user_id, 0], (err, row1) => {
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.to_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no sent briffs with this name'
                        })
                    }
                })
                break;
            case "duration":
                mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.from_id =?  and c_briffs.is_delete = ? and c_briffs.duration = ?', [1, req.query.user_id, 0, string], (err, row1) => {
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.to_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no sent briffs with this duration'
                        })
                    }
                })
                break;
            case "date":
                mysqlconnection.query('SELECT c_shared.briff_id as id FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id where c_shared.status = ? and c_shared.from_id =?  and c_briffs.is_delete = ? and c_shared.created = ?', [1, req.query.user_id, 0, string], (err, row1) => {
                    if (row1.length > 0) {
                        var a = [];

                        for (let i = 0; i < row1.length; i++) {
                            mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_shared.is_read,c_shared.status,c_shared.created FROM c_shared left join c_briffs on c_shared.briff_id  = c_briffs.id left join users on c_shared.to_id = users.id where c_briffs.id = ? and NOT EXISTS ( SELECT * from c_archived where briff_id = ? and user_id=?)', [row1[i].id, row1[i].id, req.query.user_id], (err, row2) => {
                                if (row2.length > 0) {
                                    a.push(row2[0]);
                                }
                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        recive: a,
                                        message: 'success'
                                    })

                                }
                            })
                        }
                    }
                    else {
                        res.send({
                            status: 'false',
                            recive: [],
                            message: 'There is no sent briffs with this date'
                        })
                    }
                })
                break;
            default:
                console.log('no data');
        }




    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end


//search archive data
router.get('/search_archive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        //api 




        var keyword = req.query.keyword;
        var string = req.query.string;
        switch (keyword) {
            case "name":
                mysqlconnection.query("SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_archived.created FROM c_archived left join TuitifyXelorDemo.c_briffs on c_archived.briff_id  = c_briffs.id left join users on c_archived.user_id = users.id where c_archived.user_id=? and c_briffs.title LIKE '%" + string + "%'", [req.query.user_id], (err, row1) => {
                    if (row1.length > 0) {

                        res.send({
                            status: 'true',
                            archive: row1,
                            message: 'success'
                        })

                    }
                    else {
                        res.send({
                            status: 'false',
                            archive: [],
                            message: 'Their is no Archive briffs with this name'
                        })

                    }
                })

                break;
            case "duration":
                mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_archived.created FROM c_archived left join TuitifyXelorDemo.c_briffs on c_archived.briff_id  = c_briffs.id left join users on c_archived.user_id = users.id where c_archived.user_id=? and c_briffs.duration = ?', [req.query.user_id, string], (err, row1) => {
                    if (row1.length > 0) {

                        res.send({
                            status: 'true',
                            archive: row1,
                            message: 'success'
                        })

                    }
                    else {
                        res.send({
                            status: 'false',
                            archive: [],
                            message: 'Their is no Archive briffs with this duration'
                        })

                    }
                })

                break;
            case "date":
                mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.id,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_archived.created FROM c_archived left join TuitifyXelorDemo.c_briffs on c_archived.briff_id  = c_briffs.id left join users on c_archived.user_id = users.id where c_archived.user_id=? and c_archived.created=?', [req.query.user_id, string], (err, row1) => {
                    if (row1.length > 0) {

                        res.send({
                            status: 'true',
                            archive: row1,
                            message: 'success'
                        })

                    }
                    else {
                        res.send({
                            status: 'false',
                            archive: [],
                            message: 'Their is no Archive briffs with this date'
                        })

                    }
                })

                break;
            default:
                console.log('no data');
        }


    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end

//delete recive data
router.delete('/delete_recive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('delete from c_shared where to_id = ? and briff_id = ?', [req.query.user_id, id[i]], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully deleted reived briffs'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//delete send data
router.delete('/delete_send?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('delete from c_shared where from_id = ? and briff_id = ?', [req.query.user_id, id[i]], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully deleted send briffs'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//unarchive data
router.delete('/unarchive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('delete from c_archived where user_id = ? and briff_id = ?', [req.query.user_id, id[i]], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully unarchive'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end


//archive data
router.post('/archive?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('insert into c_archived(user_id,briff_id,created,modified) values(?,?,?,?)', [req.query.user_id, id[i], req.query.date, req.query.date], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully archive'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//mark as read data
router.put('/mark_read?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('update c_shared set is_read=? where to_id=? and briff_id = ?', [1, req.query.user_id, id[i]], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully mark as read'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//mark as unread data
router.put('/mark_unread?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('update c_shared set is_read=? where to_id=? and briff_id = ?', [0, req.query.user_id, id[i]], (err, row1) => {
                console.log(err);
                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully mark as unread'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end


//forward data
router.post('/forward?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var id = JSON.parse(req.query.id);
        console.log(id);
        for (let i = 0; i < id.length; i++) {
            mysqlconnection.query('insert into c_shared(from_id,to_id,briff_id,is_read,status,created,modified) values(?,?,?,?,?,?,?)', [req.query.user_id, id[i], req.query.briff_id, 0, 1, req.query.date, req.query.date], (err, row1) => {

                console.log(id[i]);
                if (id.length - 1 == i || id.length == 1) {

                    res.send({
                        status: 'true',
                        message: 'successfully forward'
                    })

                }
            })
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})
//end

//forward data
router.post('/create_briffs?', (req, res) => {

    //api url
    //localhost:3000/comm/create_briffs?name=test&tags=document,new&user_id=162&date=2018-02-02 07:18:42&platform_id=18&title=1st briffs&description=this is first briff of document type &type=pdf&thumbnail=image.png

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        mysqlconnection.query('insert into c_briffs(title,description,thumbnail,tags,duration,type,user_id,platform_id,is_delete,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.title, req.query.description, req.query.thumbnail, req.query.tags, req.query.duration, req.query.type, req.query.user_id, req.query.platform_id, 0, req.query.date, req.query.date], (err, row1) => {

            if (!err) {
                res.send({
                    status: 'true',
                    message: 'successfully create briff'
                })
            }
            else {
                res.send({
                    status: 'false',
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

//play briff data
router.get('/play_briff?', (req, res) => {

    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);

        mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_briffs.title,c_briffs.description,c_briffs.thumbnail,c_briffs.tags,c_briffs.duration,c_briffs.type,c_briffs.created FROM c_briffs left join users on c_briffs.user_id = users.id where c_briffs.id = ? and c_briffs.platform_id = ? and c_briffs.is_delete=?', [req.query.briff_id, req.query.platform_id, 0], (err, row1) => {

            if (row1.length > 0) {
                res.send({
                    status: 'true',
                    briff: row1,
                    message: 'success'
                })
            }
            else {
                res.send({
                    status: 'false',
                    briff: [],
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

//interaction of briffs
router.get('/interaction?', (req, res) => {


//api url
//http://localhost:3000/comm/interaction?name=test&briff_id=1&user_id=172
    if (!req.query.name == '') {

        //connect database
        plat(req.query.name);
        var array = [];
        mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_comments.briff_id,c_comments.id,c_comments.title,c_comments.message,c_comments.thumbnail,c_comments.type,c_comments.user_id,c_comments.parent_id,c_comments.created FROM c_comments left join users on c_comments.user_id = users.id where c_comments.briff_id = ? and c_comments.is_delete=? and c_comments.parent_id=?', [req.query.briff_id, 0, 0], (err, row1) => {

            if (row1.length > 0) {
                for (let i = 0; i < row1.length; i++) {
                    mysqlconnection.query('SELECT users.first_name,users.last_name,users.image,c_comments.briff_id,c_comments.id,c_comments.title,c_comments.message,c_comments.thumbnail,c_comments.type,c_comments.user_id,c_comments.parent_id,c_comments.created FROM c_comments left join users on c_comments.user_id = users.id where c_comments.briff_id = ? and c_comments.is_delete=? and c_comments.parent_id=?', [req.query.briff_id, 0, row1[i].id], (err, row2) => {
                        mysqlconnection.query('SELECT count(*) as likes from c_favourites inner join c_comments on c_favourites.briff_id = c_comments.id where c_comments.parent_id = ? and c_favourites.briff_id = ?', [0, row1[i].id], (err, row3) => {
                            row1[i].likes = row3[0].likes;


                            mysqlconnection.query('SELECT * from c_favourites inner join c_comments on c_favourites.briff_id = c_comments.id where c_comments.parent_id = ? and c_favourites.briff_id = ? and c_favourites.user_id = ?', [0, row1[i].id, req.query.user_id], (err, row4) => {
                                if (row4.length > 0) {
                                    row1[i].likedbyme = true;

                                }
                                else {
                                    row1[i].likedbyme = false;

                                }

                                row1[i].comments = row2;

                                if (row1.length - 1 == i || row1.length == 1) {
                                    res.send({
                                        status: 'true',
                                        interactions: row1,
                                        message: 'success'
                                    })


                                }

                            })
                        })
                    })
                }

            }
            else {
                res.send({
                    status: 'false',
                    interactions: [],
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







module.exports = router;