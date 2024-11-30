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
  <div class="relative w-full">
    <!-- Left Button -->
    <button
      class="absolute -left-3 sm:-left-1 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full hover:bg-gray-50 transition-colors duration-200 z-10 border border-black flex items-center justify-center"
      on:click={() => scrollGallery('left')}
      aria-label="Previous image"
    >
      <span class="text-black text-base font-light">←</span>
    </button>

    <!-- Thumbnails -->
    <div class="flex justify-center px-2 sm:px-0">
      <div 
        class="flex gap-2 overflow-x-auto py-1 scrollbar-hide scroll-smooth items-center justify-center w-full sm:w-[95%]"
        bind:this={galleryContainer}
      >
        {#each [mainImage, ...galleryImages.map(img => img.src)] as image, index}
          <button
            class="flex-none w-14 sm:w-16 h-14 sm:h-16 rounded-lg overflow-hidden border border-black transition-colors duration-200 {selectedThumbnail === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'}"
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
      class="absolute -right-3 sm:-right-1 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full hover:bg-gray-50 transition-colors duration-200 z-10 border border-black flex items-center justify-center"
      on:click={() => scrollGallery('right')}
      aria-label="Next image"
    >
      <span class="text-black text-base font-light">→</span>
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