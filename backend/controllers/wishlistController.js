const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Add products to wishlist
// const addToWishlist = asyncHandler(async (req, res) => {
//   const { productId } = req.body;
//   const { user } = req;
//   console.log(productId, user, "hwdghgdgsja");
//   try {
//     let wishlist;
//     // Check if the product already exists in the wishlist
//     wishlist = await Wishlist.findOne({ user: user._id });
//     if (wishlist && wishlist.products?.item?.includes(productId)) {
//       return res
//         .status(400)
//         .json({ message: "Product already exists in the wishlist" });
//     }

//     // If the wishlist doesn't exist, create a new one and add the product

//     if (wishlist) {
//       let product = {
//         item: productId,
//       };

//       if (!wishlist) {
//         wishlist = new Wishlist({
//           user: user._id,
//           products: [product],
//         });
//       } else {
//         // If the wishlist exists but the product is not already added, push the product to the wishlist
//         // wishlist = existingWishlist;
//         wishlist.products.push(productId);
//       }

//       let wishlistItem;

//       wishlistItem = wishlist.products.find(
//         (item) => item?.item?.toString() === productId
//       );
//       if (wishlistItem) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Item already in your wishlist" });
//       } else {
//         wishlist.products.push(product);
//       }
//     }
//     await wishlist.save();

//     res.status(201).json({
//       success: true,
//       message: "Product added to wishlist successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const { user } = req;

  try {
    let wishlist = await Wishlist.findOne({ user: user._id });

    const existItemInWishlist =
      wishlist &&
      wishlist.products.find(
        (item) => item.item.toString() === productId.toString()
      );

    if (existItemInWishlist) {
      return res
        .status(400)
        .json({ message: "Product already exists in the wishlist" });
    }

    if (!wishlist) {
      wishlist = new Wishlist({
        user: user._id,
        products: [{ item: productId }],
      });
    } else {
      wishlist.products.push({ item: productId });
    }

    await wishlist.save();

    res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    console.error(error); // Logging error is optional here
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Add products to wishlist
// const addToWishlist = asyncHandler(async (req, res) => {
//   try {
//     const { productId, variants } = req.body;
//     const userId = req.user.id;

//     // Check if any wishlist exists for the user
//     let wishlist = await Wishlist.findOne({ user: userId });

//     // If wishlist doesn't exist, create a new one and add the product
//     if (!wishlist) {
//       wishlist = new Wishlist({
//         user: userId,
//         products: [{ productId, variants }],
//       });
//       await wishlist.save();
//       return res.status(201).json({
//         message: "Product added to wishlist successfully",
//         wishlistItem: wishlist,
//       });
//     }

//     // Check if the product already exists in the wishlist
//     const existingProductIndex = wishlist.products.findIndex(
//       (product) => product.productId.toString() === productId
//     );

//     if (existingProductIndex !== -1) {
//       // If product exists, check if any new variant needs to be added
//       let isNewVariantAdded = false;
//       for (const variant of variants) {
//         const existingVariant = wishlist.products[
//           existingProductIndex
//         ].variants.find((v) => v.name === variant.name);
//         if (!existingVariant) {
//           // Variant doesn't exist, add it to the wishlist item
//           wishlist.products[existingProductIndex].variants.push(variant);
//           isNewVariantAdded = true;
//         }
//       }

//       // If new variant(s) added, save the updated wishlist item
//       if (isNewVariantAdded) {
//         await wishlist.save();
//         return res.status(200).json({
//           message: "Variant(s) added to wishlist successfully",
//           wishlistItem: wishlist,
//         });
//       } else {
//         return res.status(400).json({
//           message: "Product and variant already exist in the wishlist",
//         });
//       }
//     }

//     // If the product doesn't exist, add it to the wishlist
//     wishlist.products.push({ productId, variants });
//     await wishlist.save();
//     res.status(201).json({
//       message: "Product added to wishlist successfully",
//       wishlistItem: wishlist,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// Retrieve wishlist items
const getWishlistItems = asyncHandler(async (req, res) => {
  let currentPage = Number(req.query.page) || 1;
  let resultPerPage = 2;

  let skip = Number((currentPage - 1) * resultPerPage);
  let { user } = req;

  try {
    let wishlist = await Wishlist.findOne({ user: user._id }).populate({
      path: "products.item", // Correct way to specify the path
      // match: { item: { $ne: null } }, // Filtering items that are not null
      options: {
        skip: skip,
        limit: resultPerPage,
      },
    });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        // message: "Wishlist not found",
        wishlistProducts: [],
      });
    }

    console.log(wishlist?.products, wishlist?.products?.length, "xxxxxxxxxx");
    let count = wishlist?.products && wishlist?.products?.length;
    res
      .status(200)
      .json({ success: true, count, wishlistProducts: wishlist?.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Remove items from wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  console.log(id, "abcdefgh");

  try {
    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    } else {
      wishlist.products = wishlist.products.filter(
        (item) => item?.item?.toString() !== id
      );
      await wishlist.save();
      res.status(200).json({
        success: true,
        message: "Product removed from wishlist successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};
