var express = require('express');
var router = express.Router();

let MongoClient = require('mongodb-legacy').MongoClient
// let client = new MongoClient('mongodb://127.0.0.1:27017')
let client = new MongoClient('mongodb+srv://itc:itc.edu.vn@cluster0.gwdqy3q.mongodb.net/')


let csdl = client.db('quanlynhanvien')

let dieukiencantim = {}

router.get('/', function (req, res, next) {
  dieukiencantim = {}
  res.redirect('/1')
});

function HienThi(req, res) {
  let tranghientai = req.params.page || 1
  let soluong = 3
  let tongsonhanvien
  csdl.collection('nhanvien')
    .countDocuments()
    .then((count) => {
      tongsonhanvien = count
      const trangcuoicung = Math.ceil(tongsonhanvien / soluong)
      csdl.collection('nhanvien').find(dieukiencantim)
        .skip((tranghientai - 1) * soluong)
        .limit(soluong)
        .toArray()
        .then(dsnv => {
          res.render('xemdsnv.ejs', { dsnv, tranghientai, tongsonhanvien, trangcuoicung })
        })
    })
    .catch(() => { res.end('ko xem duoc du lieu') })
}

router.get('/tim', function (req, res, next) {
  res.render('timnv.ejs');
})
router.post('/tim', function (req, res, next) {
  dieukiencantim = { ten: { $regex: req.body.txtTen, $options: 'i' } }
  HienThi(req, res)
});
router.get('/:page', function (req, res, next) {
  HienThi(req, res)
});


module.exports = router;
