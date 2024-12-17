export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface ImageGalleryProps {
  mainImage: string;
  galleryImages: GalleryImage[];
}