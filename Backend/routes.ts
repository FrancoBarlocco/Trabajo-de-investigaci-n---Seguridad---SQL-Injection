import { Router } from 'express';
import { login } from './UserController';

const router = Router();

router.post('/login', login);

export default router;