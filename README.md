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


# 🔹 Website Features (Frontend)

## 1. Product Display (Home Page)
- Fetches products from backend API (`/getProducts`) using **Redux Toolkit’s `createAsyncThunk`**.
- Displays products in a **responsive grid layout** (`grid-cols-1 → grid-cols-4` depending on screen size).
- Each product card shows:
  - 🖼️ Product Image  
  - 📛 Product Name  
  - 💰 Price  
  - 🛒 Button → **“Add to Cart” / “Remove from Cart”** (toggles dynamically).
- Integrated **search bar**:
  - **Desktop** → in Navbar.  
  - **Mobile** → separate search input.  
- Filters products **live as you type**.

---

## 2. Cart Page
- Displays items added to cart.
- For each cart product:
  - 🖼️ Product Image  
  - 📛 Product Name & Price  
  - 🔢 Quantity selector (+ / -)  
  - ❌ Remove button  
  - 💰 Total price for that item  
- **Checkout button** for each item.  
- Cart uses **localStorage** to persist across refresh.

---

## 3. Checkout Flow
- Clicking **Checkout**:
  - Sends request to backend (`/checkProducts`) with:  
    ```json
    { "id": 1, "quantity": 2 }
    ```
- On success:
  - ✅ Removes item from cart.  
  - ✅ Moves product into **Checked Out Products** section.  
  - ✅ Shows toast notification ("Checked Out successfully").  
  - ✅ Disables checkout button (Checked Out state).  
- Checked out products are also stored in **localStorage**.

---

## 4. Checked Out Products Section
- Displays previously checked out items.  
- Each card shows:
  - 🖼️ Image  
  - 📛 Name  
  - 💰 Checkout Price  
  - 🔢 Checkout Quantity  
- Data displayed in **reverse order** (latest checkout first).

---

## 5. Navbar
- **Brand Name** → *Verto Electronics*.  
- **Search bar**:
  - Visible only on homepage (`/`).  
- **Cart Button**:
  - Toggles between `/` (home) and `/cart`.  
  - Icon changes between 🛒 (cart) and 🏠 (home).  

---

## 6. Toast Notifications
- Uses **react-hot-toast** for instant feedback:
  - ✅ "Added in Cart Successfully"  
  - ❌ "Removed From Cart Successfully"  
  - ✅ "Checked Out Successfully"

---

## 7. Global State Management (Redux Toolkit)
- Centralized state includes:
  - **data** → all products.  
  - **cartItems** → product IDs in cart (persisted in localStorage).  
  - **checkedData** → checked out products (persisted in localStorage).  
  - **loading** → used for loading state.  
- Functions:
  - `fetchProducts()` → API call to load products.  
  - `handleCart(id)` → add/remove item from cart.  
  - `setCheckedData(product)` → add to checked out section.  
  - `newCheckOut()` → API call to checkout item.  

---

## 8. Responsive Design
- **Mobile**:
  - Search bar adjusts (`w-[70vw]`).  
  - Product grid becomes 1 item per row.  
- **Desktop**:
  - 4-column grid.  
  - Navbar search available.  

---

## 9. Persistence
- **Cart (cartItems)** and **Checked Out Products (checkedData)** saved in **localStorage**.  
- Data persists even after refresh.  

---

## 10. Clean UI & UX
- ✨ Shadow effects on product cards.  
- ✨ Hover transitions for buttons & cards.  
- ✨ Buttons styled with **Tailwind** (color changes on hover).  
- Clear separation of sections:
  - 🛒 Cart Products  
  - ✅ Checked Out Products  


# 🔹 Website Features (Backend)

### 1. Express Server Setup
- Uses **Express.js** as the backend framework.  
- JSON body parsing enabled with `express.json()`.  
- Organized routes using **Express Router** (`getProducts` & `checkProducts`).  

---

### 2. API Endpoints

#### ✅ GET `/api/getProducts`
- Returns a list of predefined products with:
  - `id`, `name`, `price`, `imageUrl`.  
- Useful for frontend to display available products.  

#### ✅ POST `/api/checkProducts`
- Accepts checkout requests with `{ id, quantity }`.  
- **Validations**:
  - Ensures both `id` and `quantity` are provided.  
- **Response**:
  - ✅ Success →  
    ```json
    { "success": true, "id": 1, "quantity": 2, "message": "Checkout successful" }
    ```
  - ❌ Error → `400 Bad Request` for invalid input.  
- Includes **error handling** with `try...catch` for server issues.  

---

### 3. Error Handling
- Returns **400 Bad Request** for invalid inputs.  
- Returns **500 Internal Server Error** if unexpected error occurs.  
- Provides **clear JSON error messages**.  

---

### 4. CORS Setup
- Uses `cors` middleware.  
- Allows frontend (**React at http://localhost:5173**) to communicate with backend.  
- Supports **credentials** if needed.  

---

### 5. Production-Ready Setup
- In production (`NODE_ENV=production`):
  - Serves **React frontend build files** (`Frontend/dist`).  
  - Handles **React Router fallback** → serves `index.html` for unknown routes.  

---

### 6. Testing with Supertest + Jest
- Uses **supertest** to test API endpoints.  
- Includes test cases for:
  - ✅ `POST /api/checkProducts` → valid + invalid requests.  
  - ✅ `GET /api/getProducts` → ensures product list is returned.  
- Ensures backend **reliability and correctness**.  

---

### 7. Logging
- Console logs **product checkout details** for debugging:  

