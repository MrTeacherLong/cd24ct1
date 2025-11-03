var express = require('express');
var routerUpdate = express.Router();
let { MongoClient, ObjectId } = require('mongodb-legacy')
// let client = new MongoClient('mongodb://127.0.0.1:27017')
let client = new MongoClient('mongodb+srv://itc:itc.edu.vn@cluster0.gwdqy3q.mongodb.net/')


let csdl = client.db('quanlynhanvien')

//=====================SUA => update.js
routerUpdate.route('/:maso')
  .get(function (req, res, next) {
    let dieukien = { _id: new ObjectId(req.params.maso) }
    // select _id,ten,tuoi from nhanvien where _is=dieukien
    csdl.collection('nhanvien').findOne(dieukien)
      .then((nv) => {
        res.render('suanv.ejs', { nv })
      })
      .catch(() => { res.end('ko lay duoc du lieu de sua') })
  })

routerUpdate.route('/')
  .post(function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
      let dieukien = { _id: ObjectId.createFromHexString(req.body.txtMaso) }
      let dulieumoi = {
        $set: { ten: req.body.txtTen, tuoi: req.body.txtTuoi }
      }
      csdl.collection('nhanvien').updateOne(dieukien, dulieumoi)
        .then(() => { res.redirect('/') })
        .catch(() => { res.end('ko sua duoc du lieu') })
      return
    }
    let uploadedFile = req.files.myFile;
    uploadedFile.mv('public/hinhanh/' + uploadedFile.name, (err) => {
      if (err) { return res.status(500).send(err); }
      let dieukien = { _id: ObjectId.createFromHexString(req.body.txtMaso) }
      let dulieumoi = {
        $set: {
          ten: req.body.txtTen,
          tuoi: req.body.txtTuoi,
          hinh: uploadedFile.name
        }
      }
      csdl.collection('nhanvien').updateOne(dieukien, dulieumoi)
        .then(() => { res.redirect('/') })
        .catch(() => { res.end('ko sua duoc du lieu') })
    });
  });

module.exports = routerUpdate;
