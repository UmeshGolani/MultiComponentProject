import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Button, Container, Typography } from "@mui/material";

export default function MovingCounter() {
  const step = 50; // Movement step per increment/decrement

  // Get container dimensions dynamically
  const [containerSize, setContainerSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateSize = () =>
      setContainerSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initial position (bottom-left)
  const [position, setPosition] = useState({
    x: 0,
    y: containerSize.height - 100,
  });

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);

    setPosition((prev) => {
      const nextX = Math.min(prev.x + step, containerSize.width - 100);
      const halfWidth = containerSize.width / 2;

      let nextY = prev.y;
      if (nextX < halfWidth) {
        nextY = Math.max(prev.y - step, 0); // Move Up
      } else {
        nextY = Math.min(prev.y + step, containerSize.height - 100); // Move Down
      }

      return { x: nextX, y: nextY };
    });
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 0));

    setPosition((prev) => {
      const nextX = Math.max(prev.x - step, 0);
      const halfWidth = containerSize.width / 2;

      let nextY = prev.y;
      if (nextX < halfWidth) {
        nextY = Math.min(prev.y + step, containerSize.height - 100); // Move Down
      } else {
        nextY = Math.max(prev.y - step, 0); // Move Up
      }

      return { x: nextX, y: nextY };
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100vh",
        height: "100vh",
        position: "relative",
        backgroundColor: "#f0f0f0",
        border: "2px solid black",
        overflow: "hidden",
      }}
    >
      {/* Motion Counter */}
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.1 }}
        style={{ position: "absolute" }}
      >
        <Typography
          variant="h3"
          sx={{
            bgcolor: "white",
            color: "black",
            px: 4,
            py: 2,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          {count}
        </Typography>
      </motion.div>

      {/* Buttons */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          display: "flex",
          gap: 2,
        }}
      >
        <Button variant="contained" color="error" onClick={handleDecrement}>
          Decrease
        </Button>
        <Button variant="contained" color="success" onClick={handleIncrement}>
          Increase
        </Button>
      </Box>
    </Container>
  );
}
