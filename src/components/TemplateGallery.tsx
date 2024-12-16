import { motion } from "framer-motion";

const templates = [
  "/placeholder.svg",
  // Add more template URLs here
];

interface TemplateGalleryProps {
  onSelect: (image: string) => void;
}

export const TemplateGallery = ({ onSelect }: TemplateGalleryProps) => {
  return (
    <div className="glass-panel rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Popular Templates</h3>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square rounded-lg overflow-hidden bg-secondary"
            onClick={() => onSelect(template)}
          >
            <img
              src={template}
              alt={`Template ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};