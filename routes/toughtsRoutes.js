const express = require("express");
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

//helper
const checkAuth = require('../helpers/auth').checkAuth // valida se o usuário está logado, caso não redireciona para pagina de login

router.get('/add',checkAuth,ToughtsController.createTought)
router.post('/add',checkAuth,ToughtsController.createToughtSave)
router.post('/edit',checkAuth,ToughtsController.updateToughtPost)
router.get('/edit/:id',checkAuth,ToughtsController.updateTought)
router.get('/dashboard',checkAuth,ToughtsController.dashboard)
router.post('/remove',checkAuth,ToughtsController.removeTought)
router.get('/',ToughtsController.showToughts)

module.exports = router