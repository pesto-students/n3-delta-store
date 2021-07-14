import _ from "lodash";

const regex = {
  email: new RegExp(
    "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
  ),
  url: new RegExp("^http(s?):\\/\\/\\S+(\\/\\S+)*(\\/)?$"),
  price: new RegExp(/^\d+(\.\d{1,2})?$/),
  number: new RegExp("^[0-9]+$"),
  phoneNumber: new RegExp("^[7-9][0-9]{9}$"),
};
export const getCurrentFullYear = () => {
  const currentdate = new Date();
  return currentdate.getFullYear();
};

export const saveToStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const removeFromStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const clearStorage = () => {
  sessionStorage.clear();
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const formatUserInfo = (user = null) => {
  if (user && user?.emailVerified) {
    const { displayName, email, photoURL, uid } = user;
    return {
      displayName,
      email,
      photoURL,
      uid,
    };
  }
  return user;
};

export const isValidEmail = (value) => {
  const result = regex.email.test(value);
  if (!result) return false;
  return true;
};

export const getProductImg = (product, selectedColorOfProd) => {
  const colorOptions = _.find(product.variant_groups, { name: "Color" });
  if (colorOptions) {
    const selectedColor = _.find(colorOptions.options, {
      id: selectedColorOfProd,
    });
    if (selectedColor && selectedColor.name) {
      const selectedAsset = _.find(product.assets, (prodAsset) => {
        return (
          prodAsset.filename.split("_")[1].split(".")[0] === selectedColor.name
        );
      });
      if (selectedAsset) {
        return selectedAsset.url;
      }
      return null;
    }
  }
};

export const isAccessibleKeyCode = (e) => {
  return e.key === "Enter" || e.key === " ";
};
