const express = require('express');

const router = express.Router();
const fs = require('fs');
const multiparty = require('multiparty');


router.post('/', (req, res, next) => {
  // create a form to begin parsing
  const form = new multiparty.Form();
  const uploadFile = { uploadPath: '', type: '', size: 0 };
  const maxSize = 2 * 1024 * 1024; // 2MB
  const supportMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const errors = [];

  form.on('error', (err) => {
    if (fs.existsSync(uploadFile.path)) {
      fs.unlinkSync(uploadFile.path);
      console.log('error');
    }
  });

  form.on('close', () => {
    if (errors.length == 0) {
      res.send({ status: 'ok', text: 'Success' });
    } else {
      if (fs.existsSync(uploadFile.path)) {
        fs.unlinkSync(uploadFile.path);
      }
      res.send({ status: 'bad', errors });
    }
  });

  // listen on part event for image file
  form.on('part', (part) => {
    uploadFile.size = part.byteCount;
    uploadFile.type = part.headers['content-type'];
    uploadFile.path = `./files/${part.filename}`;

    if (uploadFile.size > maxSize) {
      errors.push(`File size is ${uploadFile.size / 1024 / 1024}. Limit is${maxSize / 1024 / 1024}MB.`);
    }

    if (supportMimeTypes.indexOf(uploadFile.type) == -1) {
      errors.push(`Unsupported mimetype ${uploadFile.type}`);
    }

    if (errors.length == 0) {
      const out = fs.createWriteStream(uploadFile.path);
      part.pipe(out);
    } else {
      part.resume();
    }
  });

  // parse the form
  form.parse(req);
});

module.exports = router;
