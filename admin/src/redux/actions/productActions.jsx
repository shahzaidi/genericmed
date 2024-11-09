import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {
  GET_ALL_PRODUCT_FAIL,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_DETAILS_REQUEST,
  UPDATE_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../constants/productsConstants";
import { toast } from "react-toastify";

export const getAllProducts =
  (
    keyword = "",
    price = [0, 25000],
    category,
    discount,
    rating,
    currentPage = 1
  ) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      dispatch({ type: GET_ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&price[gte]=${
        price[0]
      }&price[lte]=${price[1]}&discount[gte]=${Number(
        discount
      )}&ratings[gte]=${rating}&page=${currentPage}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&discount[gte]=${Number(
          discount
        )}&ratings[gte]=${rating}&page=${currentPage}`;
      }

      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//   Create Product

export const createProduct = (object) => async (dispatch) => {
  console.log(object, "productObject.........................//////");
  try {
    const token = localStorage.getItem("token");
    let url = "/api/v1/product/new";

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await axios.post(
      url,
      {
        name: object?.name,
        description: object?.description,
        category: object?.category,
        price: object?.price,
        image: object?.image
          ? object?.image
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: object?.images,
        shortDescription: object?.shortDescription,
        metaTitle: object?.metaTitle,
        metaDescription: object?.metaDescription,
        metaKeyword: object?.metaKeyword,
        manufacturer: object?.manufacturer,
        strength: object?.strength,
        dosage: object?.dosage,
        ratings: object?.rating,
        discount: object?.discount,
        variantsAndPrices: object?.variantsAndPrices,
        sku: object?.sku,
        status: object?.status,
        slug: object?.slug,
        bestSeller: object?.bestSeller,
        bestOffer: object?.bestOffer,
        featuredProduct: object?.featuredProduct,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data?.message) {
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.href = "productlist";
      }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({ type: CREATE_PRODUCT_FAIL, payload: errorMessage });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Get Product Details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product Details

export const updateProductDetailsAction = (id, object) => async (dispatch) => {
  // const navigate = useNavigate();
  const link = `/api/v1/product/${id}`;
  try {
    const token = localStorage.getItem("token");

    // setUserCLoading(true);
    dispatch({ type: UPDATE_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.put(
      link,

      {
        name: object?.name,
        description: object?.description,
        category: object?.category,
        price: object?.price,
        image: object?.image
          ? object?.image
          : "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        images: object?.images,
        shortDescription: object?.shortDescription,
        metaTitle: object?.metaTitle,
        metaDescription: object?.metaDescription,
        metaKeyword: object?.metaKeyword,
        manufacturer: object?.manufacturer,
        strength: object?.strength,
        dosage: object?.dosage,
        ratings: object?.rating,
        discount: object?.discount,
        variantsAndPrices: object?.variantsAndPrices,
        sku: object?.sku,
        status: object?.status,
        slug: object?.slug,
        bestSeller: object?.bestSeller,
        bestOffer: object?.bestOffer,
        featuredProduct: object?.featuredProduct,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: UPDATE_PRODUCT_DETAILS_SUCCESS, payload: data });
    // localStorage.setItem("token", data?.token);
    if (data?.message) {
      // localStorage.setItem("user", JSON.stringify(data?.user));
      // setAuthUser(data?.user);
      // setUserCLoading(false);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      // navigate("/productlist");
    }
    setTimeout(() => {
      window.location.href = "/productlist";
    }, 1100);
    // window.location.href = "/allcategories";
  } catch (error) {
    // console.log(link, options, "catOptions...............///////");
    // setUserCLoading(true);
    const errorMessage = error.response?.data?.message || "An error occurred";
    dispatch({ type: UPDATE_PRODUCT_DETAILS_FAIL, payload: errorMessage });
    if (errorMessage) {
      // setUserCLoading(false);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }
};

// Delete Product

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let url = `/api/v1/product/${id}`;

    // console.log(rating, comment, token, productId, "tokenK");
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.message) {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    }

    if (data?.success === true) {
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 1000,
      });
      // setTimeout(() => {
      //   dispatch(
      //     getAllProducts(
      //       (keyword = ""),
      //       (price = [0, 225000]),
      //       null,
      //       null((rating = 1))
      //     )
      //   );
      // }, 1100);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    if (errorMessage) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: errorMessage,
      });
    }
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
};
