const express = require('express');
const app = express();

// Fake database (replace later with real data)
const products = {
  milk: [
    { platform: "Blinkit", price: 52 },
    { platform: "Zepto", price: 50 },
    { platform: "Instamart", price: 48 }
  ],
  rice: [
    { platform: "Blinkit", price: 120 },
    { platform: "Zepto", price: 115 },
    { platform: "Instamart", price: 110 }
  ]
};

// API
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  const result = products[query] || [];

  res.json(result);
});

// UI
app.get('/', (req, res) => {
  res.send(`
  <html>
  <head>
    <title>OptiCart Hyderabad</title>
  </head>

  <body style="background:#0a0a0a;color:white;font-family:sans-serif;text-align:center;padding:40px;">

    <h1 style="color:#00ff88;font-size:40px;">🛒 OptiCart Hyderabad</h1>
    <p style="color:#aaa;">Compare Prices Instantly</p>

    <input id="searchBox" placeholder="Search product (milk, rice...)" 
      style="padding:15px;width:300px;border-radius:10px;border:none;margin-top:20px;" />

    <button onclick="search()" 
      style="padding:15px 25px;margin-left:10px;background:#00ff88;border:none;border-radius:10px;font-weight:bold;">
      Search
    </button>

    <div id="results" style="margin-top:40px;"></div>

    <script>
      async function search() {
        const query = document.getElementById('searchBox').value;

        const res = await fetch('/api/search?q=' + query);
        const data = await res.json();

        if (data.length === 0) {
          document.getElementById('results').innerHTML = "<p>No data found</p>";
          return;
        }

        let cheapest = Math.min(...data.map(d => d.price));

        let html = "<h2>Results</h2><div style='display:flex;justify-content:center;gap:20px;'>";

        data.forEach(item => {
          let highlight = item.price === cheapest ? "border:2px solid #00ff88;" : "border:1px solid #333;";

          html += \`
            <div style="padding:20px;border-radius:15px;\${highlight};background:#111;width:150px;">
              <h3>\${item.platform}</h3>
              <p style="font-size:20px;">₹\${item.price}</p>
              \${item.price === cheapest ? "<p style='color:#00ff88;'>Cheapest 🏆</p>" : ""}
            </div>
          \`;
        });

        html += "</div>";
        document.getElementById('results').innerHTML = html;
      }
    </script>

  </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running'));
