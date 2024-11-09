const Cart = require("../models/cartModel");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// Use addItemToCart for both (create and update cart)
let sessionId;
const addItemToCart = async (req, res) => {
  try {
    const { productId, productName, variants, image } = req.body;
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If item already exists, check and update its variants

      const existingVariantIndex = cart.items[
        existingItemIndex
      ].variants.findIndex((v) => v.name === variants.name);

      let manualIndex, bodyIndex;
      let count = 0;
      for (let i = 0; i < cart.items[existingItemIndex].variants.length; i++) {
        for (let j = 0; j < variants.length; j++) {
          if (
            cart.items[existingItemIndex].variants[i].name === variants[j].name
          ) {
            manualIndex = i;
            bodyIndex = j;
            count++;
          }
        }
      }

      if (manualIndex >= 0) {
        // Variant exists, update its quantity
        cart.items[existingItemIndex].variants[manualIndex].quantity =
          variants[bodyIndex].quantity;
        cart.items[existingItemIndex].variants[manualIndex].variantTotal =
          variants[bodyIndex].variantTotal;
      } else {
        // Variant doesn't exist, add it to the existing item
        for (let i = 0; i < variants.length; i++) {
          cart.items[existingItemIndex].variants.push(variants[i]);
        }
      }
    } else {
      // If item doesn't exist, add it to the cart
      cart.items.push({ productId, productName, variants, image });
    }

    await cart.save();

    res
      .status(201)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error",
    });
  }
};
// const addItemToGuestCart = async (req, res, next) => {
//   // Route for adding variants to the cart
//   try {
//     if (req.sessionID) {
//       const { productId, variants } = req.body;
//       sessionId = req.sessionID;
//       console.log(`guest session id`, sessionId);
//       let cart = await Cart.findOne({ sessionId: req.sessionID });

//       if (!cart) {
//         cart = new Cart({ sessionId: req.sessionID });
//       }

//       const existingItemIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (existingItemIndex !== -1) {
//         // If item already exists, check and update its variants

//         const existingVariantIndex = cart.items[
//           existingItemIndex
//         ].variants.findIndex((v) => v.name === variants.name);

//         let manualIndex, bodyIndex;
//         let count = 0;
//         for (
//           let i = 0;
//           i < cart.items[existingItemIndex].variants.length;
//           i++
//         ) {
//           for (let j = 0; j < variants.length; j++) {
//             if (
//               cart.items[existingItemIndex].variants[i].name ===
//               variants[j].name
//             ) {
//               manualIndex = i;
//               bodyIndex = j;
//               count++;
//             }
//           }
//         }

//         if (manualIndex >= 0) {
//           // Variant exists, update its quantity
//           cart.items[existingItemIndex].variants[manualIndex].quantity =
//             variants[bodyIndex].quantity;
//           cart.items[existingItemIndex].variants[manualIndex].variantTotal =
//             variants[bodyIndex].variantTotal;
//         } else {
//           // Variant doesn't exist, add it to the existing item
//           for (let i = 0; i < variants.length; i++) {
//             cart.items[existingItemIndex].variants.push(variants[i]);
//           }
//         }
//       } else {
//         // If item doesn't exist, add it to the cart
//         cart.items.push({ productId, variants });
//       }

//       await cart.save();

//       res
//         .status(201)
//         .json({ success: true, message: "Item added to cart successfully" });
//     }
//     if (!req.sessionID) {
//       console.log(`sessionId inside`, req.sessionID);
//       session({
//         secret: process.env.SESSION_SECRET || "mySecret",
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false, maxAge: 36000000 }, // Session expiration time set to 10 hours (36000000 milliseconds)
//         store: MongoStore.create({
//           mongoUrl: process.env.MONGODBURI, // Corrected environment variable name
//           // dbName: "development", // Specify your database name
//           // collectionName: "sessions", // Specify your collection name
//         }),
//       })(req, res, next);
//       const { productId, variants } = req.body;
//       sessionId = req.sessionID;
//       console.log(`guest session id`, sessionId);
//       let cart = await Cart.findOne({ sessionId: req.sessionID });

//       if (!cart) {
//         cart = new Cart({ sessionId: req.sessionID });
//       }

//       const existingItemIndex = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (existingItemIndex !== -1) {
//         // If item already exists, check and update its variants

//         const existingVariantIndex = cart.items[
//           existingItemIndex
//         ].variants.findIndex((v) => v.name === variants.name);

//         let manualIndex, bodyIndex;
//         let count = 0;
//         for (
//           let i = 0;
//           i < cart.items[existingItemIndex].variants.length;
//           i++
//         ) {
//           for (let j = 0; j < variants.length; j++) {
//             if (
//               cart.items[existingItemIndex].variants[i].name ===
//               variants[j].name
//             ) {
//               manualIndex = i;
//               bodyIndex = j;
//               count++;
//             }
//           }
//         }

//         if (manualIndex >= 0) {
//           // Variant exists, update its quantity
//           cart.items[existingItemIndex].variants[manualIndex].quantity =
//             variants[bodyIndex].quantity;
//           cart.items[existingItemIndex].variants[manualIndex].variantTotal =
//             variants[bodyIndex].variantTotal;
//         } else {
//           // Variant doesn't exist, add it to the existing item
//           for (let i = 0; i < variants.length; i++) {
//             cart.items[existingItemIndex].variants.push(variants[i]);
//           }
//         }
//       } else {
//         // If item doesn't exist, add it to the cart
//         cart.items.push({ productId, variants });
//       }

