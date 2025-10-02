import express from "express";

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const item = req.body;
    if (!item.id || !item.quantity) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }
    
    console.log(`Product Id : ${item.id} , quantity : ${item.quantity}`);

    const userOrders = {
      id: item.id,
      quantity: item.quantity,
      message: `Checked Out successfully`,
      success: true,
    };

    console.log(userOrders);
    res.status(201).json(userOrders);
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while processing checkout",
      error: error.message,
    });
  }
});


export default router;