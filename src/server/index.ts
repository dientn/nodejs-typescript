
import dotenv from 'dotenv';

dotenv.config();

// console.log(Object.keys(process.env))
import './database'
import server from './server';

// import  './database';

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));