//       await cart.save();

//       res
//         .status(201)
//         .json({ success: true, message: "Item added to cart successfully" });
//       // } else {
//       //   next();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
const addItemToGuestCart = async (req, res, next) => {
  try {
    sessionId = req.cookies.sessionId;

    const { productId, variants, image } = req.body;

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      const existingVariantIndex = cart.items[
        existingItemIndex
      ].variants.findIndex((v) => v.name === variants.name);

      let manualIndex, bodyIndex;
      let count = 0;
      for (let i = 0; i < cart.items[existingItemIndex].variants.length; i++) {
        for (let j = 0; j < variants.length; j++) {
          if (
            cart.items[existingItemIndex].variants[i].name === variants[j].name
          ) {
            manualIndex = i;
            bodyIndex = j;
            count++;
          }
        }
      }

      if (manualIndex >= 0) {
        cart.items[existingItemIndex].variants[manualIndex].quantity =
          variants[bodyIndex].quantity;
        cart.items[existingItemIndex].variants[manualIndex].variantTotal =
          variants[bodyIndex].variantTotal;
      } else {
        for (let i = 0; i < variants.length; i++) {
          cart.items[existingItemIndex].variants.push(variants[i]);
        }
      }
    } else {
      cart.items.push({ productId, variants, image });
    }

    await cart.save();

    // Send response
    console.log(`response is here ===========>`, cart, `fdsaas`, res);
    return res
      .status(201)
      .json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    // Handle error and send response
    // return res
    //   .status(500)
    //   .json({ success: false, message: "Internal Server Error" });
    next(error);
  }
};

// Retrieves the user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    const cartItems = cart?.items;
    if (!cartItems) {
      return res.status(200).json({ success: true, cartItems: [] });
    }
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
};

const getGuestCart = async (req, res) => {
  try {
    // if (req.cookies.userId) {
    //   console.log(
    //     `getGuestCart2${req.cookies.userId}`,
    //     "rwasassassas.................................................................................................................................////////////////////////////////////////////////"
    //   );
    if (req.cookies.sessionId) {
      console.log(`getGuestCart2${req.cookies.sessionId}`);
      const cart = await Cart.findOne({ sessionId: req.cookies.sessionId });
      const cartItems = cart?.items;
      if (!cartItems) {
        return res.status(200).json({ success: true, cartItems: [] });
      }

      res.status(200).json({ success: true, cartItems });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Updates quantity of an item in the cart
// Use addItemToCart for both (create and update cart)
// const updateCartItem = async (req, res) => {
//   try {
//     const { itemId } = req.params;
//     const { name, quantity } = req.body;
//     const userId = req.user.id;

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     if (!name) {
//       return res.status(404).json({ message: "Variant not found" });
//     }

//     const itemToUpdate = cart.items.find((item) => item._id == itemId);

//     console.log(itemToUpdate);

//     if (!itemToUpdate) {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     if (itemToUpdate.variants[i].name === name) {
//       itemToUpdate.variants[i].quantity = quantity;
//     }
//     // itemToUpdate.quantity = quantity;

//     await cart.save();

//     res
//       .status(200)
//       .json({ message: "Item quantity updated successfully", cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const removeItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { productId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];
    const updatedVariants = item.variants.filter(
      (variant) => variant._id.toString() !== itemId
    );

    cart.items[itemIndex].variants = updatedVariants;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const removeItemFromGuestCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { productId } = req.body;
    // const sessionId = req.sessionID;
    console.log(`removing from guest cart`, sessionId);
    let cart = await Cart.findOne({ sessionId: sessionId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];
    const updatedVariants = item.variants.filter(
      (variant) => variant._id.toString() !== itemId
    );

    cart.items[itemIndex].variants = updatedVariants;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// const removeItemFromCart = async (req, res) => {
//   try {
//     const { itemId } = req.params;
//     const { productId } = req.body;
//     const userId = req.user.id;

//     console.log(itemId, productId, userId, "idesssssssssssssss");

//     let cart = await Cart.findOne({ user: userId });

//     if (!cart) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Cart not found" });
//     }

//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (itemIndex === -1) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Item not found in cart" });
//     }

//     const item = cart.items[itemIndex];
//     const updatedVariants = item.variants.filter(
//       (variant) => variant._id.toString() !== itemId
//     );

//     // Update the variants for the item
//     cart.items[itemIndex].variants = updatedVariants;

//     // Check if the length of variants becomes less than 1
//     if (updatedVariants.length < 1) {
//       // Remove the entire item from the cart
//       cart.items.splice(itemIndex, 1);
//     }

//     await cart.save();

//     res.status(200).json({
//       success: true,
//       message: "Item removed from cart successfully",
//       cart,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// Removes all items from the Guest cart
const emptyCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOneAndDelete({ user: userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Cart emptied successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const emptyGuestCart = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    let cart = await Cart.findOneAndDelete({ sessionId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Cart emptied successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addItemToCart,
  addItemToGuestCart,
  getCart,
  getGuestCart,
  // updateCartItem,
  removeItemFromCart,
  removeItemFromGuestCart,
  emptyCart,
  emptyGuestCart,
};
