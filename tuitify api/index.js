const express = require('express');
const mysql = require('mysql');
var nodemailer = require('nodemailer');
var array = [];
const { getVideoDurationInSeconds } = require('get-video-duration');
const { Issuer } = require('openid-client');
const bcrypt = require('node-php-password');
const briffs = require('./briffs');
var request = require('request');
var b1 = [];
var aa1 = [];
var bb1 = [];
var cc1 = [];
var ex11 = false;


var moment = require('moment');
var date = moment().subtract(3, 'months').format("YYYY-MM-D hh:mm:ss");

var app = express();
app.use('/comm', briffs);

const bodyparser = require('body-parser');
const { query } = require('express');

//const http = require('http').Server(app);


//const https = require('https');
//const io = require('socket.io')(https);
//const fs = require('fs');
//const options = {
//	key: fs.readFileSync('/home/ubuntu/node-js-api/tuitify api/cert.pem'),
//cert: fs.readFileSync('/home/ubuntu/node-js-api/tuitify api/key.pem')
//
//};
//app.listen(3000);
//https.createServer(options,app).listen(3000);



app.use(bodyparser.json());
var keyword;
var mysqlconnection;
var parent = mysql.createConnection({

    host: 'platforms.cmhrlqyttr3o.us-east-2.rds.amazonaws.com',
    user: 'platforms',
    password: 'platforms',
    database: 'platforms',
    port: '3306'

});
parent.connect((err) => {
    if (!err) {
        console.log("platforms database is connected successfuly");
    } else {
        console.log('platforms database not connected because: ' + err);
    }
});

