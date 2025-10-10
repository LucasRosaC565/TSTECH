'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      {/* Imagem principal */}
      <div className="rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image 
          src={selectedImage} 
          alt={productName} 
          width={520} 
          height={360} 
          sizes="(min-width: 1024px) 520px, 100vw" 
          loading="eager" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Miniaturas */}
      <div className="flex gap-3 mt-3 overflow-x-auto no-scrollbar">
        {images.map((url, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedImage(url)}
            className={`h-16 w-24 flex-shrink-0 rounded border transition-all duration-200 ${
              selectedImage === url 
                ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <Image 
              src={url} 
              alt="thumb" 
              width={96} 
              height={64} 
              sizes="96px" 
              loading="lazy" 
              className="h-full w-full object-cover rounded" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
