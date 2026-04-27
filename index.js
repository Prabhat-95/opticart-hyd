const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="background: #0a0a0a; color: #00ff88; font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="font-size: 3rem;">OptiCart Hyderabad</h1>
        <p style="color: white; font-size: 1.2rem;">Comparing Prices: Blinkit | Zepto | Instamart | DMart</p>
        <div style="border: 2px solid #333; padding: 30px; border-radius: 20px; display: inline-block; margin-top: 20px;">
          <h2 style="color: #00ff88;">Status: System Live 🚀</h2>
          <p style="color: #aaa;">Tracking 50,000+ Products in Hyderabad</p>
          <button style="background: #00ff88; border: none; padding: 15px 30px; border-radius: 10px; font-weight: bold; cursor: pointer;">Start Saving Money</button>
        </div>
        <p style="margin-top: 40px; color: #555;">© 2026 OptiCart Hyderabad - Smart Grocery Assistant</p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running!'));
