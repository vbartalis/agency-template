import { createSignal, onMount, createEffect } from 'solid-js';
import { cartState, updateItem, updateQuantity } from '../../../stores/cart';
import { products } from '../../../utils/data/products';

const ColorSizeSelector = () => {
  const [selectedColor, setSelectedColor] = createSignal<string>('Black');
  const [selectedSize, setSelectedSize] = createSignal<string>('');
  const [quantity, setQuantity] = createSignal<number>(1);
  const [error, setError] = createSignal(false);

  createEffect(() => {
    const storedQuantity = window.localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      const newQuantity = parseInt(storedQuantity);
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
    }
  });

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleNext = () => {
    if (!selectedColor() || !selectedSize()) {
      setError(true);
      return;
    }
    setError(false);

    for (let i = 0; i < quantity(); i++) {
      updateItem(i, { color: selectedColor(), size: selectedSize() });
    }

    window.location.href = '/billing';
  };

  return (
    <div class="color-size-selector mt-8">
      <div class="selector-container">
        <div class="header">
          <div class="title-bar">
            <h2>2. Select Your Color and Size</h2>
          </div>
        </div>

        {error() && (
          <div class="error-message">
            Please ensure you've selected the products you wish to purchase.
          </div>
        )}

        <div class="colors">
          <h3>Select Color</h3>
          <div class="color-options">
            {products[0].colors.map(color => (
              <button
                class={`color-option ${selectedColor() === color.name ? 'selected' : ''}`}
                onClick={() => handleColorChange(color.name)}
              >
                <img src={color.image} alt={color.name} />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div class="sizes">
          <h3>Select Size</h3>
          <div class="size-options">
            {products[0].sizes.map(size => (
              <button
                class={`size-option ${selectedSize() === size.men ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size.men)}
              >
                <span>MEN {size.men}</span>
                <span>WOMEN {size.women}</span>
              </button>
            ))}
          </div>
        </div>

        <div class="px-4 mb-4">
          <button class="next-button" onClick={handleNext}>
            Next <span>→</span>
          </button>
        </div>
      </div>

      <style>{`
        .color-size-selector {
          max-width: 600px;
          margin: 0 auto;
        }

        .selector-container {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          background: white;
          overflow: hidden;
          padding-bottom: 1rem;
        }

        .header {
          margin-bottom: 2rem;
        }

        .title-bar {
          background: #004236;
          color: white;
          padding: 1rem 1.5rem;
        }

        h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .error-message {
          background-color: #fef2f2;
          color: #991b1b;
          padding: 1rem;
          margin: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .colors, .sizes {
          padding: 1.5rem;
        }

        h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .color-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
        }

        .color-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border: 2px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          background: none;
        }

        .color-option.selected {
          border-color: #000;
        }

        .color-option img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .size-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 0.5rem;
        }

        .size-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          background: none;
        }

        .size-option.selected {
          border-color: #000;
          background: #f8fafc;
        }

        .size-option span {
          font-size: 0.875rem;
        }

        .size-option span:first-child {
          font-weight: 600;
        }

        .next-button {
          width: 100%;
          padding: 1rem;
          background: #fbbf24;
          color: black;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin: 0 1.5rem;
          width: calc(100% - 3rem);
        }

        .next-button:hover {
          background: #f59e0b;
        }

        @media (max-width: 768px) {
          .title-bar {
            padding: 1rem;
          }
          
          .error-message {
            margin: 0.5rem 1rem;
          }
          
          .next-button {
            margin: 0 1rem;
            width: calc(100% - 2rem);
          }
        }
      `}</style>
    </div>
  );
};

export default ColorSizeSelector;
