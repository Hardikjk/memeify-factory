import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface MemeCanvasProps {
  image: string | null;
  topText: string;
  bottomText: string;
}

export const MemeCanvas = ({ image, topText, bottomText }: MemeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      const img = new Image();
      img.onload = () => {
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.width / aspectRatio;

        if (drawHeight > canvas.height) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * aspectRatio;
        }

        // Center the image
        const x = (canvas.width - drawWidth) / 2;
        const y = (canvas.height - drawHeight) / 2;

        // Draw image
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // Configure text style
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "bold 48px Impact";

        // Draw top text
        if (topText) {
          ctx.strokeText(topText, canvas.width / 2, 20);
          ctx.fillText(topText, canvas.width / 2, 20);
        }

        // Draw bottom text
        if (bottomText) {
          ctx.textBaseline = "bottom";
          ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
          ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        }
      };
      img.src = image;
    } else {
      // Draw placeholder
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "24px sans-serif";
      ctx.fillText("Upload an image or select a template", canvas.width / 2, canvas.height / 2);
    }
  }, [image, topText, bottomText]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg"
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full h-full"
      />
    </motion.div>
  );
};