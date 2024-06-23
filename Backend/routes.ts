import { Router } from 'express';
import { login } from './UserController';
import { loginInjection } from './UserController';

const router = Router();

//router.post('/login', login);
router.post('/login', loginInjection);
export default router;