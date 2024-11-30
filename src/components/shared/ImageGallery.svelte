<script lang="ts">
  import { onMount } from 'svelte';

  export let mainImage: string;
  export let galleryImages: Array<{
    id: number;
    src: string;
    alt: string;
  }>;

  let selectedImage = mainImage;
  let selectedThumbnail = 0;
  let galleryContainer: HTMLElement;

  onMount(() => {
    setTimeout(checkScrollability, 100);
  });

  function updateMainImage(image: string, index: number) {
    selectedImage = image;
    selectedThumbnail = index;
  }

  function checkScrollability() {
    if (!galleryContainer) return;
    const maxScroll = galleryContainer.scrollWidth - galleryContainer.clientWidth;
    return maxScroll > 0;
  }

  function scrollGallery(direction: 'left' | 'right') {
    if (!galleryContainer) return;
    
    const visibleWidth = galleryContainer.clientWidth;
    const scrollAmount = direction === 'left' ? -visibleWidth : visibleWidth;
    
    galleryContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
</script>

<div class="flex flex-col gap-8 items-center w-full">
  <!-- Main Image Container -->
  <div class="relative w-full p-0.5">
    <div class="w-full rounded-3xl border border-black overflow-hidden">
      <img
        src={selectedImage}
        alt="Main product image"
        class="w-full h-auto object-cover"
        width="600"
        height="600"
      />
    </div>
  </div>

  <!-- Gallery -->
  <div class="relative w-full px-2">
    <!-- Left Button -->
    <button
      class="absolute -left-1 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 w-6 h-6 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 z-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
      on:click={() => scrollGallery('left')}
      aria-label="Previous image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Thumbnails -->
    <div class="flex justify-center">
      <div 
        class="flex gap-2 overflow-x-auto py-1 scrollbar-hide scroll-smooth items-center max-w-[95%]"
        bind:this={galleryContainer}
      >
        {#each [mainImage, ...galleryImages.map(img => img.src)] as image, index}
          <button
            class="flex-none w-16 h-16 rounded-lg overflow-hidden border border-black transition-colors duration-200 {selectedThumbnail === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}"
            on:click={() => updateMainImage(image, index)}
          >
            <img
              src={image}
              alt={index === 0 ? "Main product image" : galleryImages[index - 1].alt}
              class="w-full h-full object-cover"
            />
          </button>
        {/each}
      </div>
    </div>

    <!-- Right Button -->
    <button
      class="absolute -right-1 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 w-6 h-6 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 z-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
      on:click={() => scrollGallery('right')}
      aria-label="Next image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>