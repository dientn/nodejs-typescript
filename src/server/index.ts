
import dotenv from 'dotenv';

dotenv.config();

import connectDb from './database'
import server from './server';
import './configs/passport'

connectDb()

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));