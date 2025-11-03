var express = require('express');
var routerInsert = express.Router();

let MongoClient = require('mongodb-legacy').MongoClient
// let client = new MongoClient('mongodb://127.0.0.1:27017')
let client = new MongoClient('mongodb+srv://itc:itc.edu.vn@cluster0.gwdqy3q.mongodb.net/')


let csdl = client.db('quanlynhanvien')

routerInsert
            .route('/')
            .get(function (req, res, next) {
              res.render('themnv.ejs');
            })
            .post(function (req, res, next) {
              if (!req.files || Object.keys(req.files).length === 0) {
                let nv = {
                  ten: req.body.txtTen,
                  tuoi: req.body.txtTuoi
                }
                csdl.collection('nhanvien').insertOne(nv)
                  .then(() => { res.redirect('/') })
                  .catch(() => { res.end('ko chen duoc du lieu') })
                return
              }
              let uploadedFile = req.files.myFile;
              uploadedFile.mv('public/hinhanh/' + uploadedFile.name, (err) => {
                if (err) {
                  return res.status(500).send(err);
                }
                let nv = {
                  ten: req.body.txtTen,
                  tuoi: req.body.txtTuoi,
                  hinh: uploadedFile.name
                }
                csdl.collection('nhanvien').insertOne(nv)
                  .then(() => { res.redirect('/') })
                  .catch(() => { res.end('ko chen duoc du lieu') })
              });
            });

module.exports = routerInsert;
