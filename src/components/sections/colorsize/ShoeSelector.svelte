<script lang="ts">
  import { checkoutState } from '../../../stores/checkout';
  import type { ShoeSelection } from '../../../stores/checkout';
  
  export let index: number;
  
  const colors = [
    { id: 'black-orca', name: 'Black Orca', image: '/shoes/black-orca.png' },
    { id: 'white-snow', name: 'White Snow', image: '/shoes/white-snow.png' }
  ];
  
  const sizes = Array.from({ length: 13 }, (_, i) => i + 6);
  
  let selection: ShoeSelection;
  
  $: {
    selection = $checkoutState.selections[index] || { color: '', size: '' };
  }
  
  function updateSelection(field: 'color' | 'size', value: string) {
    const newSelections = [...$checkoutState.selections];
    newSelections[index] = { ...newSelections[index], [field]: value };
    checkoutState.update(state => ({ ...state, selections: newSelections }));
  }
</script>

<div class="shoe-selector">
  <h3>{index + 1}.</h3>
  
  <div class="selectors">
    <div class="select-group">
      <label>Select Color: {selection.color || 'Black Orca'}</label>
      <div class="select-wrapper">
        <select 
          value={selection.color} 
          on:change={(e) => updateSelection('color', (e.target as HTMLSelectElement).value)}
        >
          <option value="" disabled>Select Color</option>
          {#each colors as color}
            <option value={color.id}>{color.name}</option>
          {/each}
        </select>
        <img 
          src={colors.find(c => c.id === (selection.color || 'black-orca'))?.image} 
          alt="Shoe preview"
        />
      </div>
    </div>
    
    <div class="select-group">
      <label>Select Your Size</label>
      <select 
        value={selection.size} 
        on:change={(e) => updateSelection('size', (e.target as HTMLSelectElement).value)}
      >
        <option value="" disabled>Select Your Size</option>
        {#each sizes as size}
          <option value={size}>US {size}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<style>
  .shoe-selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #000;
    width: 2rem;
  }

  .selectors {
    flex: 1;
    display: flex;
    gap: 1rem;
  }

  .select-group {
    flex: 1;
  }

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #000;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    font-size: 1rem;
  }

  .select-wrapper {
    position: relative;
  }

  .select-wrapper img {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: auto;
    pointer-events: none;
  }
</style>
