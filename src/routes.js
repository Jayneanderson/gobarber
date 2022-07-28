// constar o Router para separar a parte de roteamento do express
const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer.js');

const UserController = require('./app/controllers/UserController.js');
const SessionController = require('./app/controllers/SessionController.js');
const FileController = require('./app/controllers/FileController.js');
const ProviderController = require('./app/controllers/ProviderController.js');
const AppointmentController = require('./app/controllers/AppointmentController.js');
const AppointmentProviderController = require('./app/controllers/AppointmentProviderController.js');


const authMiddlware = require('./app/middlewares/auth.js');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//esta rota não deve sair daqui porque se eu rodar o update, será verificado isso aqui primeiro.
routes.use(authMiddlware);

routes.patch('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/appointments/providers', AppointmentProviderController.index);

routes.post('/files', upload.single('file'), FileController.fileUpload);

// module.exports = routes;
module.exports = routes;
