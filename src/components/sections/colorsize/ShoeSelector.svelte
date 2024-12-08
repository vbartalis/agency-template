<script lang="ts">
  import { checkoutState } from '../../../stores/checkout';
  import type { ShoeSelection } from '../../../stores/checkout';
  import { products } from '../../../utils/data/products';
  
  export let index: number;
  
  const sizes = Array.from({ length: 13 }, (_, i) => ({
    men: i + 6,
    women: i + 7.5
  }));
  
  let selection: ShoeSelection;
  
  $: {
    selection = $checkoutState.selections[index] || { color: '', size: '' };
  }
  
  function updateSelection(field: 'color' | 'size', value: string) {
    const newSelections = [...$checkoutState.selections];
    newSelections[index] = { ...newSelections[index], [field]: value };
    checkoutState.update(state => ({ ...state, selections: newSelections }));
  }

  $: selectedSize = selection.size ? `MEN ${selection.size} / WOMEN ${Number(selection.size) + 1.5}` : 'Select Your Size';
</script>

<div class="shoe-selector">
  <h3>{index + 1}.</h3>
  
  <div class="selectors">
    <div class="select-group">
      <label>Select Color: {selection.color || products[0].colors[0].name}</label>
      <div class="select-wrapper">
        <select 
          value={selection.color} 
          on:change={(e) => updateSelection('color', (e.target as HTMLSelectElement).value)}
        >
          <option value="" disabled>Select Color</option>
          {#each products[0].colors as color}
            <option value={color.name}>{color.name}</option>
          {/each}
        </select>
        <img 
          src={products[0].colors.find(c => c.name === (selection.color || products[0].colors[0].name))?.image} 
          alt="Shoe preview"
        />
      </div>
    </div>
    
    <div class="select-group">
      <label>Select Your Size</label>
      <div class="select-wrapper size-wrapper">
        <select 
          class="size-select"
          value={selection.size} 
          on:change={(e) => updateSelection('size', (e.target as HTMLSelectElement).value)}
        >
          <option value="" disabled>Select Your Size</option>
          {#each sizes as size}
            <option value={size.men}>MEN {size.men} / WOMEN {size.women}</option>
          {/each}
        </select>
        <div class="selected-size">{selectedSize}</div>
      </div>
    </div>
  </div>
</div>

<style>
  .shoe-selector {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 0 1.5rem;
  }

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #000;
  }

  .selectors {
    flex: 1;
    display: flex;
    gap: 1.5rem;
  }

  .select-group {
    flex: 1;
    position: relative;
  }

  label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
    color: #000;
  }

  select {
    width: 100%;
    height: 3.5rem;
    padding: 0 1rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
    background-color: white;
    font-size: 1rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    cursor: pointer;
  }

  .select-wrapper {
    position: relative;
  }

  .select-wrapper img {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 24px;
    pointer-events: none;
  }

  .select-wrapper select {
    padding-left: 4rem;
  }

  .size-wrapper select {
    padding-left: 1rem;
    color: transparent;
  }

  .selected-size {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 1rem;
    color: #000;
  }

  @media (max-width: 768px) {
    .selectors {
      flex-direction: column;
    }
    
    .shoe-selector {
      padding: 0 1rem;
    }

    .select-wrapper select {
      padding-left: 3rem;
    }

    .select-wrapper img {
      left: 0.75rem;
      width: 24px;
    }

    .size-wrapper select {
      padding-left: 1rem;
    }
  }
</style>
