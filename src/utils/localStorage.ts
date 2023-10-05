const CART_ITEMS_KEY = 'cartItems';

// check if the cartItems key exists in localStorage, if not, set it to an empty array
if (!localStorage.getItem(CART_ITEMS_KEY)) {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
}

export function getCartItems() {
  const cartItems = localStorage.getItem(CART_ITEMS_KEY);
  return cartItems ? JSON.parse(cartItems) : [];
}

export function setCartItems(items: string[]) { // had any type before
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
}

export function clearCartItems() {
  localStorage.removeItem(CART_ITEMS_KEY);
}