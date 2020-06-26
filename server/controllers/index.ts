import * as express from 'express';
import user from './user.controller';
import talent from './talent.controller';

const router = express.Router();

router.use('/talent', talent);
router.use('/user', user);

export default router;
