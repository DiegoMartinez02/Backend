const express = require("express");
const handlebars = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mainRouter = require("./routes/mainRouter");
const productsRouter = require("./routes/productsRouter")(io);
const cartsRouter = require("./routes/cartsRouter");
const userRouter = require("./routes/users.router.js");
const { error } = require("console");

app.use("/", mainRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const port = 8080;
server.listen(port, () =>
  console.log("Servidor corriendo en el puerto ", port)
);

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  io.emit("Hola");
});

io.of("/admin").on("connection", (socket) => {
  console.log("Admin conectado");
});

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://diegomartinezdm0925:fjB5UzoguQjVnu5v@cluster0.nlyp41n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado a la database correctamente");
  } catch (error){
    console.log("Error al conectarse a la database: " + error);
    process.exit();
  }
}

connectDB();


app.use("/api/users", userRouter);
