// import api from './api'; // to be done
// import config from './config';
// import errorHandler from './lib/errorHandler';

import express from 'express';
import frontend from './frontend';

const app = express();

// app.use('/api/v1', api);
// app.use(errorHandler);
app.use(frontend);

// const {port} = config;
const port = 8000;

app.listen(port, () => {
	console.log('Server started at port %d', port);
});
