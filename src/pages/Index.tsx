import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemeCanvas } from "@/components/MemeCanvas";

const Index = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      // Trigger fireworks animation
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-8 max-w-7xl mx-auto relative"
    >
      <AnimatePresence>
        {showFireworks && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: 2,
                  ease: "easeOut"
                }}
                className="fixed w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 pointer-events-none"
                style={{
                  boxShadow: "0 0 20px 2px rgba(255, 169, 0, 0.5)"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block">
          Create & Download
        </span>
        <h1 className="text-4xl font-bold mb-4">Meme Generator</h1>
        <p className="text-muted-foreground">Create, customize, and download your memes instantly</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-panel rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              <Input
                placeholder="Top text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="text-lg"
              />
              <Input
                placeholder="Bottom text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-12" onClick={() => document.getElementById("imageInput")?.click()}>
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button className="flex-1 h-12" variant="secondary" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-lg p-6"
        >
          <MemeCanvas
            image={selectedImage}
            topText={topText}
            bottomText={bottomText}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;