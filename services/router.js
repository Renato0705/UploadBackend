const express    = require('express');
const router     = new express.Router('express-promise-router');
const bodyParser = require('body-parser');
router.use(bodyParser.json({limit: '50mb'}));
const { validate, ValidationError, Joi } = require('express-validation');
const multer     = require('multer') ;
const upload     = multer();

const uploadFile = require('../controllers/upload.js'); 
const funcionarios= require('../controllers/funcionarios');
  

router.post('/uploadfile', 
            upload.single('file'),
            uploadFile.uploadFile) 
   .post(funcionarios.post);

router.route('/upload') 
.get(funcionarios.get)
.post(funcionarios.post);   


module.exports = router;
