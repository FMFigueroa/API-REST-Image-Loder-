import app from './app.js'
import dbConnect from './config/dbConnect.js'
import { PORT } from './config.js';

const port = PORT || 3000;

async function main() {
  await dbConnect();
  app.listen(port);
  console.log(`Server is running succesfully 🚀 ${port}` )
}

main();