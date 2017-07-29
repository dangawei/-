var express = require('express');
var router = express.Router();
var conn = require('../mysql/dbPool');

/* GET home page. */
router.get('/', function (req, res, next) {
    conn.query('select * from news order by id desc limit 3',function (err,result) {
        if(err){
            return console.log(err.message);
        }
        res.render('index', {
            title: '新乡市中富科技股份有限公司',
            news : result
        });
    })
});

router.get('/recruit', function(req, res, next) {
    conn.query('select * from join_us',function (err,result) {
        if(err){
            return console.log(err.message);
        }
        res.render('recruit', {
            title: '人才招聘-新乡市中富科技股份有限公司',
            data : result
        });
    })
});
router.get('/join', function(req, res, next) {
    console.log(req.query.job)
    res.render('join', {
        title: '人才招聘-新乡市中富科技股份有限公司',
        job: req.query.job
    });
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {title: '联系我们-新乡市中富股份科技有限公司'});
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
});

router.get('/products', function (req, res, next) {
    conn.query('select * from product', function (err, rows) {
        if (err) {
            return console.log(err.message);
        } else {
            res.render('products', {title: 'Express', products: rows});
        }
    });

});
router.get('/product', function (req, res, next) {
    conn.query('select * from product where id = ?',req.query.id,function (err, row) {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(row);
            res.render('product', {title: 'Express', product: row});
        }
    });

});

router.get('/sale', function (req, res, next) {
    res.render('sale', {
        title: 'Express',
    });
});

router.get('/service', function(req, res, next) {
    res.render('service', {
        title: 'Express',
    });
});
router.get('/news', function(req, res, next) {
    conn.query('select * from news order by id desc',function(err,result){
        console.log(result);
        if (err) {
            return console.log(err.message);
        } else {
            console.log("----------------------數據查詢成功---------------");
            res.render('news', {title: 'Express', product: result});
        }
    })
});
router.get('/news_detail', function(req, res, next) {
    var number = parseInt(req.query.id)+ 1;
    conn.query('select * from news where id=?',[req.query.id],function(err,result){
        if (err) {
            return console.log(err.message);
        } else {

            res.render('news_detail', {title: 'Express', product: result});
        }
    })
});

router.get('/admin', function (req, res, next) {
    res.render('admin', {
        title: 'Express',
        layout:''
    });
});
//后台管理-start
router.get('/ht_news', function (req, res, next) {
    conn.query('select * from news', function (err, results) {
        if (!err) {
            return res.send({
                results: results
            })
        }
    })
});
router.put('/cmt_new', function (req, res, next) {
    var obj_new = req.body;
    conn.query('update news set ? where id = ?', [obj_new, obj_new.id], function (err) {
        if (err) {
            return res.send({
                success: false
            });
        }
        return res.send({
            success: true
        });
    })
});
router.get('/ht_products', function (req, res, next) {
    conn.query('select * from product', function (err, results) {
        if (err) {
            return console.log(err.message);
        } else {
            return res.send({
                results: results
            })
        }
    });
});
router.delete('/del_new/:id', function (req, res) {
    console.log(req.params.id);
    conn.query('delete from news where id = ?', req.params.id, function (err, result) {
        if (err) {
            return res.send({
                success: false,
                data: err.message
            });
        }
        res.send({
            success: true
        });
    });
});
router.post('/add_new', function (req, res) {
    console.log(req.body);
    conn.query('insert into news SET ?',req.body,function(err){
        if (err) {
            return res.send({
                success: false
            });
        }
        res.send({
            success: true
        });
    });
});
//后台管理 -end
router.get('/error', function (req, res, next) {
    res.render('error', {title: '对不起，页面发生错误！'});
});

module.exports = router;
