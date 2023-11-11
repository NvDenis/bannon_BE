import express from 'express'
import userController from '../controllers/user.js'
import verifyToken from '../middlewares/verifyToken.js';


const router = express.Router();


router.get('/', verifyToken, (req, res) => {
    return res.send('hello world 2 ');
})

router.post('/login', userController.login)
router.post('/register', userController.register)
router.get('/refreshToken', userController.refreshToken)
router.get('/account', verifyToken, userController.fetchAccount)
router.post('/logout', verifyToken, userController.logout)



export default router;