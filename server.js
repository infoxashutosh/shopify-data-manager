require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Helper: Get store credentials by easily-remembered short name
function getStoreCredentials(store) {
  let credentials = {};
  switch (store) {
    case 'studio':
      credentials = {
        shop: process.env.STUDIO_SHOP,
        token: process.env.STUDIO_ACCESS_TOKEN,
        version: '2023-10' // You can set desired version here
      };
      break;
    case 'zaor':
      credentials = {
        shop: process.env.ZAOR_SHOP,
        token: process.env.ZAOR_ACCESS_TOKEN,
        version: '2023-10'
      };
      break;
    case 'guinois':
      credentials = {
        shop: process.env.GUINOIS_SHOP,
        token: process.env.GUINOIS_PASSWORD, // For private apps, this can be API password
        version: process.env.GUINOIS_API_VERSION || '2023-10'
      };
      break;
    default:
      throw new Error('Unknown store');
  }
  return credentials;
}

// Root
app.get('/', (req, res) => {
  res.send('Shopify Data Manager server is running!');
});

// Modular route for any store: /products/:store
app.get('/products/:store', async (req, res) => {
  try {
    const store = req.params.store; // 'studio', 'zaor', or 'guinois'
    const { shop, token, version } = getStoreCredentials(store);

    const url = `https://${shop}/admin/api/${version}/products.json?limit=5`;

    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': token
      }
    });

    res.json({
      source: store,
      products: response.data.products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
