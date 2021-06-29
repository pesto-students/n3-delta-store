import { ECOMMERCE_PUBLIC_KEY } from "../../resources/constant/constant";
import Commerce from "@chec/commerce.js";

export const getCategories = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.categories.list();
};

export const getProducts = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.products.list();
};

export const getCart = () => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.retrieve();
};

export const getExistingUserCart = (cartId) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.retrieve(cartId);
};

export const addToCart = (productId, quantity) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

  return commerce.cart.add(productId, quantity);
};

export const updateCart = (id, payload) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.update(id, payload);
};

export const removeFromCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.remove(id);
};

export const deleteCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.delete();
};

export const emptyCart = (id) => {
  const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);
  return commerce.cart.empty();
};

export const getProduct = (id) => {
    const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

    return commerce.products.retrieve(id);
}

export const searchProduct = (query) => {
    const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

    return commerce.products.list({
        query: query,
    });
}
