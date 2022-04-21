import {Router} from 'express';
const router = Router();

router.get('/', (req,res) => res.send('Hello Wordl'));
router.get('/ping', (req,res) => res.send('Pong'));

export default router;