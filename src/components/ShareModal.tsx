import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShareModal = ({ open, onOpenChange }: ShareModalProps) => {
  const socialPlatforms = [
    { icon: Facebook, name: "Facebook", color: "bg-blue-600" },
    { icon: Twitter, name: "Twitter", color: "bg-sky-500" },
    { icon: Instagram, name: "Instagram", color: "bg-pink-600" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your meme</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => {
                  // Implement sharing logic
                  console.log(`Sharing to ${platform.name}`);
                }}
              >
                <platform.icon className="h-4 w-4" />
                Share on {platform.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};