export const getCurrentFullYear = () => {
    const currentdate = new Date();
    return currentdate.getFullYear()
}

export const saveToStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromStorage = key => {
    return JSON.parse(sessionStorage.getItem(key));
};

export const removeFromStorage = key => {
    sessionStorage.removeItem(key);
};

export const clearStorage = () => {
    sessionStorage.clear();
};

export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const fetchFromLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));
};

export const removeFromLocalStorage = key => {
    localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
    localStorage.clear();
};