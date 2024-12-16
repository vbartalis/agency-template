type PriceDetails = {
    pricePerPair: number;
    originalPrice: number;
    savePercentage: number;
    badge: string;
};

// Use a Record type with number as key type
export const prices: Record<number, PriceDetails> = {
    1: {
        pricePerPair: 69.99,
        originalPrice: 139.99,
        savePercentage: 50,
        badge: "",
    },
    2: {
        pricePerPair: 62.99,
        originalPrice: 139.99,
        savePercentage: 55,
        badge: "Most Popular",
    },
    3: {
        pricePerPair: 55.99,
        originalPrice: 139.99,
        savePercentage: 60,
        badge: "Best Deal",
    },
};
