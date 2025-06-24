'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Artwork, CartItem, Cart } from '@/data/types';

interface CartContextType {
  cart: Cart;
  addToCart: (artwork: Artwork, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (artworkId: string) => boolean;
  getItemQuantity: (artworkId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { artwork: Artwork; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { artworkId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { artworkId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { artwork, quantity } = action.payload;
      const existingItem = state.items.find(item => item.artwork.id === artwork.id);

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.artwork.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { items: updatedItems, total, itemCount };
      } else {
        const newItem: CartItem = {
          artwork,
          quantity,
          addedAt: new Date().toISOString(),
        };
        const updatedItems = [...state.items, newItem];
        const total = updatedItems.reduce((sum, item) => sum + (item.artwork.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { items: updatedItems, total, itemCount };
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.artwork.id !== action.payload.artworkId);
      const total = updatedItems.reduce((sum, item) => sum + (item.artwork.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: updatedItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { artworkId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { artworkId } });
      }

      const updatedItems = state.items.map(item =>
        item.artwork.id === artworkId
          ? { ...item, quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.artwork.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: updatedItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('kura-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('kura-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (artwork: Artwork, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { artwork, quantity } });
  };

  const removeFromCart = (artworkId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { artworkId } });
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { artworkId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (artworkId: string) => {
    return cart.items.some(item => item.artwork.id === artworkId);
  };

  const getItemQuantity = (artworkId: string) => {
    const item = cart.items.find(item => item.artwork.id === artworkId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 