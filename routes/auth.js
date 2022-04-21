import {Router} from 'express';
const router = Router();
import  { registerCtrl, loginCtrl } from "../controllers/auth.controllers.js";
import { validateRegister, validateLogin } from "../validators/auth.validators.js";


router.post("/register", validateRegister, registerCtrl);
router.post("/login", validateLogin, loginCtrl);


export default router;