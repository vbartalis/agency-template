/** @jsxImportSource solid-js */

interface MainImageProps {
  src: string;
  alt: string;
}

export const MainImage = (props: MainImageProps) => {
  return (
    <div class="relative w-full p-0.5">
      <div class="w-full rounded-3xl border border-black overflow-hidden">
        <img
          src={props.src}
          alt={props.alt}
          class="w-full h-auto object-cover"
          width="600"
          height="600"
        />
      </div>
    </div>
  );
};