//Este commit es de la entrega de websockets, pero tiene errores por solucionar para que todo se cumpla según la consigna. Por eso el nombre de "websockets con errores".
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
