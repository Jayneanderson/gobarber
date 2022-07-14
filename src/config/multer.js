const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),

        filename: (req, file, cb) => {
            //como vamos formatar o nome do arquivo para não deixar o nome igual ao que o cliente manda
            //vamos colocar o nome aleatório no nome do arquivo com o crypto
            crypto.randomBytes(16, (err, res) => {
                //função que precisa executar com o nome do arquivo ou com o erro
                if (err) { return cb(err) }

                return cb(null, res.toString('hex') + extname(file.originalname)) 
            })
        }
    }),
};