export const validateAddToCart = (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  if (userId == null || productId == null || quantity == null) {
    return res.status(400).json({
      message: "userId, productId and quantity are required"
    });
  }

  const parsedUserId = Number(userId);
  const parsedProductId = Number(productId);
  const parsedQuantity = Number(quantity);

  if (
    !Number.isInteger(parsedUserId) ||
    !Number.isInteger(parsedProductId) ||
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity <= 0
  ) {
    return res.status(400).json({
      message: "Invalid userId, productId or quantity"
    });
  }

  // Attach parsed values ONCE
  req.body.userId = parsedUserId;
  req.body.productId = parsedProductId;
  req.body.quantity = parsedQuantity;

  next();
};
