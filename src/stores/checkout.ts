import { writable } from 'svelte/store';

export interface ShoeSelection {
  color: string;
  size: string;
}

interface CheckoutState {
  quantity: number;
  selections: ShoeSelection[];
}

export const checkoutState = writable<CheckoutState>({
  quantity: 1,
  selections: [{ color: '', size: '' }]
});