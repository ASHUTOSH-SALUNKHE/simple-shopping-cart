import express from "express"
const router = express.Router();

const productList = [
  { id: 1, name: "Aurduino", price: 600, imageUrl: "/aurdino.png" },
  { id: 2, name: "Ultrasonic Sensor", price: 200, imageUrl: "/ultrasonic.png" },
  { id: 3, name: "WiFi Module ESP8266", price: 400, imageUrl: "/wifimodule.png" },
  {
    id: 4,
    name: "Bluetooth Module HC-05",
    price: 250,
    imageUrl: "/blutoothmodule.png",
  },
  { id: 5, name: "Smoke Sensor", price: 100, imageUrl: "/smokeSensor.png" },
  { id: 6, name: "Breadboard", price: 120, imageUrl: "/breadboard.png" },
  { id: 7, name: "Lcd Display", price: 150, imageUrl: "/lcdDisplay.png" },
];

router.get("/", (req , res)=> {
    res.status(200).json(productList)
})  

export default router