app.get('/getplat', (req, res) => {
    var sql = "SELECT name,logo,link,platform_id,button_color,aws_link,term1,term2 FROM platforms where private_platform=1 and status=0";
    parent.query(sql, (err, rows, _fields) => {
        var sql = "SELECT name,logo,link,platform_id,button_color,aws_link,term1,term2 FROM platforms where private_platform=0 and status=0";
        parent.query(sql, (err, rows1, _fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    public_platforms: rows1,
                    private_platforms: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    public_platforms: [],
                    private_platforms: [],
                    error: err,
                    message: 'error'
                });
            }

        })
    })

})
app.get('/awee?', (req, res) => {
    console.log('hello ji');

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT quiz_questions.id as question_id,chapters.title,chapters.id,quiz_questions.user_id,quiz_questions.quiz_id,quiz_questions.question,quiz_questions.question_type,quiz_questions.created,quizzes.timer,quizzes.seconds FROM quiz_questions left join quizzes on quiz_questions.quiz_id = quizzes.id left join chapters on quiz_questions.chapter_id = chapters.id where quiz_questions.tutorial_id = ? and quiz_questions.chapter_id = ?', [req.query.tutorial_id, req.query.chapter_id], (err, row) => {
            console.log(err);
            console.log(row);
            if (row.length > 0) {
                for (let i = 0; i < row.length; i++) {

                    mysqlconnection.query('SELECT quiz_options.id as answer_id,quiz_options.answer,quiz_options.correct_answer FROM quiz_options where quiz_options.question_id=?', [row[i].question_id], (err, row1) => {
                        console.log(err);
                        row[i].options = row1;

                        if (row.length - 1 == i || row.length == 1) {

                            res.send({

                                status: 'true',
                                quiz: row

                            })

                        }
                    })


                }


            }
            else {
                res.send({

                    status: 'failed',
                    quiz: []

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

//platform detail

app.get('/plat_detail?', (req, res) => {

    parent.query("SELECT name,logo,link,platform_id,button_color,aws_link,private_platform FROM platforms where name=?", [req.query.name], (err, row) => {

        if (row.length > 0) {
            res.send({
                status: 'true',
                platform_detail: row,
                message: 'success'
            });
        } else {
            res.send({
                status: 'false',
                platform_detail: [],
                message: 'error'
            });
        }

    })
})


//end


app.get('/setplat', (req, res) => {

    plat(req.query.name);
    res.send({
        status: 'true',
        message: 'set platfrom true'
    })
})

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



const https = require('http');
const fs = require('fs');

const options = {
    //	key: fs.readFileSync('/etc/letsencrypt/live/fbtnodeapi.tuitify.com/privkey.pem'),
    //	cert: fs.readFileSync('/etc/letsencrypt/live/fbtnodeapi.tuitify.com/fullchain.pem')
};

var a = app.listen(3000);

const io = require('socket.io')(a);


//var socket = io.connect('https://fbtnodeapi.tuitify.com:3000/', {reconnect: true});


// http.listen(3000, () => console.log('server is runinning on 3000'));



// 1-> Public and private platform API with JSON response (along with unique token)
app.get('/getplatforms?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);
        var sql = "SELECT appearances.logo, platforms.id, platforms.name FROM ((appearances INNER JOIN platforms ON platforms.id = appearances.platform_id)) where platforms.private_platform=1";
        mysqlconnection.query(sql, (err, rows, _fields) => {
            var sql = "SELECT appearances.logo, platforms.id, platforms.name FROM ((appearances INNER JOIN platforms ON platforms.id = appearances.platform_id)) where platforms.private_platform=0";
            mysqlconnection.query(sql, (err, rows1, _fields) => {

                if (!err) {
                    res.send({
                        status: 'true',
                        public_platforms: rows1,
                        private_platforms: rows,
                        message: 'success'
                    });
                } else {
                    res.send({
                        status: 'false',
                        public_platforms: [],
                        private_platforms: [],
                        error: err,
                        message: 'error'
                    });
                }

            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

// 1.1 get all getplatforms with id

app.get('/getplatform_app?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT appearances.logo, appearances.background_image, appearances.button_color, appearances.button_color, appearances.connection_image, platforms.id, platforms.name FROM ((appearances INNER JOIN platforms ON platforms.id = appearances.platform_id)) where platforms.id = ?";
        mysqlconnection.query(sql, [req.query.id], (err, rows, _fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    platforms: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    platforms: [],
                    error: err,
                    message: 'error'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});


//end

// 1.2->update platform 
app.put('/platformupdate?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = 'UPDATE users SET users.platform_id=? WHERE users.id=?';
        mysqlconnection.query(sql, [req.query.platform_id, req.query.id], (err, rows, fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    platform: 'updated',
                    message: 'platform successfuly updated'
                });
            } else {
                res.send({
                    status: 'false',
                    plaform: 'not updated',
                    error: err,
                    message: 'platform not updated'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

// 2-> Simple login API with JSON response  params(1.Email 2.Password)

app.get('/getlogin?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT * FROM users where email = ?";
        mysqlconnection.query(sql, [req.query.email], (err, ro, _fields) => {

            if (ro.length > 0) {

                mysqlconnection.query("SELECT * FROM users where email = ? and platform_id=?", [req.query.email, req.query.platform_id], (err, rows, _fields) => {
                    if (rows.length > 0) {
                        console.log(rows[0].id);


                        if (bcrypt.verify(req.query.password, rows[0].password)) {
                            console.log('matched');

                            const d = moment().format("YYYY-MM-D hh:mm:ss");

                            mysqlconnection.query('insert into app_logs (email,login_time) values(?,?)', [req.query.email, d], (err, roww) => {
                                console.log(err);
                                var sql = "UPDATE users SET is_online = ? WHERE email= ?";
                                mysqlconnection.query(sql, [1, req.query.email], (err, rows1, _fields) => {
                                    mysqlconnection.query("SELECT group_id FROM group_users where user_id = ?", [rows[0].id], (err, row1211) => {
                                        console.log(err);
                                        // console.log(row1211);

                                        if (row1211.length > 0) {
                                            rows[0].group_id = row1211;
                                            if (!err) {
                                                res.send({
                                                    status: 'true',
                                                    user: rows,
                                                    message: 'success'
                                                });
                                            }

                                        } else {
                                            let abcd = [];
                                            console.log('ww');
                                            mysqlconnection.query("SELECT group_id FROM tutorial_groups where user_id = ?", [rows[0].id], (err, row12114) => {
                                                console.log(err);
                                                abcd = row12114;
                                                if (row12114.length > 0) {
                                                    console.log(row12114);

                                                    rows[0].group_id = row12114;

                                                }
                                                else {
                                                    abcd = [];
                                                    console.log('ww2');

                                                    rows[0].group_id = [];
                                                }

                                                console.log(abcd);
                                                if (!err) {
                                                    res.send({
                                                        status: 'true',
                                                        user: rows,
                                                        message: 'success'
                                                    });
                                                }

                                            })

                                        }
                                    })

                                })

                            })
                        }
                        else {
                            res.send({
                                status: 'false',
                                users: [],
                                group: [],
                                error: err,
                                message: 'You have entered a Wrong Password'
                            });
                        }

                    }
                    else {
                        res.send({
                            status: 'false',
                            users: [],
                            group: [],
                            error: err,
                            message: 'You are not Authorized to Access this Platform'
                        });
                    }
                })
            } else {
                res.send({
                    status: 'false',
                    users: [],
                    group: [],
                    error: err,
                    message: 'User does not exist'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

// 2.1-> logout 
app.get('/getlogout?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT * FROM users where id = ?";
        mysqlconnection.query(sql, [req.query.id], (err, rows, _fields) => {

            if (rows.length > 0) {
                const d = moment().format("YYYY-MM-D hh:mm:ss");
                mysqlconnection.query('update app_logs set logout_time = ? where email = ?', [d, rows[0].email], (err, ro) => {


                    var sql = "UPDATE users SET is_online = ? WHERE id = ?";
                    mysqlconnection.query(sql, [0, req.query.id], (err, rows1, _fields) => {
                        if (!err) {
                            res.send({
                                status: 'true',
                                user: 'logout',
                                message: 'success'
                            });
                        }
                    })
                })
            } else {
                res.send({
                    status: 'false',
                    users: [],
                    error: err,
                    message: 'error'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//online users
app.get('/user_online_offline?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);
        mysqlconnection.query('select id,first_name,last_name,username,image,is_online from users where is_online=1 and platform_id=?', [req.query.id], (err, row) => {
            mysqlconnection.query('select id,first_name,last_name,username,image,is_online from users where is_online=0 and platform_id=?', [req.query.id], (err, row1) => {

                if (row.length > 0 || row1.length > 0) {

                    res.send({
                        status: 'true',
                        online: row,
                        ofline: row1
                    })

                }
                else {
                    res.send({
                        status: 'false',
                        online: [],
                        ofline: []
                    })
                }

            })

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end


// 3-> Forgot password API with JSON response	params(1.Email)

app.get('/forgetpassword?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT * FROM users where email = ?";
        mysqlconnection.query(sql, [req.query.email], (err, rows) => {
            if (!err) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'digitalinnovation13@gmail.com',
                        pass: 'Allahisgreate'
                    }
                });

                var mailOptions = {
                    from: 'digitalinnovation13@gmail.com',
                    to: req.query.email,
                    subject: 'Forget password by tutify',
                    html: '<table id="m_5883478822647105965background-table" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td align="center" bgcolor="#EEEEEE"><table style="margin:0 10px" border="0" cellpadding="0" cellspacing="0" width="640"><tbody><tr><td height="60" width="640"></td></tr><tr><td width="640"><table id="m_5883478822647105965top-bar" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="640" style="background-position:0 100px;height:80px;overflow:hidden"><tbody><tr><td width="1"></td><td align="left" valign="middle"><h1 style="color:rgb(255,255,255);vertical-align:middle;margin:0px;padding:0px"><img style="margin-left:10px" align="left" height="50px" alt=""></h1></td></tr></tbody></table></td></tr><tr id="m_5883478822647105965simple-content-row"><td bgcolor="#fafafa" width="640"><table border="0" cellpadding="0" cellspacing="0" width="640"><tbody><tr><td>&nbsp;</td></tr><tr><td width="30"></td><td width="580">Hello <a href="mailto:70067298@student.uol.edu.pk" target="_blank">' + rows[0].first_name + ' ' + rows[0].last_name + '</a>!<br><br>A request was made&nbsp;to change your password, you can do this through the link below.<br><br><a href="https://resetpassword://" target="_blank">Change Password</a><br><br>If you did not make this&nbsp;request, please ignore this email.<br><br>Your password will not&nbsp;change until you access the link above and create a new one.<br></td><td width="30"></td></tr></tbody></table></td></tr><tr><td bgcolor="#ffffff" height="15" width="640"></td></tr><tr><td height="60" width="640"></td></tr></tbody></table></td></tr></tbody></table>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.send({
                    status: 'true',
                    mail: 'sent',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    mail: 'not sent',
                    error: err,
                    message: 'error'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

// 4-> Update password API with JSON response	params(1.Password 2.email)

app.put('/getupdate?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);
        var hash = bcrypt.hash(req.query.password);

        var sql = 'UPDATE users SET users.password=? WHERE users.id=?';
        mysqlconnection.query(sql, [hash, req.query.id], (err, rows, fields) => {
            if (!err) {
                res.send({
                    status: 'true',
                    user: 'updated',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    users: 'not updated',
                    error: err,
                    message: 'error'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end
//tuity likes

app.post('/insert_like?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);
        if (req.query.like == 1) {
            mysqlconnection.query('insert into favorites (platform_id,user_id,tutorial_id,created) values(?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.date], (err, row) => {
                console.log(err);

                if (!err) {
                    socket_liked(req.query.name, req.query.p_id, req.query.u_id, req.query.t_id, req.query.date);
                    mysqlconnection.query('SELECT count(*) as count FROM favorites where tutorial_id = ? and platform_id = ?', [req.query.t_id, req.query.p_id], (err, row56789) => {
                        console.log(err);
                        console.log(row56789);

                        res.send({
                            status: 'true',
                            total: row56789[0].count,
                            message: 'liked'
                        });
                    })

                }
                else {
                    res.send({
                        status: 'false',
                        message: 'failed'
                    });

                }
            })

        }
        else {

            mysqlconnection.query('delete from favorites where platform_id=? and user_id=? and tutorial_id=?', [req.query.p_id, req.query.u_id, req.query.t_id], (err, row) => {

                if (!err) {
                    mysqlconnection.query('SELECT count(*) as count FROM favorites where tutorial_id = ? and platform_id = ?', [req.query.t_id, req.query.p_id], (err, row56789) => {

                        res.send({
                            status: 'true',
                            total: row56789[0].count,
                            message: 'dislike'
                        });
                    })

                }
                else {
                    res.send({
                        status: 'false',
                        message: 'failed'
                    });

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



//tuity views
app.post('/tuity_views1?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);
        const c_date = moment().format("YYYY-MM-D hh:mm:ss");
        const c_d = moment().format("ddd-MMM-DD-YYYY");

        //completion logic
        mysqlconnection.query('SELECT * FROM user_tutorial_chapter_views where tutorial_id=? and chapter_id=? and user_id=?', [req.query.t_id, req.query.chapter_id, req.query.u_id], (err, row321) => {
            console.log(err);
            if (row321.length > 0) {
                console.log('ompletion rate nhi calculate ho ga')
            }
            else {
                mysqlconnection.query('insert into user_tutorial_chapter_views (user_id,chapter_id,tutorial_id) values(?,?,?)', [req.query.u_id, req.query.chapter_id, req.query.t_id], (err, roe1211) => {
                    console.log(err);
                    mysqlconnection.query('SELECT * FROM user_tutorial_chapter_views where tutorial_id=? and user_id=?', [req.query.t_id, req.query.u_id], (err, row32121) => {
                        console.log(err);
                        mysqlconnection.query('SELECT * FROM TuitifyXelorDemo.chapters where tutorial_id=?', [req.query.t_id], (err, row321212) => {
                            console.log(err);

                            var aaa = row32121.length;
                            var bbb = row321212.length;
                            var compl = (aaa / bbb) * 100;
                            console.log(compl);
                            console.log(aaa);
                            console.log(bbb);
                            mysqlconnection.query('SELECT * FROM user_tutorial_progresses where tutorial_id=? and user_id=?', [req.query.t_id, req.query.u_id], (err, row31221) => {
                                console.log(err);
                                if (row31221.length > 0) {
                                    console.log('update ho ga comp');

                                    mysqlconnection.query('update user_tutorial_progresses set progress = ? where tutorial_id = ? and user_id = ? ', [compl, req.query.t_id, req.query.u_id], (err, roe121211121) => {
                                        console.log(err);
                                    })
                                } else {
                                    console.log('insert ho ga comp');
                                    mysqlconnection.query('insert into user_tutorial_progresses (platform_id,user_id,tutorial_id,progress,avg_percentage) values(?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, compl, 0], (err, roe121211) => {
                                        console.log(err);
                                    })
                                }
                            })
                        })
                    })
                })
            }
        })
        //end       


        mysqlconnection.query('insert into view_logs (platform_id,tutorial_id,chapter_id,user_id,created) values(?,?,?,?,?)', [req.query.p_id, req.query.t_id, req.query.chapter_id, req.query.u_id, c_date], (err, ro) => {

            if (!err) {




                mysqlconnection.query('SELECT progress FROM user_tutorial_progresses where user_id=? and tutorial_id=?', [req.query.u_id, req.query.t_id], (err, row234151) => {
                    if (row234151.length > 0) {

                        res.send({
                            status: 'true',
                            message: 'viewed',
                            completion: row234151[0].progress

                        });
                    } else {

                        res.send({
                            status: 'true',
                            message: 'viewed',
                            completion: 0

                        });
                    }

                })

            }
            else {
                res.send({
                    status: 'false',
                    message: 'failed',
                    completion: 0

                });

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





// 5-> Simple Register API with JSON response params (1.Name 2.Email 3.Password)


app.post('/registeruser?', (req, res) => {
    //plat(req.query.name);
    let emp = req.query;
    if (emp.name !== '') {

        plat(emp.name);
        var sql = "SELECT * FROM users where email = ? or username=?";
        mysqlconnection.query(sql, [emp.email, emp.user_name], (err, rows, _fields) => {

            if (rows.length > 0) {
                res.send({
                    status: 'false',
                    user: 'already exist',
                    message: 'fail'
                });
            }
            else {
                var hash = bcrypt.hash(emp.password);

                var sql = 'INSERT into users(platform_id,role_id,first_name,last_name,username,password,email,status) values(?,?,?,?,?,?,?,?)'
                mysqlconnection.query(sql, [emp.platform_id, '3', emp.first_name, emp.last_name, emp.user_name, hash, emp.email, '1'], (err, rows, fields) => {

                    if (!err) {
                        res.send({
                            status: 'true',
                            user: 'inserted',
                            message: 'success'
                        });
                    } else {
                        res.send({
                            status: 'false',
                            user: 'not inserted',
                            error: err,
                            message: 'error'
                        });
                    }

                })
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end


// 6-> Main page screen API with JSON response 
// 1.	Recommended topics (The equivalent of top Tuities of the web) 
// 2.	Trending now (Recently Added)
app.get('/getrecomend?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT id,title,image from categories', (err, rows) => {
            // mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.created>"' + date + '" and tutorials.share_with_publishers=2 and tutorials.status=1', (err, row1) => {
            mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.modified as created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.modified DESC', (err, row1) => {

                mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.category_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.modified as created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.share_with_publishers=2 and tutorials.status=1 ORDER BY tutorials.avg_rating DESC', (err, row2) => {
                    // mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.category_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.avg_rating>=2.5 and tutorials.share_with_publishers=2 and tutorials.status=1', (err, row2) => {
                    mysqlconnection.query('SELECT tutorials.total_views as a,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id], (err, row11) => {
                        var a = row11;
                        mysqlconnection.query('SELECT tutorials.total_views as b,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, a[0].a], (err, row12) => {
                            var b = row12;
                            mysqlconnection.query('SELECT tutorials.total_views as c,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, b[0].b], (err, row13) => {
                                var c = row13;
                                mysqlconnection.query('SELECT tutorials.total_views as d,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, c[0].c], (err, row14) => {
                                    var d = row14;
                                    mysqlconnection.query('SELECT tutorials.total_views as e,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, d[0].d], (err, row15) => {
                                        const e = row15;

                                        mysqlconnection.query('select id,title,description,image from categories where status=1 and platform_id=? order by ordernumber ASC', [req.query.platform_id], (err, top) => {

                                            mysqlconnection.query('SELECT tutorials.total_views,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON users.id = tutorials.user_id WHERE tutorials.id=716', (err, first) => {


                                                if (top.length > 0 || rows.length > 0 || row1.length > 0 || row2.length > 0 || first.length > 0) {
                                                    res.send({
                                                        status: 'true',
                                                        first: first,
                                                        categories: rows,
                                                        recently_added: row1,
                                                        toppics: row2,
                                                        recomend: top,
                                                        top_tutorials: a.concat(b).concat(c).concat(d).concat(e),
                                                        message: 'success'
                                                    });
                                                } else {
                                                    res.send({
                                                        status: 'false',
                                                        first: [],
                                                        categories: [],
                                                        recently_added: [],
                                                        toppics: [],
                                                        recomend: [],
                                                        top_tutorials: [],
                                                        message: 'fail'
                                                    });
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

// cme claimed

app.post('/cme_claim?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        
        mysqlconnection.query('insert into claimed (user_id,tutorial_id,is_claimed,is_pass,created,modified) values(?,?,?,?,?,?)', [req.query.user_id,req.query.tutorial_id,0,req.query.is_pass,req.query.date,req.query.date], (err, row1) => {
  
                if (!err) {
                    res.send({
                        status: 'true',
                        message: 'success'
                    });
                } else {
                    res.send({
                        status: 'false',
                        message: 'fail'
                    });
                }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});


//end


//get data by category id


app.get('/getcategorydata?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        // mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials LEFT JOIN users ON users.id = tutorials.user_id WHERE tutorials.created>"' + date + '" and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.category_id=? and tutorials.platform_id=?', [req.query.category_id, req.query.platform_id], (err, row1) => {

        //     mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials LEFT JOIN users ON users.id = tutorials.user_id WHERE tutorials.avg_rating>=2.5 and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.category_id=? and tutorials.platform_id=?', [req.query.category_id, req.query.platform_id], (err, row2) => {

        mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials LEFT JOIN users ON users.id = tutorials.user_id WHERE tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.category_id=? and tutorials.platform_id=? order by tutorials.created desc', [req.query.category_id, req.query.platform_id], (err, row1) => {

            mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials LEFT JOIN users ON users.id = tutorials.user_id WHERE tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.category_id=? and tutorials.platform_id=? order by tutorials.avg_rating desc', [req.query.category_id, req.query.platform_id], (err, row2) => {

                if (row1.length > 0 || row2.length > 0) {
                    res.send({
                        status: 'true',
                        recently_added: row1,
                        toppics: row2,
                        message: 'success'
                    });
                } else {
                    res.send({
                        status: 'false',
                        recently_added: [],
                        toppics: [],
                        message: 'fail'
                    });
                }
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end



// 6.1 -> Main page screen API with JSON response 
// 1.	Recommended topics (The equivalent of top Tuities of the web) 
// 2.	Trending now (Recently Added) 
// by category id

app.get('/getrecomendbycategory?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        // mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.created>"' + date + '" AND tutorials.category_id = ? and tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1', [req.query.id, req.query.platform_id], (err, row1) => {
        //     mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.avg_rating>=2.5 AND tutorials.category_id = ? and tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1', [req.query.id, req.query.platform_id], (err, row2) => {


        mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.category_id = ? and tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.created desc', [req.query.id, req.query.platform_id], (err, row1) => {
            mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from ((tutorials INNER JOIN users ON users.id = tutorials.user_id)) WHERE tutorials.category_id = ? and tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.avg_rating desc', [req.query.id, req.query.platform_id], (err, row2) => {



                if (row2.length > 0) {
                    res.send({
                        status: 'true',
                        recently_added: row1,
                        toppics: row2,
                        message: 'success'
                    });
                } else {
                    res.send({
                        status: 'fail',
                        recently_added: [],
                        toppics: [],
                        message: 'fail'
                    });
                }
            })

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end


//checking user following to other profile


app.get('/checkfollow?', (req, res) => {

    if (!req.query.name == '') {


        plat(req.query.name);

        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [req.query.id, req.query.myId], (err, row1) => {
            // console.log(row1);
            if (!err) {
                mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [req.query.myId, req.query.id], (err, row2) => {
                    // console.log(row2);
                    if (!err) {

                        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=0', [req.query.myId, req.query.id], (err, row4) => {
                            // console.log(row4);
                            if (!err) {

                                var con1 = row1.concat(row2);
                                var con2 = con1.concat(row4);
                                // console.log(con1);
                                // console.log(con2);
                                if (con2.length > 0) {

                                    res.send({
                                        status: 'true',
                                        followstatus: true,
                                    })
                                }
                                else {
                                    res.send({
                                        status: 'false',
                                        followstatus: false,
                                    })
                                }


                            }

                        })

                    }

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



//user profile details and tuties 
app.get('/userdetailtutie?', (req, res) => {

    if (!req.query.name == '') {


        plat(req.query.name);

        mysqlconnection.query('SELECT id,first_name,last_name,description,email,image from users WHERE id=? and platform_id=?', [req.query.id, req.query.platform_id], (err, rows) => {
            if (rows.length > 0) {
                mysqlconnection.query('SELECT tutorials.id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name from tutorials left join users on users.id=tutorials.user_id WHERE tutorials.user_id=? and tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1', [req.query.id, req.query.platform_id], (err, row11) => {
                    if (!err) {



                        // console.log(ex11);
                        // var c4=null;
                        mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from users INNER JOIN followers on followers.followed_to=users.id where followers.followed_by=? and followers.status=0', [req.query.id], (err, row1) => {
                            if (!err) {
                                mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from users INNER JOIN followers on followers.followed_to=users.id where followers.followed_by=? and followers.status=1', [req.query.id], (err, row2) => {
                                    if (!err) {
                                        // console.log('2ND');

                                        mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from users INNER JOIN followers on followers.followed_by=users.id where followers.followed_to=? and followers.status=1', [req.query.id], (err, row3) => {
                                            if (!err) {
                                                const aaa = row1.concat(row2)
                                                b1 = aaa.concat(row3);
                                                mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=0', [req.query.id], (err, row111) => {
                                                    if (!err) {
                                                        mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=1', [req.query.id], (err, row222) => {
                                                            if (!err) {
                                                                mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=1', [req.query.id], (err, row333) => {
                                                                    if (!err) {
                                                                        const bbb = row111.concat(row222);


                                                                        res.send({
                                                                            status: 'true',
                                                                            detail: rows,
                                                                            tuties: row11,
                                                                            follow_status: ex11,
                                                                            following: b1,
                                                                            followers: bbb.concat(row333),
                                                                            message: 'success'
                                                                        });
                                                                    }

                                                                })

                                                            }


                                                        })

                                                    }

                                                })

                                            }
                                            else {
                                                b1 = [];

                                            }

                                        })

                                    }
                                })
                            }
                        })

                    } else {
                        res.send({
                            status: 'fail',
                            detail: [],
                            tuties: [],
                            follow_status: false,
                            following: [],
                            followers: [],
                            message: 'fail'
                        });
                    }

                })
            }
            else {
                res.send({
                    status: 'fail',
                    detail: [],
                    tuties: [],
                    following: [],
                    followers: [],
                    message: 'fail'
                });

            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end


//recommended topics and trending now and categories of login
app.get('/getrecomenduser?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT id,title,image from categories where platform_id=?', [req.query.platform_id], (err, rows) => {

            // mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.user_id,tutorials.category_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON (users.id = tutorials.user_id) WHERE tutorials.platform_id=users.platform_id and users.platform_id=? and tutorials.status=1 and tutorials.audience_id=1 and tutorials.search_visible=1 ', [req.query.platform_id], (err, row1) => {

            //     mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorials.category_id,tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON (users.id = tutorials.user_id) WHERE tutorials.platform_id=users.platform_id AND tutorials.avg_rating>3.5 AND users.platform_id=? and tutorials.total_views>0 and tutorials.status=1', [req.query.platform_id], (err, row2) => {

            mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorial_groups.group_id,tutorials.user_id,tutorials.category_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.modified as created,users.first_name,users.last_name,users.image from tutorials INNER JOIN users ON (users.id = tutorials.user_id) left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id WHERE tutorials.platform_id=users.platform_id and users.platform_id=?  and tutorials.status=1 and tutorials.audience_id=1 and tutorials.search_visible=1 ', [req.query.platform_id], (err, row1) => {

                mysqlconnection.query('SELECT tutorials.id as "tutorial_id",tutorial_groups.group_id,tutorials.category_id,tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.modified as created,users.first_name,users.last_name,users.image from tutorials INNER JOIN users ON (users.id = tutorials.user_id) left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id WHERE tutorials.platform_id=users.platform_id AND users.platform_id=? and tutorials.avg_rating>3.5 and tutorials.total_views>0 and tutorials.status=1 order by tutorials.total_views desc', [req.query.platform_id], (err, row2) => {

                    mysqlconnection.query('SELECT tutorials.total_views as a,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id], (err, row11) => {
                        var a = row11;
                        mysqlconnection.query('SELECT tutorials.total_views as b,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, a[0].a], (err, row12) => {
                            var b = row12;
                            mysqlconnection.query('SELECT tutorials.total_views as c,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, b[0].b], (err, row13) => {
                                var c = row13;
                                mysqlconnection.query('SELECT tutorials.total_views as d,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, c[0].c], (err, row14) => {
                                    var d = row14;
                                    mysqlconnection.query('SELECT tutorials.total_views as e,tutorials.platform_id,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON tutorials.user_id=users.id where tutorials.platform_id=? and tutorials.total_views<? and tutorials.share_with_publishers=2 and tutorials.status=1 order by tutorials.total_views desc limit 1', [req.query.platform_id, d[0].d], (err, row15) => {
                                        const e = row15;

                                        mysqlconnection.query('select id,title,description,image from categories where status=1 and platform_id=? order by ordernumber ASC', [req.query.platform_id], (err, top) => {

                                            mysqlconnection.query('SELECT tutorials.total_views,tutorials.id as "tutorial_id",tutorials.user_id,tutorials.title,tutorials.thumbnail,tutorials.avg_rating,tutorials.created,users.first_name,users.last_name,users.image from tutorials left JOIN users ON users.id = tutorials.user_id WHERE tutorials.id=716', (err, first) => {



                                                if (top.length > 0 || rows.length > 0 || row1.length > 0 || row2.length > 0 || first.length > 0) {
                                                    res.send({
                                                        status: 'true',
                                                        first: first,
                                                        categories: rows,
                                                        recently_added: row1,
                                                        topics: row2,
                                                        recomend: top,
                                                        top_tutorials: a.concat(b).concat(c).concat(d).concat(e),
                                                        message: 'success'
                                                    });
                                                } else {
                                                    res.send({
                                                        status: 'fail',
                                                        first: [],
                                                        categories: [],
                                                        recently_added: [],
                                                        topics: [],
                                                        recomend: [],
                                                        top_tutorials: [],
                                                        message: 'fail'
                                                    });
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//user profile details and tuties 
app.get('/mytuties?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT id,user_id,description,thumbnail,video_thumbnail,media_type,avg_rating,language from tutorials WHERE user_id=? and platform_id=?', [req.query.id, req.query.platform_id], (err, rows) => {
            if (rows.length > 0) {
                res.send({
                    status: 'true',
                    tuties: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'fail',
                    tuties: rows,
                    message: 'fail'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//any user profile details 
app.get('/anyuserdata?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT first_name,last_name,image FROM users where id=?', [req.query.id], (err, rows) => {
            if (rows.length > 0) {
                mysqlconnection.query("SELECT group_id FROM group_users where user_id = ?", [req.query.id], (err, row1211) => {
                    console.log(err);
                    // console.log(row1211);

                    if (row1211.length > 0) {
                        rows[0].group_id = row1211;
                        if (!err) {
                            res.send({
                                status: 'true',
                                user: rows,
                                message: 'success'
                            });
                        }

                    } else {
                        let abcd = [];
                        console.log('ww');
                        mysqlconnection.query("SELECT group_id FROM tutorial_groups where user_id = ?", [req.query.id], (err, row12114) => {
                            console.log(err);
                            abcd = row12114;
                            if (row12114.length > 0) {
                                console.log(row12114);

                                rows[0].group_id = row12114;

                            }
                            else {
                                abcd = [];
                                console.log('ww2');

                                rows[0].group_id = [];
                            }

                            console.log(abcd);
                            if (!err) {
                                res.send({
                                    status: 'true',
                                    user: rows,
                                    message: 'success'
                                });
                            }

                        })

                    }
                })

            } else {
                res.send({
                    status: 'fail',
                    user: [],
                    message: 'fail'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//delete tuties
app.delete('/deletetuties?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('delete FROM tutorials WHERE id=? AND user_id=?', [req.query.id, req.query.user_id], (err, rows, fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    tuty: 'deleted',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'fail',
                    tuty: 'not deleted',
                    message: 'fail'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//get notifications
app.get('/notifications?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT users.first_name, users.last_name, users.image, notifications.id, notifications.message, notifications.from_user_id, notifications.created, notifications.is_read FROM ((notifications INNER JOIN users ON users.id = notifications.from_user_id)) where notifications.user_id = ? and notifications.platform_id=?";
        mysqlconnection.query(sql, [req.query.user_id, req.query.platform_id], (err, rows, _fields) => {

            if (rows.length > 0) {
                res.send({
                    status: 'true',
                    notification: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    notification: [],
                    message: 'error'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//get tuity wit id 
app.get('/playtuity?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT * FROM tutorials Where id = ? and platform_id=?";
        mysqlconnection.query(sql, [req.query.id, req.query.platform_id], (err, rows, _fields) => {

            if (rows.length > 0) {
                res.send({
                    status: 'true',
                    tuities: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    tuities: [],
                    message: 'error'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//get expire notifications
app.get('/expirenotifications?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "UPDATE notifications SET is_read = ? WHERE id = ?";
        mysqlconnection.query(sql, [1, req.query.id], (err, rows, _fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    notification: 'expire',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    notification: 'not expire',
                    message: 'error'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//insert contact us 
app.post('/postcontact?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        let emp = req.query;
        var sql = 'INSERT into contact(user_id,full_name,email,comment,platform_id) values(?,?,?,?,?)';
        mysqlconnection.query(sql, [emp.id, emp.user, emp.email, emp.comment, emp.platform_id], (err, _rows, _fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    contact: 'inserted',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    contact: 'not inserted',
                    message: 'error'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//delete comment

app.delete('/deletecomment?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('delete from comments where id=?', [req.query.id], (err, row) => {
            if (!err) {
                res.send({
                    status: 'true',
                    message: 'deleted'
                });

            }
            else {
                res.send({
                    status: 'false',
                    message: 'not deleted'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end

//edit comment
app.put('/editcomment?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query("update comments set comment=? where id=?", [req.query.comment, req.query.id], (err, row) => {
            if (!err) {
                res.send({
                    status: 'true',
                    message: 'updated'
                });

            }
            else {
                res.send({
                    status: 'false',
                    message: 'not updated'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end


//insert comment on tuity
app.post('/postcomment?', (req, res) => {

    let emp = req.query;

    if (!emp.name == '') {


        plat(emp.name);
        socket_comment(emp.name, emp.p_id, emp.u_id, emp.t_id, emp.date);
        var sql = 'INSERT into comments(platform_id,user_id,tutorial_id,comment,created,modified) values(?,?,?,?,?,?)';
        mysqlconnection.query(sql, [emp.p_id, emp.u_id, emp.t_id, emp.comment, emp.date, emp.date], (err, _rows, _fields) => {

            if (!err) {
                res.send({
                    status: 'true',
                    comment: 'inserted',
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    comment: 'not inserted',
                    message: 'error'
                });
            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end




//get user activity wit user id 
app.get('/useractivity?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        var sql = "SELECT notifications.id,notifications.message,notifications.created,tutorials.title FROM notifications inner join tutorials on notifications.tutorial_id=tutorials.id Where notifications.user_id = ? AND notifications.is_activity=1 and notifications.platform_id=? GROUP BY (created)";
        mysqlconnection.query(sql, [req.query.id, req.query.platform_id], (err, rows, _fields) => {

            if (rows.length > 0) {
                res.send({
                    status: 'true',
                    activities: rows,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'false',
                    activities: [],
                    message: 'error'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end


// //login profile followers

// app.get('/loginfollowers?', (req, res) => {
//     if (!req.query.name == '' & !req.query.id == '') {

//         plat(req.query.name);

//         // res.setHeader('Content-Type', 'text/html');


//                 mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=0', [req.query.id], (err, row1) => {

//                     mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=1', [req.query.id], (err, row2) => {

//                         mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=1', [req.query.id], (err, row3) => {
//                             const a = row1.concat(row2);

//                             var b = a.concat(row3);
//                             //   console.log(b);



//                             if (!b =='') {

//                                 res.send({
//                                     status: 'true',
//                                     followers: b,
//                                     message: 'success'
//                                 });
//                             }
//                             else {
//                                 res.send({
//                                     status: 'fail',
//                                     followers: [],
//                                     message: 'fail'
//                                 });
//                             }



//                         })
//                     })
//                 })

//             }
//     else {
//         res.send({
//             message: 'no platform selected'
//         })
//     }

// })
// //end

// //login profile followers

// app.get('/loginfollowing?', (req, res) => {
//     if (!req.query.name == '' & !req.query.id == '') {

//         plat(req.query.name);

//         // res.setHeader('Content-Type', 'text/html');

//                 mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=0', [req.query.id], (err, row1) => {

//                     mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=1', [req.query.id], (err, row2) => {

//                         mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=1', [req.query.id], (err, row3) => {

//                             const a = row1.concat(row2);

//                             var b = a.concat(row3);
//                             //   console.log(b);



//                             if (!b =='') {

//                                 res.send({
//                                     status: 'true',
//                                     followers: b,
//                                     message: 'success'
//                                 });
//                             }
//                             else {
//                                 res.send({
//                                     status: 'fail',
//                                     followers: [],
//                                     message: 'fail'
//                                 });
//                             }



//                         })
//                     })
//                 })

//             }

//     else {
//         res.send({
//             message: 'no platform selected'
//         })
//     }

// })
// //end








//profile followers
app.get('/userfollowers?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        // res.setHeader('Content-Type', 'text/html');

        mysqlconnection.query('SELECT * from users WHERE id=?', [req.query.id], (err, rows) => {
            if (rows.length > 0) {
                mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=0', [req.query.id], (err, row1) => {
                    console.log(err);
                    //console.log(row1);
                    if (!err) {
                        mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=1', [req.query.id], (err, row2) => {
                            console.log(err);
                            //console.log(row2);
                            mysqlconnection.query('SELECT users.id ,users.first_name,users.last_name,users.image,users.username,followers.status from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=1', [req.query.id], (err, row3) => {
                                console.log(err);
                                //console.log(row3);
                                const a = row1.concat(row2);

                                var b = a.concat(row3);
                                console.log(b);
                                var arr = [];
                                if (b.length > 0) {

                                    console.log('in check');
                                    for (let i = 0; i < b.length; i++) {
                                        console.log('in loop', i);

                                        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [b[i].id, req.query.myId], (err, row11) => {
                                            console.log(row11);
                                            if (!err) {
                                                mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [req.query.myId, b[i].id], (err, row22) => {
                                                    console.log(row22);
                                                    if (!err) {

                                                        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=0', [req.query.myId, b[i].id], (err, row44) => {
                                                            console.log(row44);
                                                            if (row11.length > 0 || row22.length > 0 || row44.length > 0) {

                                                                var con1 = row11.concat(row22);
                                                                var con2 = con1.concat(row44);
                                                                console.log(con2);
                                                                arr.push(con2[0]);
                                                                if (b.length - 1 == i || b.length == 1) {

                                                                    res.send({
                                                                        status: 'true',
                                                                        followers: b,
                                                                        followbyme: arr,
                                                                        message: 'success'
                                                                    });
                                                                }


                                                            }
                                                            else {
                                                                if (b.length - 1 == i || b.length == 1) {
                                                                    if (arr.length > 0) {
                                                                        res.send({
                                                                            status: 'true',
                                                                            followers: b,
                                                                            followbyme: arr,
                                                                            message: 'success'
                                                                        });
                                                                    } else {


                                                                        res.send({
                                                                            status: 'true',
                                                                            followers: b,
                                                                            followbyme: [],
                                                                            message: 'true'
                                                                        });
                                                                    }
                                                                }
                                                            }

                                                        })
                                                    }
                                                })
                                            }
                                        })

                                    }
                                } else {
                                    res.send({
                                        status: 'fail',
                                        followers: [],
                                        followbyme: [],
                                        message: 'fail'
                                    });
                                }
                                //console.log(arr);

                                // res.end();


                            })
                        })
                    } else {
                        res.send({
                            status: 'fail',
                            followers: [],
                            followbyme: [],
                            message: 'fail'
                        });
                    }

                })
            }
            else {
                res.send({
                    status: 'fail',
                    followers: 'user not exist',
                    message: 'fail'
                });

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

//profile following

app.get('/userfollowing?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        // res.setHeader('Content-Type', 'text/html');

        mysqlconnection.query('SELECT * from users WHERE id=?', [req.query.id], (err, rows) => {
            if (rows.length > 0) {
                mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=0', [req.query.id], (err, row1) => {
                    //console.log(err);
                    //console.log(row1); 
                    if (!err) {
                        mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_to where followers.followed_by=? and followers.status=1', [req.query.id], (err, row2) => {
                            //console.log(err);
                            //console.log(row2);
                            mysqlconnection.query('SELECT users.id,users.first_name,users.last_name,users.image,users.username from followers INNER JOIN users on users.id=followers.followed_by where followers.followed_to=? and followers.status=1', [req.query.id], (err, row3) => {
                                // console.log(err);
                                // console.log(row3);                                

                                const a = row1.concat(row2);

                                var b = a.concat(row3);
                                //   console.log(b);
                                var arr = [];
                                if (b.length > 0) {
                                    console.log(b.length);

                                    for (let i = 0; i < b.length; i++) {
                                        console.log(i);
                                        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [b[i].id, req.query.myId], (err, row11) => {
                                            // console.log(row11);
                                            if (!err) {
                                                mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=1', [req.query.myId, b[i].id], (err, row22) => {
                                                    // console.log(row22);
                                                    if (!err) {

                                                        mysqlconnection.query('SELECT * from followers where followers.followed_by=? and followers.followed_to=? and followers.status=0', [req.query.myId, b[i].id], (err, row44) => {
                                                            //console.log(row44);
                                                            if (row11.length > 0 || row22.length > 0 || row44.length > 0) {

                                                                var con1 = row11.concat(row22);
                                                                var con2 = con1.concat(row44);
                                                                //console.log(con2[0]);
                                                                arr.push(con2[0]);
                                                                console.log(arr);
                                                                if (b.length - 1 == i || b.length == 1) {
                                                                    console.log(arr);

                                                                    res.send({
                                                                        status: 'true',
                                                                        following: b,
                                                                        followbyme: arr,
                                                                        message: 'success'
                                                                    });
                                                                }


                                                            }
                                                            else {
                                                                console.log('in else', arr);
                                                                if (b.length - 1 == i || b.length == 1) {
                                                                    if (arr.length > 0) {
                                                                        res.send({
                                                                            status: 'true',
                                                                            following: b,
                                                                            followbyme: arr,
                                                                            message: 'success'
                                                                        });
                                                                    } else {
                                                                        res.send({
                                                                            status: 'false',
                                                                            following: b,
                                                                            followbyme: [],
                                                                            message: 'success'
                                                                        });
                                                                    }

                                                                }
                                                            }

                                                        })
                                                    }
                                                })
                                            }
                                        })

                                    }
                                } else {
                                    res.send({
                                        status: 'fail',
                                        following: [],
                                        followbyme: [],
                                        message: 'fail'
                                    });
                                }
                                //console.log(arr);

                                // res.end();


                            })
                        })
                    } else {
                        res.send({
                            status: 'fail',
                            following: [],
                            followbyme: [],
                            message: 'fail'
                        });
                    }

                })
            }
            else {
                res.send({
                    status: 'fail',
                    followers: 'user not exist',
                    message: 'fail'
                });

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


//comments

app.get('/comments?', (req, res) => {
    if (!req.query.name == '' & !req.query.id == '' & !req.query.platform_id == '') {

        plat(req.query.name);


        mysqlconnection.query('select comments.id as comment_id,users.id as user_id,users.first_name,users.last_name,users.email,users.image,comments.comment,comments.likes,comments.created from comments LEFT JOIN users on users.id=comments.user_id where comments.tutorial_id=? and comments.platform_id=?', [req.query.id, req.query.platform_id], (err, row) => {
            if (row.length > 0) {
                res.send({
                    status: 'true',
                    comment: row,
                    message: 'success'
                });

            }
            else {
                res.send({
                    status: 'false',
                    comment: 'no comment',
                    message: 'fail'
                });

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

app.get('/duration', (req, res) => {

    getVideoDurationInSeconds('https://www.cinemablend.com/videos/mank-interviews-with-amanda-seyfried-lily-collins-tom-pelphrey/2559625/?jwsource=cl').then((duration) => {
        console.log(duration)
    })
});

//comment py comment

app.get('/comment_py_comment?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('select comment_on_comment.id,users.first_name,users.last_name,users.image,comment_on_comment.comment,comment_on_comment.likes,comment_on_comment.created from comment_on_comment INNER JOIN users on users.id=comment_on_comment.user_id where comment_on_comment.comment_id=?', [req.query.id], (err, row) => {
            if (row.length > 0) {
                res.send({
                    status: 'true',
                    comment_on_comment: row,
                    message: 'success'
                });

            }
            else {
                res.send({
                    status: 'false',
                    comment_on_comment: 'no comment py comment',
                    message: 'fail'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//comment py like

app.get('/comment_py_like?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('select likes FROM comments where id=?', [req.query.id], (err, row) => {

            var add = parseInt(row[0].likes) + 1;
            mysqlconnection.query('update comments set likes=? where id=?', [add, req.query.id], (err, row1) => {

                if (!err) {
                    res.send({
                        status: 'true',
                        comments: row,
                        message: 'success'
                    });

                }
                else {
                    res.send({
                        status: 'false',
                        comments: 'no comment py comment',
                        message: 'fail'
                    });

                }
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})


//comment py comment py like

app.get('/comment_py_comment_py_like?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('select likes FROM comment_on_comment where id=?', [req.query.id], (err, row) => {

            var add = parseInt(row[0].likes) + 1;
            mysqlconnection.query('update comment_on_comment set likes=? where comment_on_comment.id=?', [add, req.query.id], (err, row1) => {

                if (!err) {
                    res.send({
                        status: 'true',
                        comment_on_comment: row,
                        message: 'success'
                    });

                }
                else {
                    res.send({
                        status: 'false',
                        comment_on_comment: 'no comment py comment',
                        message: 'fail'
                    });

                }
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})

//main page tuity detail of screen 

app.get('/tuity_detail?', (req, res) => {
    if (!req.query.name == '') {


        plat(req.query.name);


        mysqlconnection.query('select users.first_name,users.last_name,users.image,users.id,tutorials.title,tutorials.introduction,tutorials.media_type,tutorials.description,tutorials.created,tutorials.avg_rating,tutorials.total_views,COUNT(comments.id) as comments, COUNT(favorites.id) as likes from tutorials left JOIN users on users.id=tutorials.user_id left JOIN comments on comments.tutorial_id=tutorials.id left JOIN favorites on favorites.tutorial_id=tutorials.id where tutorials.id=? and tutorials.platform_id=?', [req.query.id, req.query.platform_id], (err, row) => {
            mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,tutorial_medias.type from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.parent_id=0 ORDER BY chapters.id ASC', [req.query.id, req.query.platform_id], (err, row1) => {

                if (row.length > 0) {
                    res.send({
                        status: 'true',
                        tuity: row,
                        chapters: row1,
                        message: 'success'
                    });

                }
                else {
                    res.send({
                        status: 'false',
                        tuity_detail: 'no',
                        message: 'fail'
                    });


                }
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
});

//main page tuity detail of screen 
app.get('/tuity_content?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,tutorial_medias.type from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.parent_id=0 ORDER BY chapters.id ASC', [req.query.id, req.query.platform_id], (err, row) => {
            if (row.length > 0) {
                res.send({
                    status: 'true',
                    tuity_content: row,
                    message: 'success'
                });

            }
            else {
                res.send({
                    status: 'false',
                    tuity_content: [],
                    message: 'fail'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

app.get('/sub_chapters?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,tutorial_medias.type from chapters inner JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.parent_id=?', [req.query.id], (err, row1) => {
            if (row1.length > 0) {
                res.send({
                    status: 'true',
                    sub_chapters: row1,
                    message: 'success'
                });

            }
            else {
                res.send({
                    status: 'false',
                    sub_chapters: [],
                    message: 'fail'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//nect chapter id

app.get('/next_chap?', (req, res) => {
    if (!req.query.name == '') {


        plat(req.query.name);

        mysqlconnection.query('SELECT parent_id FROM chapters where id = ?', [req.query.c_id], (err, row) => {

            if (row[0].parent_id == 0) {

                mysqlconnection.query('SELECT id FROM chapters where parent_id = ? limit 1', [req.query.c_id], (err, row7) => {

                    if (row7.length > 0) {
                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row7[0].id], (err, row8) => {
                            console.log('1');
                            res.send({
                                next: row8,
                                status: 'true'
                            })
                        })
                    } else {
                        mysqlconnection.query('SELECT id FROM chapters where parent_id = ? and id > ? limit 1', [0, req.query.c_id], (err, row9) => {

                            if (row9.length > 0) {
                                mysqlconnection.query('SELECT id FROM chapters where parent_id = ? limit 1', [row9[0].id], (err, row10) => {

                                    if (row10.length > 0) {
                                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row10[0].id], (err, row11) => {
                                            console.log('2');
                                            res.send({
                                                next: row11,
                                                status: 'true'
                                            })
                                        })
                                    } else {
                                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row9[0].id], (err, row12) => {
                                            console.log('3');
                                            res.send({
                                                next: row12,
                                                status: 'true'
                                            })
                                        })

                                    }

                                })

                            }
                            else {
                                res.send({
                                    next: [],
                                    status: 'false'
                                })
                            }
                        })

                    }



                })


            }
            else {

                mysqlconnection.query('SELECT id FROM TuitifyXelorDemo.chapters where parent_id = ? and id > ? limit 1', [row[0].parent_id, req.query.c_id], (err, row1) => {

                    if (row1.length > 0) {
                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row1[0].id], (err, row2) => {
                            console.log('4');
                            res.send({
                                next: row2,
                                status: 'true'
                            })
                        })
                    } else {

                        mysqlconnection.query('SELECT id FROM TuitifyXelorDemo.chapters where parent_id = ? and id > ? limit 1', [0, row[0].parent_id], (err, row3) => {

                            if (row3.length > 0) {
                                mysqlconnection.query('SELECT id FROM TuitifyXelorDemo.chapters where parent_id = ? limit 1', [row3[0].id], (err, row4) => {

                                    if (row4.length > 0) {
                                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row4[0].id], (err, row5) => {
                                            console.log('5');
                                            res.send({
                                                next: row5,
                                                status: 'true'
                                            })
                                        })
                                    } else {
                                        mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type,chapters.parent_id from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.id = ?', [req.query.t_id, req.query.p_id, row3[0].id], (err, row6) => {
                                            console.log('6');
                                            res.send({
                                                next: row6,
                                                status: 'true'
                                            })
                                        })

                                    }

                                })

                            }
                            else {
                                res.send({
                                    next: [],
                                    status: 'false'
                                })
                            }


                        })
                    }
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


//chapters and subchapters mixed
app.get('/chapsubchap?', (req, res) => {
    if (!req.query.name == '' & !req.query.id == '' & !req.query.platform_id == '') {
        plat(req.query.name);

        mysqlconnection.query("select total_views,modified from tutorials WHERE id=? AND platform_id=?", [req.query.id, req.query.platform_id], (err, row6) => {


            //completion logic
            mysqlconnection.query('SELECT * FROM chapters where tutorial_id=?', [req.query.id], (err, roww2) => {
                mysqlconnection.query('SELECT * FROM user_tutorial_chapter_views where tutorial_id=? and chapter_id=? and user_id=?', [req.query.id, roww2[0].id, req.query.u_id], (err, row321) => {
                    console.log(err);
                    if (row321.length > 0) {
                        console.log('ompletion rate nhi calculate ho ga')
                    }
                    else {
                        mysqlconnection.query('insert into user_tutorial_chapter_views (user_id,chapter_id,tutorial_id) values(?,?,?)', [req.query.u_id, roww2[0].id, req.query.id], (err, roe1211) => {
                            console.log(err);
                            mysqlconnection.query('SELECT * FROM user_tutorial_chapter_views where tutorial_id=? and user_id=?', [req.query.id, req.query.u_id], (err, row32121) => {
                                console.log(err);
                                mysqlconnection.query('SELECT * FROM TuitifyXelorDemo.chapters where tutorial_id=?', [req.query.id], (err, row321212) => {
                                    console.log(err);

                                    var aaa = row32121.length;
                                    var bbb = row321212.length;
                                    var compl = (aaa / bbb) * 100;
                                    console.log(compl);
                                    console.log(aaa);
                                    console.log(bbb);
                                    mysqlconnection.query('SELECT * FROM user_tutorial_progresses where tutorial_id=? and user_id=?', [req.query.id, req.query.u_id], (err, row31221) => {
                                        console.log(err);
                                        if (row31221.length > 0) {
                                            console.log('update ho ga comp');

                                            mysqlconnection.query('update user_tutorial_progresses set progress = ? where tutorial_id = ? and user_id = ? ', [compl, req.query.id, req.query.u_id], (err, roe121211121) => {
                                                console.log(err);
                                            })
                                        } else {
                                            console.log('insert ho ga comp');
                                            mysqlconnection.query('insert into user_tutorial_progresses (platform_id,user_id,tutorial_id,progress,avg_percentage) values(?,?,?,?,?)', [req.query.platform_id, req.query.u_id, req.query.id, compl, 0], (err, roe121211) => {
                                                console.log(err);
                                            })
                                        }
                                    })
                                })
                            })
                        })
                    }
                })
            })
            //end       

            const c_d = moment().format("YYYY-MM-D hh:mm:ss");
            const c_date = moment().format("ddd-MMM-DD-YYYY");
            var current = c_date.split(" ")[0];
            console.log('curre', current);
            var getd = row6[0].modified;
            console.log(getd.toString());
            var getdate = getd.toString().replace(/ /g, "-").slice(0, 15);

            console.log('modified', getdate);



            console.log('bahi jan update ho gya');
            mysqlconnection.query('select chapters.id,chapters.parent_id,chapters.media_type from chapters where chapters.tutorial_id=? order by created asc limit 1', [req.query.id], (err, row122) => {
                if (row122.length > 0) {

                    //console.log(row122[0].id);
                    var alo = row122[0].id;
                    //console.log(alo);
                    //console.log(row122[0].media_type);
                    //console.log(err);
                    //console.log(req.query.id);
                    if (row122[0].media_type == '0') {
                        console.log('-----------------------------------------');
                        mysqlconnection.query('select chapters.id,chapters.parent_id,chapters.media_type from chapters where chapters.tutorial_id=? and chapters.parent_id = ? order by created asc limit 1', [req.query.id, alo], (err, row1221) => {
                            console.log(err);
                            console.log(row1221);
                            console.log(alo);
                            if (row1221.length > 0) {

                                mysqlconnection.query('select totalview,modified from tutorial_statics WHERE tutorial_id=? AND chepter_id=? AND parentchepter_id=? AND user_id = ?', [req.query.id, row1221[0].id, row122[0].id, req.query.u_id], (err, row121) => {

                                    console.log(row1221[0].id);

                                    console.log(row122[0].id);
                                    console.log(err);

                                    if (row121.length > 0) {
                                        var getd1 = row121[0].modified;
                                        console.log(getd1.toString());
                                        var getdate1 = getd1.toString().replace(/ /g, "-").slice(0, 15);

                                        if (getdate1 == current) {
                                            console.log('nhi bry ga view')
                                        } else {

                                            var views = row121[0].totalview;
                                            var add1 = views + 1;

                                            mysqlconnection.query('update tutorial_statics set totalview=?,modified = ? WHERE tutorial_id=? AND platform_id=? AND chepter_id=? AND parentchepter_id=? AND user_id=?', [add1, c_d, req.query.id, req.query.platform_id, row1221[0].id, row122[0].id, req.query.u_id], (err, row) => {
                                                console.log('view update ho gya');

                                            })
                                            var views = row6[0].total_views;
                                            var add = views + 1;

                                            mysqlconnection.query('update tutorials set total_views=?,modified = ? where id=? and platform_id=?', [add, c_d, req.query.id, req.query.platform_id], (err, row) => {

                                            })
                                        }
                                    }
                                    else {

                                        mysqlconnection.query('insert into tutorial_statics (platform_id,user_id,chepter_id,parentchepter_id,tutorial_id,totalview,timespend,created,modified) values(?,?,?,?,?,?,?,?,?)', [req.query.platform_id, req.query.u_id, row1221[0].id, row122[0].id, req.query.id, 1, 0, c_d, c_d], (err, row7) => {
                                            console.log('view insert ho gya');
                                        })
                                        var views = row6[0].total_views;
                                        var add = views + 1;

                                        mysqlconnection.query('update tutorials set total_views=?,modified = ? where id=? and platform_id=?', [add, c_d, req.query.id, req.query.platform_id], (err, row) => {

                                        })

                                    }

                                })
                            }

                        })

                    }
                    else {
                        mysqlconnection.query('select totalview,modified from tutorial_statics WHERE tutorial_id=? AND chepter_id=? AND user_id = ?', [req.query.id, row122[0].id, req.query.u_id], (err, row121) => {
                            console.log(err);
                            if (row121.length > 0) {
                                var getd1 = row121[0].modified;
                                console.log(getd1.toString());
                                var getdate1 = getd1.toString().replace(/ /g, "-").slice(0, 15);
                                console.log(getdate1, 'ye he');
                                console.log(current, 'ye he');

                                if (getdate1 == current) {
                                    console.log('nhi bry ga view')
                                } else {

                                    var views = row121[0].totalview;
                                    var add1 = views + 1;

                                    mysqlconnection.query('update tutorial_statics set totalview=?,modified = ? WHERE tutorial_id=? AND platform_id=? AND chepter_id=? AND user_id=?', [add1, c_d, req.query.id, req.query.platform_id, row122[0].id, req.query.u_id], (err, row) => {
                                        console.log(err);
                                        console.log('view update ho gya');

                                    })
                                    var views = row6[0].total_views;
                                    var add = views + 1;

                                    mysqlconnection.query('update tutorials set total_views=?,modified = ? where id=? and platform_id=?', [add, c_d, req.query.id, req.query.platform_id], (err, row) => {

                                    })

                                }
                            }
                            else {

                                mysqlconnection.query('insert into tutorial_statics (platform_id,user_id,chepter_id,parentchepter_id,tutorial_id,totalview,timespend,created,modified) values(?,?,?,?,?,?,?,?,?)', [req.query.platform_id, req.query.u_id, row122[0].id, 0, req.query.id, 1, 0, c_d, c_d], (err, row7) => {
                                    console.log(err);
                                    console.log('view insert ho gya 1');
                                })
                                var views = row6[0].total_views;
                                var add = views + 1;

                                mysqlconnection.query('update tutorials set total_views=?,modified = ? where id=? and platform_id=?', [add, c_d, req.query.id, req.query.platform_id], (err, row) => {

                                })

                            }

                        })
                    }

                }
                else {
                    console.log('no chapters');
                }
            })








        })


        mysqlconnection.query('select users.first_name,users.last_name,users.image,users.id,tutorials.title,tutorials.introduction,tutorials.media_type,tutorials.description,tutorials.created,tutorials.avg_rating,tutorials.total_views,COUNT(comments.id) as comments from tutorials left JOIN users on users.id=tutorials.user_id left JOIN comments on comments.tutorial_id=tutorials.id where tutorials.id=? and tutorials.platform_id=?', [req.query.id, req.query.platform_id], (err, row2) => {
            if (row2.length > 0) {

                mysqlconnection.query('SELECT type,cme_link FROM tutorials where id=?', [req.query.id], (err, row23415) => {
                    console.log(row23415);
                    console.log('err');
                    mysqlconnection.query('SELECT progress FROM user_tutorial_progresses where user_id=? and tutorial_id=?', [req.query.u_id, req.query.id], (err, row234151) => {

                        row2[0].type = row23415[0];
                        if (row234151.length > 0) {
                            row2[0].completion = row234151[0].progress;
                        }
                        else {

                            row2[0].completion = 0;
                        }
                    })
                })
                mysqlconnection.query('select chapters.id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type from chapters LEFT JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.tutorial_id=? and chapters.platform_id=? and chapters.parent_id=0', [req.query.id, req.query.platform_id], (err, row) => {
                    console.log(err);
                    if (row.length > 0) {

                        for (let i = 0; i < row.length; i++) {
                            mysqlconnection.query('select chapters.id,chapters.parent_id,chapters.title as chap_title,tutorial_medias.title as link,chapters.media_type from chapters left JOIN tutorial_medias on tutorial_medias.chapter_id=chapters.id where chapters.parent_id=?', [row[i].id], (err, row1) => {
                                // if(row1.length>0){
                                row[i].subchapter = row1;


                                // }
                                if (row.length - 1 == i) {

                                    mysqlconnection.query('SELECT * FROM favorites where tutorial_id = ? and user_id = ?', [req.query.id, req.query.u_id], (err, row567) => {
                                        mysqlconnection.query('SELECT count(*) as count FROM favorites where tutorial_id = ? and platform_id = ?', [req.query.id, req.query.platform_id], (err, row56789) => {
                                            console.log(err)
                                            mysqlconnection.query('SELECT rating FROM ratings where tutorial_id=? and user_id=?', [req.query.id, req.query.u_id], (err, row54321) => {
                                                console.log(err);
                                                if (row54321.length > 0) {
                                                    row2[0].myrating = row54321[0].rating;

                                                } else {
                                                    row2[0].myrating = 0;

                                                }

                                                row2[0].likes = row56789[0].count;

                                                if (row567.length > 0) {
                                                    row2[0].like = 1;
                                                    res.send({
                                                        status: 'true',
                                                        tuity: row2,
                                                        chapters: row,
                                                        message: 'success'
                                                    });
                                                }
                                                else {
                                                    row2[0].like = 0;
                                                    res.send({
                                                        status: 'true',
                                                        tuity: row2,
                                                        chapters: row,

                                                        message: 'success'
                                                    });
                                                }
                                            })
                                        })
                                    })


                                }


                            })






                        }


                    }
                    else {
                        res.send({
                            status: 'false',
                            tuity: row2,
                            chapters: [],
                            message: 'failed'
                        });

                    }
                })



            }
            else {
                res.send({
                    status: 'false',
                    tuity: [],
                    chapters: [],
                    message: 'failed'
                });
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//end


// correct incorrect options

app.get('/quiz_result_review?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('select quiz_result_detials.questionid as id,quiz_questions.question,quiz_result_detials.youranswer,quiz_result_detials.is_correct from TuitifyXelorDemo.quiz_result_detials left join TuitifyXelorDemo.quiz_questions on quiz_result_detials.questionid = quiz_questions.id where quiz_result_detials.quiz_result_id = ?', [req.query.res_id], (err, row) => {
            console.log(err);
            if (row.length > 0) {
                for (let i = 0; i < row.length; i++) {

                    mysqlconnection.query('SELECT quiz_options.id as answer_id,quiz_options.answer FROM quiz_options where quiz_options.question_id=?', [row[i].id], (err, row1) => {
                        console.log(err);
                        row[i].options = row1;

                        if (row.length - 1 == i || row.length == 1) {

                            res.send({

                                status: 'true',
                                quiz: row

                            })

                        }
                    })


                }


            }
            else {
                res.send({

                    status: 'failed',
                    quiz: []

                })
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});


//end




//quiz question and options
app.get('/quiz_question_options1?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT quiz_questions.id as question_id,quiz_questions.user_id,quiz_questions.quiz_id,quiz_questions.question,quiz_questions.question_type,quiz_questions.created,quizzes.timer,quizzes.seconds FROM quiz_questions left join quizzes on quiz_questions.quiz_id = quizzes.id  where quiz_questions.tutorial_id = ? and quiz_questions.chapter_id = ?', [req.query.tutorial_id, req.query.chapter_id], (err, row) => {

            if (row.length > 0) {
                for (let i = 0; i < row.length; i++) {

                    mysqlconnection.query('SELECT quiz_options.id as answer_id,quiz_options.answer,quiz_options.correct_answer FROM quiz_options where quiz_options.question_id=?', [row[i].question_id], (err, row1) => {

                        row[i].options = row1;

                        if (row.length - 1 == i || row.length == 1) {

                            res.send({

                                status: 'true',
                                quiz: row

                            })

                        }
                    })


                }


            }
            else {
                res.send({

                    status: 'failed',
                    quiz: []

                })
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//quiz question and options
app.get('/quiz_question_options12?', (req, res) => {
    console.log('hello ji');
    console.log('hello ji kkk');

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT quiz_questions.id as question_id,chapters.title,chapters.id,quiz_questions.user_id,quiz_questions.quiz_id,quiz_questions.question,quiz_questions.question_type,quiz_questions.created,quizzes.timer,quizzes.seconds FROM quiz_questions left join quizzes on quiz_questions.quiz_id = quizzes.id left join chapters on quiz_questions.chapter_id = chapters.id where quiz_questions.tutorial_id = ? and quiz_questions.chapter_id = ?', [req.query.tutorial_id, req.query.chapter_id], (err, row) => {
            console.log(err);
            console.log(row);
            if (row.length > 0) {
                for (let i = 0; i < row.length; i++) {

                    mysqlconnection.query('SELECT quiz_options.id as answer_id,quiz_options.answer,quiz_options.correct_answer FROM quiz_options where quiz_options.question_id=?', [row[i].question_id], (err, row1) => {
                        console.log(err);
                        row[i].options = row1;

                        if (row.length - 1 == i || row.length == 1) {

                            res.send({

                                status: 'true',
                                quiz: row

                            })

                        }
                    })


                }


            }
            else {
                res.send({

                    status: 'failed',
                    quiz: []

                })
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end


//quiz question and answer
app.post('/quiz_question_answers?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);
        const c_date = moment().format("YYYY-MM-D hh:mm:ss");
        var percentage = (req.query.ca / req.query.tq) * 100;

        mysqlconnection.query('insert into quiz_results (platform_id,user_id,tutorial_id,quiz_id,mainquize_id,totalquestion,totalanswer,correctanswer,percentage,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.q_id, req.query.mq_id, req.query.tq, req.query.ta, req.query.ca, percentage, c_date, c_date], (err, row) => {
            // console.log(row.insertId);
            console.log(err);
            if (!err) {
                res.send({

                    status: 'true',
                    result: percentage,
                    insertid: row.insertId

                })

            }
            else {
                res.send({

                    status: 'failed',
                    result: [],
                    insertid: []

                })
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end



app.get('/chapter_link?', (req, res) => {
    if (!req.query.name == '') {
        console.log(req.query.name, req.query.id);

        plat(req.query.name);

        mysqlconnection.query('SELECT title as link,type FROM tutorial_medias where chapter_id=?', [req.query.id], (err, row1) => {
            if (row1.length > 0) {
                res.send({
                    status: 'true',
                    chapter_link: row1[0],
                    message: 'success'
                });

            }
            else {
                res.send({
                    status: 'false',
                    chapter_link: {},
                    message: 'fail'
                });

            }
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//quiz submit answer
app.post('/quiz_submit_answers?', (req, res) => {

    if (!req.query.name == '') {
        var arr = [];
        var is_correct;
        const c_date = moment().format("YYYY-MM-D hh:mm:ss");

        plat(req.query.name);
        if (req.query.issurvey == 1) {

            mysqlconnection.query('select id from quiz_options where question_id = ? and correct_answer = ?', [req.query.q_id, 1], (err, row) => {
                console.log(row);
                console.log(req.body.answer);

                for (var i = 0; i < row.length; i++) {
                    arr.push(row[i].id);
                }

                console.log(arr);
                var a = arr.toString();
                var b = req.body.answer.toString();
                if (a == b) {
                    is_correct = 1;
                }
                else {
                    is_correct = 0;
                }
                if (req.query.isindex == 1) {
                    if (req.query.tq == 1) {
                        var percentage = (is_correct / req.query.tq) * 100;
                        console.log(percentage);

                        var per = parseFloat(percentage).toFixed(2);
                        console.log(per);
                        var abc;
                        if (is_correct == 1) {

                            abc = 0;

                        }
                        else {
                            abc = 1;

                        }

                        mysqlconnection.query('insert into quiz_results (platform_id,user_id,tutorial_id,quiz_id,mainquize_id,totalquestion,totalanswer,correctanswer,percentage,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.chapter_id, req.query.mainquize_id, 0, abc, is_correct, per, c_date, c_date], (err, row14) => {
                            console.log(err);
                            console.log(row14);

                            mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, row14.insertId, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row11) => {
                                //console.log(err);
                                console.log(err);
                                if (!err) {
                                    res.send({

                                        status: 'true',
                                        score: per,
                                        message: 'Quiz finished'


                                    })

                                }
                                else {
                                    res.send({

                                        status: 'failed',
                                        score: [],
                                        message: 'Quiz not finished'



                                    })
                                }
                            })
                        })
                    }
                    else {

                        mysqlconnection.query('insert into quiz_results (platform_id,user_id,tutorial_id,quiz_id,mainquize_id,totalquestion,totalanswer,correctanswer,percentage,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.chapter_id, req.query.mainquize_id, req.query.tq, 1, 0, 0, c_date, c_date], (err, row12) => {
                            console.log(err);
                            console.log(row12.insertId);

                            mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, row12.insertId, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row11) => {
                                console.log(err);
                                console.log(row12.insertId);
                                if (!err) {
                                    res.send({

                                        status: 'true',
                                        insertid: row12.insertId,
                                        message: 'answer submitted'

                                    })

                                }
                                else {
                                    res.send({

                                        status: 'failed',
                                        insertid: [],
                                        message: 'answer not submitted'



                                    })
                                }
                            })
                        })
                    }
                }
                else if (req.query.isindex == 2) {

                    mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, req.query.res_id, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                        mysqlconnection.query('select count(*) as correct from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 1], (err, result) => {
                            mysqlconnection.query('select count(*) as answer from quiz_result_detials where quiz_result_id=?', [req.query.res_id], (err, result1) => {
                                var percentage = (result[0].correct / req.query.tq) * 100;



                                var per = parseFloat(percentage).toFixed(2);

                                mysqlconnection.query('update quiz_results set totalquestion = ?,totalanswer = ?,correctanswer = ?,percentage = ?,modified = ? where id = ?', [req.query.tq, 0, result[0].correct, per, c_date, req.query.res_id], (err, row12) => {

                                    console.log(err);
                                    if (!err) {
                                        res.send({

                                            status: 'true',
                                            score: per,
                                            insertid: req.query.res_id,
                                            message: 'answer submitted'


                                        })

                                    }
                                    else {
                                        res.send({

                                            status: 'failed',
                                            score: [],
                                            insertid: [],
                                            message: 'answer not submitted'



                                        })
                                    }
                                })
                            })
                        })

                    })

                }
                else {

                    mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, req.query.res_id, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                        mysqlconnection.query('select count(*) as correct from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 1], (err, result) => {
                            mysqlconnection.query('select count(*) as answer from quiz_result_detials where quiz_result_id=?', [req.query.res_id], (err, result1) => {
                                var percentage = (result[0].correct / req.query.tq) * 100;



                                var per = parseFloat(percentage).toFixed(2);

                                mysqlconnection.query('update quiz_results set totalquestion = ?,totalanswer = ?,correctanswer = ?,percentage = ?,modified = ? where id = ?', [req.query.tq, 0, result[0].correct, per, c_date, req.query.res_id], (err, row12) => {

                                    console.log(err);
                                    if (!err) {
                                        res.send({

                                            status: 'true',
                                            score: per,
                                            insertid: req.query.res_id,
                                            message: 'Quiz finished'


                                        })

                                    }
                                    else {
                                        res.send({

                                            status: 'failed',
                                            score: [],
                                            insertid: [],
                                            message: 'Quiz not finished'



                                        })
                                    }
                                })
                            })
                        })

                    })

                }
            })

        } else {

            mysqlconnection.query('select id from quiz_options where question_id = ? and correct_answer = ?', [req.query.q_id, 1], (err, row) => {
                console.log(row);
                console.log(req.body.answer);

                for (var i = 0; i < row.length; i++) {
                    arr.push(row[i].id);
                }

                console.log(arr);
                var a = arr.toString();
                var b = req.body.answer.toString();
                if (a == b) {
                    is_correct = 1;
                }
                else {
                    is_correct = 0;
                }
                if (req.query.isindex == 1) {
                    if (req.query.tq == 1) {
                        var percentage = (is_correct / req.query.tq) * 100;
                        console.log(percentage);

                        var per = parseFloat(percentage).toFixed(2);
                        console.log(per);
                        var abc;
                        if (is_correct == 1) {

                            abc = 0;

                        }
                        else {
                            abc = 1;

                        }

                        mysqlconnection.query('insert into quiz_results (platform_id,user_id,tutorial_id,quiz_id,mainquize_id,totalquestion,totalanswer,correctanswer,percentage,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.chapter_id, req.query.mainquize_id, 1, abc, is_correct, per, c_date, c_date], (err, row14) => {
                            console.log(err);
                            mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, row14.insertId, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row11) => {

                                if (!err) {
                                    res.send({

                                        status: 'true',
                                        score: per,
                                        insertid: row14.insertId,
                                        message: 'Quiz finished'


                                    })

                                }
                                else {
                                    res.send({

                                        status: 'failed',
                                        score: [],
                                        insertid: [],
                                        message: 'Quiz not finished'



                                    })
                                }
                            })
                        })
                    }
                    else {
                        var percentage1 = (is_correct / req.query.tq) * 100;
                        var per1 = parseFloat(percentage1).toFixed(2);
                        var abc1;
                        if (is_correct == 1) {

                            abc1 = 0;

                        }
                        else {
                            abc1 = 1;

                        }
                        mysqlconnection.query('insert into quiz_results (platform_id,user_id,tutorial_id,quiz_id,mainquize_id,totalquestion,totalanswer,correctanswer,percentage,created,modified) values(?,?,?,?,?,?,?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.chapter_id, req.query.mainquize_id, req.query.tq, abc1, is_correct, per1, c_date, c_date], (err, row12) => {

                            console.log(err);
                            console.log(row12);

                            mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, row12.insertId, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                                console.log(err);
                                if (!err) {
                                    res.send({

                                        status: 'true',
                                        score: per1,
                                        insertid: row12.insertId,
                                        message: 'answer submitted'


                                    })

                                }
                                else {
                                    res.send({

                                        status: 'failed',
                                        insertid: [],
                                        message: 'answer not submitted'



                                    })
                                }
                            })
                        })
                    }
                }
                else if (req.query.isindex == 2) {


                    mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, req.query.res_id, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                        mysqlconnection.query('select count(*) as correct from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 1], (err, result) => {
                            mysqlconnection.query('select count(*) as answer from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 0], (err, result1) => {
                                console.log(result[0].correct);
                                var percentage = (result[0].correct / req.query.tq) * 100;
                                var per = parseFloat(percentage).toFixed(2);

                                mysqlconnection.query('update quiz_results set totalquestion = ?,totalanswer = ?,correctanswer = ?,percentage = ?,modified = ? where id = ?', [req.query.tq, result1[0].answer, result[0].correct, per, c_date, req.query.res_id], (err, row12) => {

                                    console.log(err);
                                    if (!err) {
                                        res.send({

                                            status: 'true',
                                            score: per,
                                            insertid: req.query.res_id,
                                            message: 'answer submitted'


                                        })

                                    }
                                    else {
                                        res.send({

                                            status: 'failed',
                                            score: [],
                                            insertid: [],
                                            message: 'answer not submitted'



                                        })
                                    }
                                })
                            })
                        })

                    })

                }
                else if (req.query.isindex == 3) {


                    mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, req.query.res_id, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                        mysqlconnection.query('select count(*) as correct from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 1], (err, result) => {
                            mysqlconnection.query('select count(*) as answer from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 0], (err, result1) => {
                                console.log(result[0].correct);
                                var percentage4 = (result[0].correct / req.query.tq) * 100;
                                var per4 = parseFloat(percentage4).toFixed(2);

                                mysqlconnection.query('update quiz_results set totalquestion = ?,totalanswer = ?,correctanswer = ?,percentage = ?,modified = ? where id = ?', [req.query.tq, result1[0].answer, result[0].correct, per4, c_date, req.query.res_id], (err, row12) => {

                                    console.log(err);
                                    if (!err) {
                                        res.send({

                                            status: 'true',
                                            score: per4,
                                            insertid: req.query.res_id,
                                            message: 'Quiz finished'


                                        })

                                    }
                                    else {
                                        res.send({

                                            status: 'failed',
                                            score: [],
                                            insertid: [],
                                            message: 'Quiz not finished'



                                        })
                                    }
                                })
                            })
                        })

                    })

                }
                else {

                    mysqlconnection.query('insert into quiz_result_detials (platform_id,quiz_result_id,user_id,questionid,correct,youranswer,is_correct) values(?,?,?,?,?,?,?)', [req.query.p_id, req.query.res_id, req.query.u_id, req.query.q_id, a, b, is_correct], (err, row1) => {
                        mysqlconnection.query('select count(*) as correct from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 1], (err, result) => {
                            mysqlconnection.query('select count(*) as answer from quiz_result_detials where quiz_result_id=? and is_correct=?', [req.query.res_id, 0], (err, result1) => {
                                var percentage3 = (result[0].correct / req.query.tq) * 100;
                                console.log(result[0].correct);
                                console.log(percentage3);
                                var per3 = parseFloat(percentage3).toFixed(2);

                                mysqlconnection.query('update quiz_results set totalquestion = ?,totalanswer = ?,correctanswer = ?,percentage = ?,modified = ? where id = ?', [req.query.tq, result1[0].answer, result[0].correct, per3, c_date, req.query.res_id], (err, row12) => {

                                    console.log(err);
                                    if (!err) {
                                        res.send({

                                            status: 'true',
                                            score: per3,
                                            insertid: req.query.res_id,
                                            message: 'Quiz finished'


                                        })

                                    }
                                    else {
                                        res.send({

                                            status: 'failed',
                                            score: [],
                                            insertid: [],
                                            message: 'Quiz not finished'



                                        })
                                    }
                                })
                            })
                        })

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

});
//end


//main page tuity overview of screen 
app.get('/tuity_overview?', (req, res) => {
    if (!req.query.name == '' & !req.query.id == '' & !req.query.p_id == '') {

        plat(req.query.name);

        mysqlconnection.query('select users.first_name,users.last_name,users.image,users.description from users INNER join tutorials on users.id=tutorials.user_id where tutorials.id=? and tutorials.platform_id=?', [req.query.id, req.query.p_id], (err, row2) => {
            mysqlconnection.query("select users.id,users.image,users.first_name,users.last_name from users INNER JOIN tutorial_statics on tutorial_statics.user_id=users.id WHERE tutorial_statics.tutorial_id=? AND tutorial_statics.platform_id=? AND users.image !='' group by users.id", [req.query.id, req.query.p_id], (err, row) => {
                mysqlconnection.query('select users.id,users.position,users.company from users INNER JOIN tutorial_statics on tutorial_statics.user_id=users.id WHERE tutorial_statics.tutorial_id=? AND tutorial_statics.platform_id=? group by users.id', [req.query.id, req.query.p_id], (err, row1) => {
                    mysqlconnection.query('select total_views from tutorials WHERE id=? AND platform_id=?', [req.query.id, req.query.p_id], (err, row6) => {

                        if (row.length > 0 || row1.length > 0 || row2.length > 0 || row6.length > 0) {
                            res.send({
                                status: 'true',
                                views: row6[0].total_views,
                                instructor: row2,
                                learners_avatars: row,
                                tags: row1,
                                message: 'success'
                            });

                        }
                        else {
                            res.send({
                                status: 'false',
                                views: [],
                                instructor: [],
                                learners_avatars: [],
                                tags: [],
                                message: 'fail'
                            });

                        }
                    })
                })
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//follow user

app.post('/follow_user?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('select * from followers where followed_by=? and followed_to=?', [req.query.f_to, req.query.f_by], (err, row) => {

            if (row.length > 0) {
                mysqlconnection.query('update followers set status=1 where id=?', [row[0].id], (err, row1) => {
                    if (!err) {
                        res.send({
                            status: 'true',
                            message: 'following',
                        })
                    }
                    else {
                        res.send({
                            status: 'false',
                            message: 'not following',
                        })
                    }
                })
            }
            else {
                mysqlconnection.query('INSERT into followers (followed_by,followed_to,status) VALUES(?,?,0)', [req.query.f_by, req.query.f_to], (err, row2) => {
                    if (!err) {
                        res.send({
                            status: 'true',
                            message: 'following',
                        })
                    }
                    else {
                        res.send({
                            status: 'false',
                            message: 'not following',
                        })
                    }
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


//unfollow user

//unfollow user

app.delete('/unfollow?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);


        mysqlconnection.query('select * from followers where followed_by=? and followed_to=? and status=?', [req.query.f_by, req.query.f_to, 0], (err, row) => {
            if (row.length > 0) {
                mysqlconnection.query('DELETE FROM followers where followed_by=? and followed_to=?', [req.query.f_by, req.query.f_to], (err, row) => {
                    if (!err) {
                        res.send({
                            status: 'true',
                            message: 'unfollow',
                        })
                    }
                    else {
                        res.send({
                            status: 'false',
                            message: 'not unfollow',
                        })
                    }
                })

            }
            else {
                mysqlconnection.query('select * from followers where followed_by=? and followed_to=? and status=?', [req.query.f_to, req.query.f_by, 1], (err, row1) => {
                    if (row1.length > 0) {
                        mysqlconnection.query('update followers set status=? where id=?', [0, row1[0].id], (err, row2) => {
                            if (!err) {
                                res.send({
                                    status: 'true',
                                    message: 'unfollow',
                                })
                            }
                            else {
                                res.send({
                                    status: 'false',
                                    message: 'not unfollow',
                                })
                            }
                        })

                    }
                    else {
                        mysqlconnection.query('update followers set status=?,followed_by=?,followed_to=? where followed_by=? and followed_to=? and status=?', [0, req.query.f_to, req.query.f_by, req.query.f_by, req.query.f_to, 1], (err, row2) => {
                            if (!err) {
                                res.send({
                                    status: 'true',
                                    message: 'unfollow',
                                })
                            }
                            else {
                                res.send({
                                    status: 'false',
                                    message: 'not unfollow',
                                })
                            }
                        })
                    }
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

//chat inbox

app.get('/chat_inbox?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('select chat_messages.user_id,chat_messages.friend_id,users.is_online,chat_messages.is_read,chat_messages.message,chat_messages.date,users.image,users.first_name,users.last_name from TuitifyXelorDemo.chat_messages left join TuitifyXelorDemo.users on IF(chat_messages.user_id = ?, chat_messages.friend_id, chat_messages.user_id) = users.id where (least(user_id, friend_id), greatest(user_id, friend_id), date) in ( select least(user_id, friend_id) as x, greatest(user_id, friend_id) as y, max(date) as date from TuitifyXelorDemo.chat_messages where user_id=? or friend_id = ?  group by x, y) order by date desc', [req.query.user_id, req.query.user_id, req.query.user_id], (err, row) => {

            mysqlconnection.query('SELECT group_name.id FROM group_name left join group_chat_messages on group_name.id = group_chat_messages.group_id left join group_chat_user on group_name.id = group_chat_user.group_id where group_chat_user.user_id=? group by group_chat_messages.group_id order by group_chat_messages.created desc', [req.query.user_id], (err, row1) => {
                let addd = [];
                let data = [];
                for (let i = 0; i < row1.length; i++) {
                    mysqlconnection.query('SELECT group_chat_messages.user_id,group_chat_messages.group_id,group_chat_messages.message,group_chat_messages.created,group_name.group_title FROM group_chat_messages left join group_name on group_chat_messages.group_id = group_name.id  where group_chat_messages.group_id=? order by created desc limit 1', [row1[i].id], (err, row121) => {

                        data.push(row121[0]);

                    })

                    mysqlconnection.query('SELECT users.image,group_chat_user.group_id FROM group_chat_user left join users on group_chat_user.user_id = users.id where group_chat_user.group_id = ?', [row1[i].id], (err, row11) => {

                        addd.push(row11);
                        // row1.splice(i,1,row11);
                        console.log(row1);
                        if (row1.length - 1 == i || row1.length == 1) {


                            res.send({

                                status: 'true',
                                messages: row,
                                group_message: data,
                                images: addd

                            })

                        }

                    })
                }
            })
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})

//end

app.get('/chat_inbox1?', (req, res) => {
    if (!req.query.name == '') {
        plat(req.query.name);
        mysqlconnection.query('select chat_messages.user_id,chat_messages.friend_id,users.is_online,chat_messages.is_read,chat_messages.message,chat_messages.date,users.image,users.first_name,users.last_name from TuitifyXelorDemo.chat_messages left join TuitifyXelorDemo.users on IF(chat_messages.user_id = ?, chat_messages.friend_id, chat_messages.user_id) = users.id where (least(user_id, friend_id), greatest(user_id, friend_id), date) in ( select least(user_id, friend_id) as x, greatest(user_id, friend_id) as y, max(date) as date from TuitifyXelorDemo.chat_messages where user_id=? or friend_id = ?  group by x, y) order by date desc', [req.query.user_id, req.query.user_id, req.query.user_id], (err, row) => {
            mysqlconnection.query('SELECT group_chat_messages.user_id,group_chat_messages.group_id,group_chat_messages.message,group_chat_messages.created,group_name.group_title FROM group_chat_messages left join group_name on group_chat_messages.group_id = group_name.id group by group_id order by created desc', (err, row1) => {
                let addd = [];
                for (let i = 0; i < row1.length; i++) {
                    mysqlconnection.query('SELECT users.image,group_chat_user.group_id FROM group_chat_user left join users on group_chat_user.user_id = users.id where group_chat_user.group_id = ?', [row1[i].group_id], (err, row11) => {
                        addd.push(row11);
                        // row1.splice(i,1,row11);
                        console.log(row1);
                        if (row1.length - 1 == i || row1.length == 1) {
                            res.send({
                                status: 'true',
                                messages: row,
                                group_message: row1,
                                images: addd
                            })
                        }
                    })
                }
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//chat history

app.get('/chat_history?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('SELECT user_id,friend_id,message,date,is_read FROM chat_messages WHERE (user_id = ? AND friend_id = ?) OR (friend_id =? AND user_id = ?) order by date desc', [req.query.chat_from, req.query.chat_to, req.query.chat_from, req.query.chat_to], (err, row) => {

            mysqlconnection.query('update chat_messages set is_read=? where user_id=? and friend_id=?', [1, req.query.chat_to, req.query.chat_from], (err, row3333) => {

                mysqlconnection.query('update chat_messages set is_active=? where user_id=?', [1, req.query.chat_from], (err, row2333) => {

                    if (row.length > 0) {

                        res.send({

                            status: 'true',
                            messages: row,

                        })
                    }
                    else {
                        res.send({

                            status: 'failed',
                            messages: [],

                        })
                    }
                })
            })

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});
//end

//api chat user search

app.get('/user_search_chat?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        var string = req.query.string;

        mysqlconnection.query("SELECT chat_messages.friend_id as user_id,users.is_online,chat_messages.is_read,chat_messages.message,chat_messages.date,users.image,users.first_name,users.last_name FROM chat_messages left join users on chat_messages.friend_id = users.id where chat_messages.user_id=? and users.first_name LIKE '" + string + "%' or users.last_name LIKE '" + string + "%' group by chat_messages.friend_id", [req.query.user_id], (err, row) => {

            mysqlconnection.query("SELECT chat_messages.friend_id as user_id,users.is_online,chat_messages.is_read,chat_messages.message,chat_messages.date,users.image,users.first_name,users.last_name FROM chat_messages left join users on chat_messages.friend_id = users.id where chat_messages.user_id=? and chat_messages.message LIKE '" + string + "%' ", [req.query.user_id], (err, row1) => {
                console.log(err);
                mysqlconnection.query("SELECT users.id as user_id,users.is_online,users.image,users.first_name,users.last_name FROM users where users.first_name LIKE '" + string + "%' or users.last_name LIKE '" + string + "%'", (err, row2) => {

                    if (row.length > 0) {
                        res.send({
                            status: 'true',
                            users: row,
                            chat: row1,
                            allusers: row2,
                            message: 'success'
                        });
                    } else {
                        res.send({
                            status: 'fail',
                            users: [],
                            chat: [],
                            allusers: [],
                            message: 'fail'
                        });
                    }
                })
            })
        });
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})

//end

//active status change for chat of user

app.get('/change_active?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('update chat_messages set is_active=? where user_id=?', [0, req.query.chat_from], (err, row2333) => {

            if (!err) {

                res.send({

                    status: 'true',
                    messages: 'status changed'

                })
            }
            else {
                res.send({

                    status: 'failed',
                    messages: 'status not changed',
                    err: err

                })
            }
        })

    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});



//end

function sss(ab, a) {
    io.emit(ab, a)
    console.log(a);
    console.log(ab);

}
function socket_comment(name, p_id, u_id, t_id, created) {
    console.log('tutorial_commented')

    plat(name);
    var c = "tutorial_commented";
    console.log(u_id);
    mysqlconnection.query('insert into notifications(platform_id,type,is_activity,user_id,group_id,tutorial_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?)', [p_id, 'tutorial_commented', 1, u_id, 0, t_id, 0, created, created], (err, row) => {
        console.log(err, row);
        mysqlconnection.query('SELECT user_id FROM tutorials where id = ?', [t_id], (err, resul) => {

            console.log(resul[0].user_id);
            mysqlconnection.query('insert into notifications(platform_id,type,is_activity,user_id,group_id,tutorial_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?)', [p_id, 'tutorial_commented', 0, resul[0].user_id, 0, t_id, 0, created, created], (err, row22) => {

                console.log(err);
                console.log(row22);
                mysqlconnection.query('select notifications.user_id,users.first_name,users.last_name,users.image,notifications.type,notifications.created from notifications left join users on notifications.user_id = users.id where notifications.id = ?', [row.insertId], (err, row1) => {
                    var msg1 = {
                        from_user_id: u_id,
                        first_name: row1[0].first_name,
                        last_name: row1[0].last_name,
                        image: row1[0].image,
                        type: row1[0].type,
                        group_id: row1[0].group_id,
                        created: row1[0].created,
                        video_thumbnail: ''

                    };
                    console.log(msg1);
                    var ab = 'tutorial_commented' + resul[0].user_id;
                    io.emit(ab, msg1);

                })
            })
        })
    })

}

function socket_liked(name, p_id, u_id, t_id, created) {
    console.log('tuity_liked')

    plat(name);
    var c = "tuity_liked";
    mysqlconnection.query('SELECT user_id FROM tutorials where id = ?', [t_id], (err, resul) => {
        mysqlconnection.query('insert into notifications(platform_id,type,is_activity,user_id,from_user_id,group_id,tutorial_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?,?)', [p_id, 'tuity_liked', 1, u_id, resul[0].user_id, 0, t_id, 0, created, created], (err, row) => {
            console.log(err);



            mysqlconnection.query('insert into notifications(platform_id,type,is_activity,user_id,from_user_id,group_id,tutorial_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?,?)', [p_id, 'tuity_liked', 0, resul[0].user_id, u_id, 0, t_id, 0, created, created], (err, row22) => {

                console.log(err);
                console.log(row22);
                mysqlconnection.query('select users.first_name,users.last_name,users.image,notifications.type,notifications.created from notifications left join users on notifications.FROM_user_id = users.id where notifications.id = ?', [row22.insertId], (err, row1) => {
                    var msg1 = {
                        from_user_id: row1[0].user_id,
                        first_name: row1[0].first_name,
                        last_name: row1[0].last_name,
                        image: row1[0].image,
                        type: row1[0].type,
                        group_id: row1[0].group_id,
                        created: row1[0].created,
                        video_thumbnail: ''

                    };

                    var ab = 'tuity_liked' + resul[0].user_id;
                    io.emit(ab, msg1);

                })
            })
        })
    })

}

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    console.log('A user connected');
    //private chat

    socket.on("chat message", msg => {

        console.log('chat_messages')

        plat(msg.name);
        var is_read;
        mysqlconnection.query('select * from chat_messages where is_active=? and user_id=?', [1, msg.friend_id], (err, rr) => {
            if (rr.length > 0) {

                mysqlconnection.query('insert into chat_messages(user_id,friend_id,is_read,message,is_sent,is_welcome,date) values(?,?,?,?,?,?,?)', [msg.user_id, msg.friend_id, 1, msg.message, 0, 0, msg.date], (err, row) => {
                    console.log(err);
                    mysqlconnection.query('update chat_messages set is_active=? where user_id=?', [1, msg.user_id], (err, row2333) => {

                        var ab = msg.user_id + msg.friend_id;
                        var msg1 = {
                            user_id: msg.user_id,
                            friend_id: msg.friend_id,
                            message: msg.message,
                            date: msg.date,
                            is_read: 1
                        }
                        //console.log(ab);
                        sss(ab, msg1)

                        //                        io.emit(ab, msg1);

                    })
                })
            } else {
                mysqlconnection.query('insert into chat_messages(user_id,friend_id,is_read,message,is_sent,is_welcome,date) values(?,?,?,?,?,?,?)', [msg.user_id, msg.friend_id, 0, msg.message, 0, 0, msg.date], (err, row) => {
                    console.log(err);
                    mysqlconnection.query('update chat_messages set is_active=? where user_id=?', [1, msg.user_id], (err, row2333) => {

                        var ab = msg.user_id + msg.friend_id;
                        console.log(ab);
                        var msg1 = {
                            user_id: msg.user_id,
                            friend_id: msg.friend_id,
                            message: msg.message,
                            date: msg.date,
                            is_read: 0
                        }
                        io.emit(ab, msg1);

                    })
                })
            }

        })


    });

    //group chat
    socket.on("group message", msg => {

        console.log('group chat')

        plat(msg.name);

        mysqlconnection.query('insert into group_chat_messages(user_id,group_id,message,created) values(?,?,?,?)', [msg.user_id, msg.group_id, msg.message, msg.created], (err, row) => {

            mysqlconnection.query('select * from group_name where id = ?', [msg.group_id], (err, row1) => {
                var ab = row1[0].group_title + msg.group_id;

                mysqlconnection.query('select users.first_name,users.last_name,users.image,group_chat_user.color from users left join group_chat_user on users.id = group_chat_user.user_id  where users.id = ? and group_chat_user.group_id = ?', [msg.user_id, msg.group_id], (err, row111) => {

                    const c_date = moment().format("YYYY-MM-D hh:mm:ss");
                    console.log(ab);
                    var msg1 = {
                        first_name: row111[0].first_name,
                        last_name: row111[0].last_name,
                        user_id: msg.user_id,
                        message: msg.message,
                        created: msg.created,
                        color: row111[0].color
                    }
                    console.log(msg1);
                    io.emit(ab, msg1);
                })
            })
        })

    });

    //followng

    socket.on("following", msg => {

        console.log('following')

        plat(msg.name);
        var f = 'following';


        mysqlconnection.query('insert into notifications(platform_id,type,user_id,group_id,tutorial_id,from_user_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?)', [msg.platform_id, 'following', msg.user_id, 0, 0, msg.from_id, 0, msg.created, msg.created], (err, row) => {

            mysqlconnection.query('insert into notifications(platform_id,type,is_activity,user_id,group_id,tutorial_id,from_user_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?,?)', [msg.platform_id, 'following', 1, msg.user_id, 0, 0, msg.from_id, 0, msg.created, msg.created], (err, row22) => {

                console.log(err);

                mysqlconnection.query('select notifications.from_user_id,users.first_name,users.last_name,users.image,notifications.type,notifications.group_id,notifications.created from notifications left join users on notifications.from_user_id = users.id where notifications.platform_id=? and notifications.user_id=? and notifications.from_user_id=? and notifications.type=? order by notifications.created desc', [msg.platform_id, msg.user_id, msg.from_id, f], (err, row1) => {
                    var msg1 = {
                        from_user_id: row1[0].from_user_id,
                        first_name: row1[0].first_name,
                        last_name: row1[0].last_name,
                        image: row1[0].image,
                        type: row1[0].type,
                        group_id: row1[0].group_id,
                        created: row1[0].created,
                        video_thumbnail: ''

                    };

                    var ab = 'following' + msg.user_id;
                    io.emit(ab, msg1);

                })
            })
        })

    })
    //tuity_liked

    socket.on("tuity_liked", msg => {

        console.log('tuity_liked')

        plat(msg.name);


        mysqlconnection.query('insert into notifications(platform_id,type,user_id,group_id,tutorial_id,from_id,is_read,created,modified) values(?,?,?,?,?,?,?,?,?)', [msg.platform_id, 'tuity_liked', msg.user_id, 0, 0, msg.from_id, 0, msg.created, msg.created], (err, row) => {

            var ab = 'following' + msg.user_id;
            console.log(ab);
            io.emit(ab, msg1);

        })

    })



    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

//notifications
app.get('/notification1?', (req, res) => {

    let current = new Date().toISOString().slice(0, 10).replace(' ');
    console.log(current);
    if (!req.query.name == '') {
        console.log(req)
        plat(req.query.name);
        //from user id exist
        var f = 'following';
        var l = 'tuity_liked';
        var d = 'tuity_reported';
        var s = 'shared_tuity';
        var es = 'email_shared_tuity';

        //not exist from user id
        var c = 'tutorial_commented';
        var a = 'new_tutorial_added';
        var b = 'tutorial_rated';
        var ts = 'tutorial_shared';
        var tr = 'tutorial_review_added';
        var tp = 'tutorial_published';
        var tc = 'tutorial_created';
        var ngm = 'new_group_member';

        console.log(date);
        mysqlconnection.query('select notifications.id,notifications.from_user_id,users.first_name,users.last_name,users.image,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.from_user_id = users.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, f, 0], (err, row1) => {
            console.log(err);
            mysqlconnection.query('select notifications.id,notifications.from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.from_user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, l, req.query.id, 0], (err, row2) => {
                console.log(err);

                mysqlconnection.query('select notifications.id,notifications.from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.from_user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, d, req.query.id, 0], (err, row3) => {
                    console.log(err);

                    mysqlconnection.query('select notifications.id,notifications.from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.from_user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, s, req.query.id, 0], (err, row4) => {
                        console.log(err);

                        mysqlconnection.query('select notifications.id,notifications.from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.from_user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, es, req.query.id, 0], (err, row5) => {
                            console.log(err);



                            mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, b, req.query.id, 0], (err, row6) => {
                                console.log(err);

                                mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, a, req.query.id, 0], (err, row7) => {
                                    console.log(err);

                                    mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, c, req.query.id, 0], (err, row8) => {
                                        console.log(err);

                                        mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, ts, req.query.id, 0], (err, row9) => {
                                            console.log(err);

                                            mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and tutorials.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, tr, req.query.id, 0], (err, row10) => {
                                                console.log(err);

                                                mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, tp, 0], (err, row11) => {
                                                    console.log(err);

                                                    mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, tc, 0], (err, row12) => {
                                                        console.log(err);

                                                        mysqlconnection.query('select notifications.id,notifications.user_id as from_user_id,users.first_name,users.last_name,users.image,tutorials.video_thumbnail,notifications.type,notifications.message,notifications.group_id,notifications.tutorial_id,notifications.created from notifications left join users on notifications.user_id = users.id left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.type = ? and notifications.user_id = ? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, ngm, req.query.id, 0], (err, row13) => {
                                                            console.log(err);


                                                            console.log(err);
                                                            if (row1.length > 0 || row2.length > 0 || row3.length > 0 || row4.length > 0 || row5.length > 0 || row6.length > 0 || row7.length > 0 || row8.length > 0 || row9.length > 0 || row10.length > 0 || row11.length > 0 || row12.length > 0 || row13.length > 0) {

                                                                res.send({
                                                                    status: 'true',
                                                                    notification: row1.concat(row2).concat(row3).concat(row4).concat(row5).concat(row6).concat(row7).concat(row8).concat(row9).concat(row10).concat(row11).concat(row12).concat(row13),
                                                                    message: 'success'
                                                                })

                                                            }
                                                            else {
                                                                res.send({
                                                                    status: 'false',
                                                                    notification: [],
                                                                    message: 'failed'
                                                                })


                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end

//activities

app.get('/activities?', (req, res) => {


    if (!req.query.name == '') {
        console.log(req)
        plat(req.query.name);

        var f = 'following';
        var l = 'tuity_liked';
        var d = 'tuity_reported';
        var s = 'shared_tuity';
        var es = 'email_shared_tuity';

        //not exist from user id
        var c = 'tutorial_commented';
        var a = 'new_tutorial_added';
        var b = 'tutorial_rated';
        var ts = 'tutorial_shared';
        var tr = 'tutorial_review_added';
        var tp = 'tutorial_published';
        var tc = 'tutorial_created';
        var ngm = 'new_group_member';


        console.log(date);
        mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.from_user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, l, 1], (err, row1) => {
            console.log(err);
            mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, c, 1], (err, row2) => {
                console.log(err);
                mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, b, 1], (err, row3) => {
                    console.log(err);
                    mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.from_user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, s, 1], (err, row4) => {
                        console.log(err);
                        mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.from_user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, d, 1], (err, row5) => {
                            console.log(err);
                            mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.from_user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, es, 1], (err, row6) => {
                                console.log(err);
                                mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, a, 1], (err, row7) => {
                                    console.log(err);
                                    mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, ts, 1], (err, row8) => {
                                        console.log(err);
                                        mysqlconnection.query('select notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, tr, 1], (err, row9) => {
                                            console.log(err);
                                            mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, tp, 1], (err, row10) => {
                                                console.log(err);
                                                mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, tc, 1], (err, row11) => {
                                                    console.log(err);
                                                    mysqlconnection.query('select notifications.id,notifications.tutorial_id,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join tutorials on notifications.tutorial_id = tutorials.id where notifications.platform_id=? and notifications.user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, ngm, 1], (err, row12) => {
                                                        console.log(err);
                                                        mysqlconnection.query('select notifications.id,notifications.tutorial_id,users.first_name,users.last_name,tutorials.title,notifications.type,notifications.created,notifications.message from notifications left join TuitifyXelorDemo.tutorials on notifications.tutorial_id = tutorials.id left join users on notifications.user_id = users.id where notifications.platform_id=? and notifications.from_user_id=? and notifications.type=? and notifications.is_activity=? order by notifications.created desc', [req.query.platform_id, req.query.id, f, 1], (err, row13) => {
                                                            console.log(err);

                                                            if (row1.length > 0 || row2.length > 0 || row3.length > 0 || row4.length > 0 || row5.length > 0 || row6.length > 0 || row7.length > 0 || row8.length > 0 || row9.length > 0 || row10.length > 0 || row11.length > 0 || row12.length > 0 || row13.length > 0) {

                                                                res.send({
                                                                    status: 'true',
                                                                    activities: row1.concat(row2).concat(row3).concat(row4).concat(row5).concat(row6).concat(row7).concat(row8).concat(row9).concat(row10).concat(row11).concat(row12).concat(row13),
                                                                    message: 'success'
                                                                })

                                                            }
                                                            else {
                                                                res.send({
                                                                    status: 'false',
                                                                    activities: [],
                                                                    message: 'failed'
                                                                })


                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})


//end

//group chat user


app.post('/group_create?', (req, res) => {

    if (!req.body.name == '') {
        console.log(req)
        plat(req.body.name);

        var group = req.body.users;
        var colors = req.body.colors;
        console.log(group);

        mysqlconnection.query("insert into group_name (group_title) values(?)", [req.body.group_title], (err, row) => {
            console.log(row.insertId);
            if (!err) {
                for (let i = 0; i < group.length; i++) {

                    mysqlconnection.query("insert into group_chat_user (user_id,group_id,role,color) values(?,?,?,?)", [group[i], row.insertId, 0, colors[i]], (err, row1) => {
                        console.log(err);

                        if (group.length - 1 == i || group.length == 1) {

                            mysqlconnection.query("insert into group_chat_user (user_id,group_id,role,color) values(?,?,?,?)", [req.body.creator, row.insertId, 1, req.body.c_color], (err, row1) => {
                                mysqlconnection.query("select users.first_name,users.last_name from users where id = ?", [req.body.creator], (err, row12) => {
                                    var m = 'This group is created by ' + ' ' + row12[0].first_name + ' ' + row12[0].last_name;
                                    mysqlconnection.query("insert into group_chat_messages (user_id,group_id,message,created) values(?,?,?,?)", [req.body.creator, row.insertId, m, req.body.created], (err, row1) => {
                                        console.log(err);
                                        mysqlconnection.query('SELECT user_id,group_id,message,created FROM group_chat_messages where group_id = ? order by created desc', [row.insertId], (err, group1) => {
                                            mysqlconnection.query('SELECT users.image,group_chat_user.group_id,group_chat_user.color FROM group_chat_user left join users on group_chat_user.user_id = users.id where group_chat_user.group_id = ?', [row.insertId], (err, group12) => {

                                                res.send({
                                                    status: 'true',
                                                    group: group1.concat(group12),
                                                    message: 'Group Created',
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }

                    })
                }
            }
            else {
                res.send({
                    err: err
                })
            }
        });


    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end

//group_chat_messages

app.get('/group_chat_messages?', (req, res) => {

    if (!req.query.name == '') {
        console.log(req)
        plat(req.query.name);

        mysqlconnection.query("SELECT group_chat_messages.id,users.image,users.first_name,users.last_name,group_chat_messages.user_id,group_chat_messages.message,group_chat_messages.created from group_chat_messages left join users on group_chat_messages.user_id = users.id where group_chat_messages.group_id=? order by created desc", [req.query.group_id], (err, row) => {
            if (row.length > 0) {

                for (let i = 0; i < row.length; i++) {
                    mysqlconnection.query("SELECT color FROM group_chat_user where user_id=? and group_id=?;", [row[i].user_id, req.query.group_id], (err, row1) => {
                        row[i].color = row1[0].color;
                        if (row.length - 1 == i || row.length == 1) {

                            res.send({
                                status: 'true',
                                messages: row,
                            });

                        }
                    })

                }
            }

            else {
                res.send({
                    err: err,
                    status: 'false',
                    messages: [],
                })
            }
        });


    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }
})

//end

//ratings to tuities
app.post('/rate_tuity?', (req, res) => {

    if (!req.query.name == '') {

        plat(req.query.name);

        mysqlconnection.query('select * from ratings where platform_id=? and user_id=? and tutorial_id=?', [req.query.p_id, req.query.u_id, req.query.t_id], (err, row1) => {

            if (row1.length > 0) {
                res.send({
                    status: 'false',
                    message: 'you alredy rated'

                })
            }
            else {
                mysqlconnection.query('insert into ratings (platform_id,user_id,tutorial_id,rating,created) values(?,?,?,?,?)', [req.query.p_id, req.query.u_id, req.query.t_id, req.query.rating, req.query.created], (err, row) => {

                    mysqlconnection.query('select * from ratings where platform_id=? and tutorial_id=?', [req.query.p_id, req.query.t_id], (err, row11) => {
                        console.log(row11);
                        mysqlconnection.query('SELECT sum(rating) as sum FROM ratings where tutorial_id=?', [req.query.t_id], (err, row1111) => {
                            var total = row1111[0].sum / row11.length

                            mysqlconnection.query('update tutorials set avg_rating = ? where id=?', [total, req.query.t_id], (err, row11) => {

                                console.log(total);
                            })

                        })



                        if (!err) {
                            res.send({
                                status: 'true',
                                message: 'you successfuly rated'
                            })
                        } else {
                            res.send({
                                status: 'false',
                                message: 'failed'
                            })
                        }
                    })
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




//search api for multiples 
app.get('/search?', (req, res) => {
    if (!req.query.name == '') {

        plat(req.query.name);



        var string = req.query.string;
        var keyword = req.query.keyword;
        if (string !== '') {
            if (req.query.lastindex == '') {
                switch (keyword) {
                    case "tuties":

                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.title LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? order by tutorials.id desc limit 10", [req.query.platform_id], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tuties: row,
                                    message: 'success',
                                    button: true
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tuties: [],
                                    message: 'fail',
                                    button: false
                                });
                            }

                        })


                        break;
                    case "tags":
                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.tages LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? order by tutorials.id desc limit 10", [req.query.platform_id], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tags: row,
                                    message: 'success',
                                    button: true
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tags: [],
                                    message: 'fail',
                                    button: false
                                });
                            }

                        });
                        break;
                    case "tracks":
                        mysqlconnection.query('select count(tutorials.id),users.id,users.first_name,users.last_name,users.image,tutorials.id,tutorials.thumbnail,tutorials.avg_rating,tutorials.description from tutorials INNER JOIN users on tutorials.user_id=users.id where tutorials.title=?', [string], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tuties: row,
                                    message: 'success',
                                    button: true
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tuties: [],
                                    message: 'fail',
                                    button: false
                                });
                            }

                        });
                        break;
                    case "groups":

                        mysqlconnection.query("select groups.name,groups.id,count(group_users.user_id) as total_users from groups LEFT JOIN group_users on groups.id=group_users.group_id where groups.name LIKE '%" + string + "%' and groups.platform_id=? order by groups.id desc limit 10 group BY(groups.name)", [req.query.platform_id], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    groups: row,
                                    message: 'success',
                                    button: true
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    groups: [],
                                    message: 'fail',
                                    button: false
                                });
                            }

                        });
                        break;
                    case "users":
                        mysqlconnection.query("select id,image,first_name,last_name,description,position,department from users WHERE (first_name LIKE '%" + string + "%' or last_name LIKE '%" + string + "%') and platform_id=? order by users.id desc limit 10", [req.query.platform_id], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    users: row,
                                    message: 'success',
                                    button: true
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    users: [],
                                    message: 'fail',
                                    button: false
                                });
                            }

                        });
                        break;
                    default:
                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.title LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? order by tutorials.id desc limit 10", [req.query.platform_id], (err, row) => {
                            mysqlconnection.query("select groups.name,groups.id,count(group_users.user_id) as total_users from groups INNER JOIN group_users on groups.id=group_users.group_id where groups.name LIKE '%" + string + "%' and groups.platform_id=? order by groups.id desc limit 10 group BY(groups.name)", [req.query.platform_id], (err, row1) => {
                                mysqlconnection.query("select id,image,first_name,last_name,description,position,department from users WHERE (first_name LIKE '%" + string + "%' or last_name LIKE '%" + string + "%') and platform_id=? order by users.id desc limit 10", [req.query.platform_id], (err, row2) => {
                                    mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.tages LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? order by tutorials.id desc limit 10", [req.query.platform_id], (err, row112) => {

                                        if (!err) {
                                            res.send({
                                                status: 'true',
                                                tuties: row,
                                                tags: row112,
                                                groups: row1,
                                                users: row2,
                                                message: 'success',
                                                button: true
                                            });
                                        } else {
                                            res.send({
                                                status: 'fail',
                                                tuties: [],
                                                tags: [],
                                                groups: [],
                                                users: [],
                                                message: 'fail',
                                                button: false
                                            });
                                        }

                                    })
                                })
                            })
                        })
                }
            }
            else {
                switch (keyword) {
                    case "tuties":

                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials LEFT JOIN users on tutorials.user_id=users.id left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.title LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? and tutorials.id<? order by tutorials.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tuties: row,
                                    message: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tuties: [],
                                    message: 'fail'
                                });
                            }

                        });



                        break;
                    case "tags":
                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.tages LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? and tutorials.id<? order by tutorials.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tags: row,
                                    message: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tags: [],
                                    message: 'fail'
                                });
                            }

                        });
                        break;
                    case "tracks":
                        mysqlconnection.query('select count(tutorials.id),users.id,users.first_name,users.last_name,users.image,tutorials.id,tutorials.thumbnail,tutorials.avg_rating,tutorials.description from tutorials INNER JOIN users on tutorials.user_id=users.id where tutorials.title=?', [string], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    tuties: row,
                                    message: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    tuties: [],
                                    message: 'fail'
                                });
                            }

                        });
                        break;
                    case "groups":

                        mysqlconnection.query("select groups.name,groups.id,count(group_users.user_id) as total_users from groups LEFT JOIN group_users on groups.id=group_users.group_id where groups.name LIKE '%" + string + "%' and groups.platform_id=? and groups.id<? order by groups.id desc limit 10 group BY(groups.name)", [req.query.platform_id, req.query.lastindex], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    groups: row,
                                    message: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    groups: [],
                                    message: 'fail'
                                });
                            }

                        });
                        break;
                    case "users":
                        mysqlconnection.query("select id,image,first_name,last_name,description,position,department from users WHERE (first_name LIKE '%" + string + "%' or last_name LIKE '%" + string + "%') and platform_id=? and users.id<? order by users.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row) => {
                            if (row.length > 0) {
                                res.send({
                                    status: 'true',
                                    users: row,
                                    message: 'success'
                                });
                            } else {
                                res.send({
                                    status: 'fail',
                                    users: [],
                                    message: 'fail'
                                });
                            }

                        });
                        break;
                    default:
                        mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials LEFT JOIN users on tutorials.user_id=users.id left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.title LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? and tutorials.id<? order by tutorials.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row) => {
                            mysqlconnection.query("select groups.name,groups.id,count(group_users.user_id) as total_users from groups INNER JOIN group_users on groups.id=group_users.group_id where groups.name LIKE '%" + string + "%' and groups.platform_id=? and groups.id<? order by groups.id desc limit 10 group BY(groups.name)", [req.query.platform_id, req.query.lastindex], (err, row1) => {
                                mysqlconnection.query("select id,image,first_name,last_name,description,position,department from users WHERE (first_name LIKE '%" + string + "%' or last_name LIKE '%" + string + "%') and platform_id=? and users.id<? order by users.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row2) => {
                                    mysqlconnection.query("select users.id as user_id,tutorial_groups.group_id,users.first_name,users.last_name,users.image,tutorials.id as tutorial_id,tutorials.title as tuity_title,tutorials.thumbnail,tutorials.avg_rating,tutorials.description,categories.title as category_title from tutorials left join tutorial_groups on tutorials.id=tutorial_groups.tutorial_id LEFT JOIN users on tutorials.user_id=users.id LEFT JOIN categories on tutorials.category_id=categories.id where tutorials.tages LIKE '%" + string + "%' and tutorials.share_with_publishers=2 and tutorials.status=1 and tutorials.platform_id=? and tutorials.id<? order by tutorials.id desc limit 10", [req.query.platform_id, req.query.lastindex], (err, row1112) => {

                                        if (!err) {
                                            res.send({
                                                status: 'true',
                                                tuties: row,
                                                tags: row1112,
                                                groups: row1,
                                                users: row2,
                                                message: 'success'
                                            });
                                        } else {
                                            res.send({
                                                status: 'fail',
                                                tuties: [],
                                                tags: [],
                                                groups: [],
                                                users: [],
                                                message: 'fail'
                                            });
                                        }

                                    })
                                })
                            })

                        })
                }
            }
        }

        else {

            res.send({
                status: 'false',
                tuties: [],
                tags: [],
                groups: [],
                users: [],
                message: 'string must not be empty'
            });
        }
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

});

//group_users

app.get('/groups_users?', (req, res) => {
    if (!req.query.name == '') {


        plat(req.query.name);

        const a = [];
        mysqlconnection.query('select users.id,users.image from group_users LEFT JOIN users on users.id=group_users.user_id where group_users.group_id=?', (req.query.id), (err, row) => {
            for (var i = 0; i < row.length; i++) {
                a.push(row[i].image);
            }

            if (row.length > 0) {
                res.send({
                    status: 'true',
                    group_users: a,
                    message: 'success'
                });
            } else {
                res.send({
                    status: 'fail',
                    group_users: [],
                    message: 'fail'
                });
            }

        })
    }
    else {
        res.send({
            message: 'no platform selected'
        })
    }

})


//search now api 
app.get('/searchnow', (req, res) => {

    const search = [
        {
            title: 'All',
            checked: false,
        },
        {
            title: 'Tuities',
            checked: false,
        },
        {
            title: 'Tuities',
            checked: false,
        },
        {
            title: 'Hello Stephane',
            checked: true,
        },
        {
            title: 'Tuitor Tryal',
            checked: true,
        },
        {
            title: 'Formation Tuitor',
            checked: true,
        },
        {
            title: 'Tuities',
            checked: false,
        },
    ];

    for (let i = 0; i < search.length; i++) {
        if (search[i].checked === true) {

            var sql = "SELECT * FROM tutorials Where title = ?";
            mysqlconnection.query(sql, [search[i].title], (err, rows) => {



                const obj = {
                    name: 'Jean-Luc Picard',
                    rank: 'Captain'
                };

                // Prints "Jean-Luc Picard" followed by "Captain"
                Object.values(rows[0]).forEach(val => {
                    obj['search'] = val;
                    //console.log(val);
                });
                res.sendStatus(val);


            })

        }

    }



});



//api for gettoken

async function getToken() {
    //Issuer.defaultHttpOptions.timeout = 10000;
    const maamAuth = await Issuer.discover('https://maam.axa.com/maam/v2/.well-known/openid-configuration');
    const client = await new maamAuth.Client({
        client_id: '288a68d0',
        client_secret: 'FkM7DNCETZHzb5p14IB05Hki_4KYluY8zZDGlHGn2I_8tIDnEfaksQ'
    });
    const token = await client.grant({
        grant_type: 'client_credentials',
        scope: 'urn:scope_1 urn:scope_2'
    });
    return token;
}

app.get('/gettoken', (req, res) => {
    getToken();
})


//get single data 
app.get('/getdata/:id', (req, res) => {

    mysqlconnection.query('SELECT * from name WHERE id=?', [req.params.id], (err, rows, _fields) => {

        if (!err) {
            res.send(rows);
        } else {
            res.send(err);
        }

    })

});


//delete data 
app.delete('/getdata/:id', (req, res) => {

    mysqlconnection.query('delete FROM name WHERE id=?', [req.params.id], (err, _rows, _fields) => {

        if (!err) {
            res.send('Deleted Successfuly');
        } else {
            res.send(err);
        }

    })

});

//insert data 
app.post('/getdata', (req, res) => {
    let emp = req.body;
    var sql = 'INSERT into name(id,name,data_added) values(?,?,?)'
    mysqlconnection.query(sql, [emp.id, emp.name, emp.data_added], (err, _rows, _fields) => {

        if (!err) {
            res.send('Inserted Successfully');
        } else {
            res.send(err);
        }

    })

});


//update data 
app.put('/getdata', (req, res) => {
    let emp = req.body;
    var sql = 'UPDATE name SET name = ?, data_added = ? WHERE id = ?'
    mysqlconnection.query(sql, [emp.name, emp.data_added, emp.id], (err, _rows, _fields) => {

        if (!err) {
            res.send('Updated Successfully');
        } else {
            res.send(err);
        }

    })

});



