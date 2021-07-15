import { ECOMMERCE_PUBLIC_KEY } from "../../resources/constant/constant";
import Commerce from "@chec/commerce.js";
/**
 *
 * @returns list categories present in ecommerce.js
 */
export const getCategories = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.categories.list();
};
/**
 *
 * @returns all products present in ecommerce.js
 */
export const getProducts = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.products.list();
};
/**
 *
 * @returns cart for a customer
 */
export const getCart = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.retrieve();
};
/**
 *
 * @param {*} cartId
 * @returns cart of a customer if exists
 */
export const getExistingUserCart = (cartId) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.retrieve(cartId);
};

/**
 *
 * @param {*} productId
 * @param {*} quantity
 * @param {*} metaData
 * @returns cart object
 */
export const addToCart = (productId, quantity, metaData) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.add(productId, quantity, metaData);
};

/**
 *
 * @param {*} id
 * @param {*} payload
 * @returns updated cart object
 */
export const updateCart = (id, payload) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.update(id, payload);
};

/**
 *
 * @param {*} id
 * @returns updated cart after removing an item
 */
export const removeFromCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.remove(id);
};

/**
 *
 * @param {*} id
 * Deletes teh cart item
 */
export const deleteCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.delete();
};
/**
 *
 * @param {*} id
 * @returns Empty Cart object after removing all products from cart
 */
export const emptyCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.empty();
};

/**
 *
 * @param {*} id
 * @returns product data present in ecommerce.js
 */
export const getProduct = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.products.retrieve(id);
};

/**
 *
 * @param {*} id
 * @returns get selected variant data
 */
export const getVariantsForProduct = async (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  const variants = await commerce.products.getVariants(id);
  return {
    product: {
      variant_groups: variants?.data || [],
    },
  };
  // .then((variants) => console.log(variants.data));
};

/**
 *
 * @param {*} query
 * @returns searched products present in ecommerce.js
 */
export const searchProduct = (query) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.products.list({
    query: query,
  });
};
