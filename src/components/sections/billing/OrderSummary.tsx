/** @jsxImportSource solid-js */
import { createEffect, createSignal, onMount } from 'solid-js';
import { products } from '../../../utils/data/products';
import { prices } from '../../../utils/data/prices';

const OrderSummary = () => {
  const [localQuantity, setLocalQuantity] = createSignal<number>(0);
  const [localSelections, setLocalSelections] = createSignal<
    { color: string; size: string }[]
  >([]);
  const [totalDiscountedPrice, setTotalDiscountedPrice] =
    createSignal<number>(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = createSignal<number>(0);
  const [savePercentage, setSavePercentage] = createSignal<number>(0);

  onMount(() => {
    const storedQuantity = window.localStorage.getItem('selectedQuantity');
    const storedSelections = window.localStorage.getItem('selections');

    if (storedQuantity) {
      const quantity = parseInt(storedQuantity);
      console.log('selectedQuantity from localStorage:', quantity);
      setLocalQuantity(quantity);

      const priceInfo = prices[quantity] || prices[1];
      setTotalDiscountedPrice(quantity * priceInfo.pricePerPair);
      setTotalOriginalPrice(quantity * priceInfo.originalPrice);
      setSavePercentage(priceInfo.savePercentage);
    } else {
      console.log('selectedQuantity not found in localStorage');
    }

    if (storedSelections) {
      const selections = JSON.parse(storedSelections);
      console.log('selections from localStorage:', selections);
      setLocalSelections(selections);
    } else {
      console.log('selections not found in localStorage');
    }
  });

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const goToCheckout = () => {
    window.location.href = '/checkout'; // Change this to the actual checkout page URL
  };

  return (
    <div class="order-summary">
      <div class="header">
        <h2>Order Summary</h2>
        <span class="total">{formatPrice(totalDiscountedPrice())}</span>
      </div>

      <div class="new-release">
        <h3>New 2024 Release</h3>
        <p class="customers">13,427+ Happy Customers</p>
        <p class="benefit">Relieve pressure on your feet and joints</p>
      </div>

      {localSelections().map((item) => (
        <div class="item">
          <img
            src={
              products[0].colors.find((c) => c.name === item.color)?.image || ''
            }
            alt="Grounded X1"
            class="shoe-image"
          />
          <div class="item-details">
            <h4> Grounded X1</h4>
            <p>Color: {item.color}</p>
            <p>Size: MEN {item.size} / WOMEN {Number(item.size) + 1.5}</p>
            <button class="edit-btn" onClick={goToCheckout}>Edit Order</button>
          </div>
        </div>
      ))}

      <div class="price-details">
        <div class="retail">
          <span>Retail</span>
          <span class="strike-through">
            {formatPrice(totalOriginalPrice())}
          </span>
        </div>
        <p class="shipping-note">
          Shipping and tax will be settled upon checkout confirmation
        </p>
        <div class="savings">
          <span>Today you saved {savePercentage()}%</span>
          <span class="discount">
            Discount:{' '}
            {formatPrice(totalOriginalPrice() - totalDiscountedPrice())}
          </span>
        </div>
        <div class="grand-total">
          <span>Grand Total:</span>
          <span class="final-price">{formatPrice(totalDiscountedPrice())}</span>
        </div>
      </div>

      <button class="close-btn">Click to Close Summary</button>

      <style>{`
        .order-summary {
          max-width: 600px;
          margin: 0 auto;
          padding: 1.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }

        .total {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .new-release {
          margin-bottom: 1.5rem;
        }

        .new-release h3 {
          color: #ef4444;
          font-size: 1.25rem;
          margin: 0 0 0.5rem 0;
        }

        .customers {
          font-weight: 500;
          margin: 0.25rem 0;
        }

        .benefit {
          color: #4b5563;
          margin: 0.25rem 0;
        }

        .item {
          display: flex;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .shoe-image {
          width: 100px;
          height: auto;
          object-fit: cover;
          border-radius: 4px;
        }

        .item-details h4 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }

        .item-details p {
          margin: 0.25rem 0;
          color: #4b5563;
        }

        .edit-btn {
          color: #1a56db;
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .price-details {
          margin-top: 1.5rem;
        }

        .retail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .strike-through {
          text-decoration: line-through;
          color: #6b7280;
        }

        .shipping-note {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 1rem 0;
        }

        .savings {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
        }

        .discount {
          color: #ef4444;
        }

        .grand-total {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          font-size: 1.25rem;
          margin-top: 1rem;
        }

        .close-btn {
          width: 100%;
          text-align: center;
          color: #4b5563;
          background: none;
          border: none;
          padding: 1rem;
          margin-top: 1rem;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default OrderSummary;
