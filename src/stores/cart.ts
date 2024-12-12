import { createSignal, createEffect } from 'solid-js';

export interface CartItem {
  color: string;
  size: string;
}

interface CartState {
  quantity: number;
  items: CartItem[];
  total: number;
  discount: number;
}

const [cartState, setCartState] = createSignal<CartState>({
  quantity: 1,
  items: [{ color: '', size: '' }],
  total: 0,
  discount: 0
});

export const updateQuantity = (quantity: number) => {
  setCartState(prev => ({ ...prev, quantity }));
  calculateTotals();
};

export const updateItem = (index: number, item: Partial<CartItem>) => {
  setCartState(prev => ({
    ...prev,
    items: prev.items.map((i, idx) => idx === index ? { ...i, ...item } : i)
  }));
};

export const addItem = (item: CartItem) => {
  setCartState(prev => ({
    ...prev,
    items: [...prev.items, item]
  }));
  calculateTotals();
};

export const removeItem = (index: number) => {
  setCartState(prev => ({
    ...prev,
    items: prev.items.filter((_, idx) => idx !== index)
  }));
  calculateTotals();
};

const calculateTotals = () => {
  const basePrice = 129.99;
  const subtotal = basePrice * cartState().quantity;
  const discountRate = 0.4; // 40% discount

  setCartState(prev => ({
    ...prev,
    total: subtotal,
    discount: subtotal * discountRate
  }));
};

export { cartState };
