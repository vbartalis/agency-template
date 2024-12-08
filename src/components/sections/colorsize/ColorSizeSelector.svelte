<script lang="ts">
  import { onMount } from 'svelte';
  import { checkoutState } from '../../../stores/checkout';
  import ShoeSelector from './ShoeSelector.svelte';
  
  let quantity = 1;
  
  onMount(() => {
    window.addEventListener('quantityChange', ((e: CustomEvent) => {
      quantity = e.detail;
      checkoutState.update(state => ({
        ...state,
        quantity: e.detail,
        selections: Array(e.detail).fill({ color: '', size: '' })
      }));
    }) as EventListener);
    
    // Initialize from localStorage if available
    const savedQuantity = parseInt(localStorage.getItem('selectedQuantity') || '1');
    quantity = savedQuantity;
    checkoutState.update(state => ({
      ...state,
      quantity: savedQuantity,
      selections: Array(savedQuantity).fill({ color: '', size: '' })
    }));
  });
</script>

<div class="color-size-selector">
  <div class="header">
    <h2>2. Select Your Color and Size</h2>
  </div>
  
  <div class="selectors">
    {#each Array(quantity) as _, i}
      <ShoeSelector index={i} />
    {/each}
  </div>
  
  <div class="sizing-info">
    <p>📏 Sizing is currently displayed in US sizes <a href="#" class="size-chart">Size Chart</a></p>
    
    <div class="sizing-tips">
      <h4>Expert Sizing Tips</h4>
      <p>It's super simple. We have two sizing tips which have proven to help our customers find the perfect size:</p>
      <ul>
        <li>✅ Pick the shoe size you most commonly wear.</li>
        <li>✅ If you are between sizes, choose the size up.</li>
      </ul>
    </div>
  </div>
  
  <button class="next-button">
    Next <span>→</span>
  </button>
</div>

<style>
  .color-size-selector {
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
    overflow: hidden;
    padding: 0.5rem 1rem;
  }

  .selectors {
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
    overflow: hidden;
    padding: 0.5rem 1rem;
  }

  .next-button {
    width: 100%;
    background: #fbbf24;
    color: #000;
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }

  .next-button:hover {
    background: #f59e0b;
  }

  .header {
    background: #004236;
    color: white;
    padding: 0.75rem 0;
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .sizing-info {
    margin: 2rem 0;
    font-size: 0.875rem;
  }

  .size-chart {
    color: #000;
    text-decoration: underline;
    float: right;
  }

  .sizing-tips {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }

  .sizing-tips h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  .sizing-tips p {
    margin: 0 0 0.5rem 0;
  }

  .sizing-tips ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .sizing-tips li {
    margin: 0.25rem 0;
  }

  .next-button {
    width: 100%;
    background: #fbbf24;
    color: #000;
    border: none;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;
  }

  .next-button:hover {
    background: #f59e0b;
  }
</style>
