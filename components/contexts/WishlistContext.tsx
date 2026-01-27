"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/store';

interface WishlistContextType {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('prixair_wishlist');
            if (saved) {
                setItems(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load wishlist', e);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('prixair_wishlist', JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save wishlist', e);
        }
    }, [items]);

    const addToWishlist = (product: Product) => {
        setItems(prev => {
            if (prev.find(p => p.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setItems(prev => prev.filter(p => p.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return items.some(p => p.id === productId);
    };

    const clearWishlist = () => {
        setItems([]);
    };

    return (
        <WishlistContext.Provider value={{
            items,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};
