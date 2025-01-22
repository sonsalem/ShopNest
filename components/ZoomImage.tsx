import Image from "next/image";
import React, { useState } from "react";

type BgPosition = {
  [key: number]: { x: number; y: number };
};

interface ZoomImageProps {
  id: number;
  src: string;
  dimensions: number;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ id, src, dimensions }) => {
  const [bgPosition, setBgPosition] = useState<BgPosition>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();

    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    setBgPosition((prev) => ({
      ...prev,
      [id]: { x, y },
    }));

    target.style.cssText = `
      background-position: ${x}% ${y}%;
      background-image: url(${src});
      background-size: 150%;
      background-repeat: no-repeat;
    `;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.cssText = "";
  };

  return (
    <div
      className="image imageZoom rounded-lg mx-auto p-5 mb-3 relative overflow-hidden cursor-crosshair w-full h-full bg-[#f8f8f8]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={`Product ${id}`}
        height={dimensions}
        width={dimensions}
        className="object-contain w-full h-full mix-blend-multiply"
      />
    </div>
  );
};

export default ZoomImage;
