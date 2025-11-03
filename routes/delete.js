var express = require('express');
var routerDelete = express.Router();

let {MongoClient,ObjectId} = require('mongodb-legacy')
// let client = new MongoClient('mongodb://127.0.0.1:27017')
let client = new MongoClient('mongodb+srv://itc:itc.edu.vn@cluster0.gwdqy3q.mongodb.net/')


let csdl = client.db('quanlynhanvien')

routerDelete.route('/').post(function (req, res, next) {
  let dulieucanxoa = { ten: req.body.txtTen }
  csdl.collection('nhanvien').deleteOne(dulieucanxoa)
    .then(() => { res.redirect('/') })
    .catch(() => { res.end('ko xoa duoc du lieu') })
});

routerDelete.route('/:maso').get(function (req, res, next) {
  let dieukien = { _id: new ObjectId(req.params.maso) }
  csdl.collection('nhanvien').deleteOne(dieukien)
    .then(() => { res.redirect('/') })
    .catch(() => { res.end('ko xoa duoc du lieu') })
});

module.exports = routerDelete;
