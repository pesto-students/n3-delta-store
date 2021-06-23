import { ECOMMERCE_PUBLIC_KEY } from '../../resources/constant/constant';
import Commerce from '@chec/commerce.js';


export const getCategories = () => {
    const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

    return commerce.categories.list();
}

export const getProducts = () => {
    const commerce = new Commerce(ECOMMERCE_PUBLIC_KEY);

    return commerce.products.list();
}
