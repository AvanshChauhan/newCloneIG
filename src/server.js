require("dotenv").config()
const app = require("./app");
const connectDB=require("./config/database")
const port = process.env.PORT || 3000;

// Pehle database connect karte hain, fir Express server ko selected port par listen karwate hain.
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log("database connection failed", error);
  });
