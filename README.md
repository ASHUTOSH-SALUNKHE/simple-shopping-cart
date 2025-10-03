# Simple Shopping Cart – Run Locally

Follow these steps to run the project on your computer.

---

## 1. Clone the Repository
```bash
git clone https://github.com/ASHUTOSH-SALUNKHE/simple-shopping-cart.git
cd simple-shopping-cart
```

## 2. Install Node.js
Make sure you have Node.js installed.
```bash
node -v
npm -v
```

## 3. Install Dependencies
Installing Backend and Frontend Dependencies separately
```bash
cd Backend
npm install
```
```bash
cd Frontend
npm install
```

## 4. Run the Application
Run Backend and Frontend separately
```bash
cd Backend
npm run dev
```
```bash
cd Frontend
npm run dev
```

---
# Simple Shopping Cart – Backend Test

Follow these steps to test backend endpoints on your computer.

## 1.Test The Endpoints Using Automated Method(jest)
```bash
cd Frontend
npm run test
```

## 2.Test The Endpoints Using Manual Method(postman)

i] Run the Backend Server
```bash
cd Backend
npm run dev
```

ii]Go To Postman App
   (a) an API endpoint that returns a hardcoded JSON list of products (e.g., 5-10 items with id, name, price, and imageUrl)
   ```bash
    Method : GET
    URL : http://localhost:3000/api/getProducts
   ```
   (b) API endpoint that accepts a list of product IDs and quantities, logs the order to the console, and returns a success message
   ```bash
    Method : POST
    URL : http://localhost:3000/api/checkProducts
    Body (raw JSON) : {
     "id": "101", 
     "quantity": "3" 
     
}
   ```

