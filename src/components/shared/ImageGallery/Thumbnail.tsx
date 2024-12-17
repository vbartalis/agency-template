/** @jsxImportSource solid-js */

interface ThumbnailProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Thumbnail = (props: ThumbnailProps) => {
  return (
    <button
      class="flex-none w-14 sm:w-16 h-14 sm:h-16 rounded-lg overflow-hidden border border-black transition-colors duration-200"
      classList={{
        'opacity-100': props.isSelected,
        'opacity-70 hover:opacity-100': !props.isSelected
      }}
      onClick={props.onClick}
    >
      <img
        src={props.src}
        alt={props.alt}
        class="w-full h-full object-cover"
      />
    </button>
  );
};