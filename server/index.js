import app from "./App/app.js";
import { PORT } from "./env.config.js";
import { connectDB } from "./dataBase.js";

connectDB();
app.listen(PORT, () => {
  console.log("el servidor esta corriendo en el puerto" + PORT);
});
