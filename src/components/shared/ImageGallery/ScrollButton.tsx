/** @jsxImportSource solid-js */

interface ScrollButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const ScrollButton = (props: ScrollButtonProps) => {
  return (
    <button
      class="absolute top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full hover:bg-gray-50 transition-colors duration-200 z-10 border border-black flex items-center justify-center"
      classList={{
        '-left-3 sm:-left-1': props.direction === 'left',
        '-right-3 sm:-right-1': props.direction === 'right'
      }}
      onClick={props.onClick}
      aria-label={props.direction === 'left' ? 'Previous image' : 'Next image'}
    >
      <span class="text-black text-base font-light">
        {props.direction === 'left' ? '←' : '→'}
      </span>
    </button>
  );
};