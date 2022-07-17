const File = require('../models/File.js');

class FileController {
    async fileUpload(req, res) {
        const { originalname: name, filename: path } = req.file;
        const file = await File.create({
            name,
            path,
        });
        return res.json(file);
    }
}

module.exports = new FileController();