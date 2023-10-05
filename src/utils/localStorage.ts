const CART_ITEMS_KEY = 'cartItems';

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