// Logré corregir el error de realTimeProducts.
// Después de intentar tantas cosas diferentes lo único que tenía que hacer era sustituir todo el body del main por {{{body}}}
const express = require("express");
const handlebars = require("express-handlebars");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}))
app.use(express.json());


const mainRouter = require("./routes/mainRouter");
const productsRouter = require('./routes/productsRouter')(io);
const cartsRouter = require('./routes/cartsRouter');

app.use("/", mainRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const port = 8080;
server.listen(port, () => console.log("Servidor corriendo en el puerto ", port));

io.on("connection", (socket) => {
    console.log("Cliente conectado");
    io.emit("Hola");
  });

io.of("/admin").on("connection", (socket) => {
    console.log("Admin conectado");
});
