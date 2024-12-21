/** @jsxImportSource solid-js */

const ScrollButton = () => {
    const handleScroll = () => {
      const element = document.querySelector('.color-size-selector');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div class="px-4 mb-4">
        <button class="cta-button" onClick={handleScroll}>
          Select Your Color and Size <span class="arrow">→</span>
        </button>
      </div>
    );
  };
  
  export default ScrollButton;