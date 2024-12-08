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

<div class="color-size-selector mt-8">
  <div class="selector-container">
    <div class="header">
      <div class="title-bar">
        <h2>2. Select Your Color and Size</h2>
      </div>
      <div class="info-bar">
        Select your preferred color and size for each pair
      </div>
    </div>
    
    <div class="selectors">
      {#each Array(quantity) as _, i}
        <ShoeSelector index={i} />
      {/each}
    </div>
  
    <div class="px-4 mb-4">
      <button class="next-button">
        Next <span>→</span>
      </button>
    </div>
  </div>
</div>

<style>
  .color-size-selector {
    max-width: 600px;
    margin: 0 auto;
  }

  .selector-container {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    background: white;
    overflow: hidden;
  }

  .header {
    margin-bottom: 1rem;
  }

  .title-bar {
    background: #004236;
    color: white;
    padding: 0.75rem 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .info-bar {
    background: #e6f5f2;
    color: #333;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .selectors {
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
</style>