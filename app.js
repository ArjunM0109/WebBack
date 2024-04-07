const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cors());

app.post('/Details', (req, res) => {
  const { name, mobile, vehicle, from, to, date } = req.body;
  // Check if any required field is missing or empty
  if (!name || !mobile || !vehicle || !from || !to || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'demouser3212@gmail.com', // Your email address
        pass: 'wztg kwog sxec pbfg' // Your password
      }
    });
    const mailOptions = {
      from:'texibook@gmail.com', // User's email address
      to: 'demouser3212@gmail.com', // Owner's email address
      subject: 'New Booking Query from your Website',
      text: `
          Name: ${name}
          Phone: ${mobile}
          Vehicle:${vehicle}
          From:${from}
          To:${to}
          Date:${date}
      `
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).send("Server Error");
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Query Send Successfully, Driver will contact you soon.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
  res.json({ message: 'Query Send Successfully, Driver will contact you soon.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
