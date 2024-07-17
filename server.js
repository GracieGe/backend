const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// 配置静态文件目录
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});