const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const deviceInfo = {
  device: process.env.GOVEE_DEVICE_ID,
  model: process.env.GOVEE_MODEL,
};

const goveeApiKey = process.env.GOVEE_API_KEY;

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.header('X-API-Key'); 

  if (apiKey === process.env.KRUSH_API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.use('/control', apiKeyMiddleware);

app.post('/control', async (req, res) => {
  try {
    const { brightness, r, g, b } = req.body;

    const brightnessBody = {
      ...deviceInfo,
      cmd: {
        name: 'brightness',
        value: brightness,
      },
    };

    const brightnessResponse = await axios.put('https://developer-api.govee.com/v1/devices/control', brightnessBody, {
      headers: {
        'Govee-API-Key': goveeApiKey,
      },
    });

    const colorBody = {
      ...deviceInfo,
      cmd: {
        name: 'color',
        value: {
          r,
          g,
          b,
        },
      },
    };

    const colorResponse = await axios.put('https://developer-api.govee.com/v1/devices/control', colorBody, {
      headers: {
        'Govee-API-Key': goveeApiKey,
      },
    });

    res.status(200).json({
      brightness: brightnessResponse.data,
      color: colorResponse.data,
    });
  } catch (error) {
    console.error('Error setting brightness and color:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
