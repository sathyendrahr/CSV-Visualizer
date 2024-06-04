import app from "./app.js";
import connectToDatabase from "./config/dbconfig.js";

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port", port);
  connectToDatabase();
});
