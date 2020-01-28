import express from 'express';

import { initializeLoaders } from './loaders';

async function startServer() {
  const app = express();

  await initializeLoaders(app);

  const port = process.env.APP_PORT || 9001;
  app.listen(port, () => console.log(`Application listening on port ${port}`));
}

startServer();
