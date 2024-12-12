<script lang="ts">
  import { onMount } from 'svelte';
  import { checkoutState } from '../../../stores/checkout';
  import type { ShoeSelection } from '../../../stores/checkout';
  import ShoeSelector from './ShoeSelector.svelte';

  let quantity = 1;
  let error = false;
  let localSelections: ShoeSelection[] = [];

  // Update quantity from localStorage or event
  onMount(() => {
    const storedQuantity = window.localStorage.getItem('selectedQuantity');
    if (storedQuantity) {
      quantity = parseInt(storedQuantity);
    }

    const handleQuantityChange = (e: CustomEvent) => {
      quantity = e.detail;
      initializeLocalSelections();
    };

    window.addEventListener('quantityChange', handleQuantityChange as EventListener);

    return () => {
      window.removeEventListener('quantityChange', handleQuantityChange as EventListener);
    };
  });

  function initializeLocalSelections() {
    localSelections = Array(quantity).fill(null).map((_, i) => ({
      color: $checkoutState.selections[i]?.color || '',
      size: $checkoutState.selections[i]?.size || ''
    }));
  }

  // Initialize localSelections when quantity changes or component mounts
  $: quantity, initializeLocalSelections();

  function updateLocalSelection(index: number, field: 'color' | 'size', value: string) {
    localSelections[index] = { ...localSelections[index], [field]: value };
    localSelections = localSelections; // Trigger reactivity
  }

  // Handle the "Next" button click
  function handleNext() {
    let isValid = true;
    localSelections.forEach(selection => {
      if (!selection.color || !selection.size) {
        isValid = false;
      }
    });
    error = !isValid;
    if (isValid) {
      // Update the checkoutState here after validation
      checkoutState.update(state => ({ ...state, quantity, selections: localSelections }));
      window.location.href = '/billing';
    }
  }
</script>

<div class="color-size-selector mt-8">
  <div class="selector-container">
    <div class="header">
      <div class="title-bar">
        <h2>2. Select Your Color and Size</h2>
      </div>
    </div>

    {#if error}
      <div class="error-message">
        Please ensure you've selected the products you wish to purchase.
      </div>
    {/if}

    <div class="selectors">
      {#each Array(quantity) as _, i}
        <ShoeSelector index={i} bind:selection={localSelections[i]} on:updateSelection={({ detail }) => updateLocalSelection(i, detail.field, detail.value)} />
      {/each}
    </div>

    <div class="px-4 mb-4">
      <button class="next-button" on:click={handleNext}>
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
</style>
