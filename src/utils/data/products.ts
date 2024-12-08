export interface Product {
    id: number;
    name: string;
    colors: {
        name: string;
        image: string;
    }[];
    sizes: {
        men: string;
        women: string;
    }[];
    price: number;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Grounded X1",
        colors: [
            {
                name: "Black",
                image: "https://ae-pic-a1.aliexpress-media.com/kf/Sa97cb0ece6b94cbb8f31155e98fc1c03V.jpg_640x640.jpg_.webp"
            },
            {
                name: "Pink",
                image: "https://ae-pic-a1.aliexpress-media.com/kf/S899d2197729b4fd394499cd32e08b0696.jpg_640x640.jpg_.webp"
            },
            {
                name: "White",
                image: "https://ae-pic-a1.aliexpress-media.com/kf/S31dfedd525514b90b956c5f8343bf2f8z.jpg_640x640.jpg_.webp"
            }
        ],
        sizes: [
            { men: "6", women: "7.5" },
            { men: "7", women: "8.5" },
            { men: "8", women: "9.5" },
            { men: "9", women: "10.5" },
            { men: "10", women: "11.5" },
            { men: "11", women: "12.5" },
            { men: "12", women: "13.5" }
        ],
        price: 129.99
    }
];
