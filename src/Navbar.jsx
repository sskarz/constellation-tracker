import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  console.log("Navbar component is rendering");

  // Add shooting stars state and functions
  const [stars, setStars] = useState([]);

  // Generate a new shooting star
  const createStar = () => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      top: Math.random() * 100, // Random vertical position within navbar
      left: -5, // Start from left side
      size: Math.random() * 2 + 1, // Random size between 1-3px
      speed: Math.random() * 2, // Random speed
      tail: Math.random() * 80 + 50, // Random tail length
    };
  };

  // Add a new star and remove old ones
  const addStar = () => {
    setStars((prevStars) => {
      // Remove stars that have moved off screen
      const filteredStars = prevStars.filter((star) => star.left < 110);

      // Add a new star
      return [...filteredStars, createStar()];
    });
  };

  // Move stars across the screen
  const moveStars = () => {
    setStars((prevStars) =>
      prevStars.map((star) => ({
        ...star,
        left: star.left + star.speed, // Move star to the right
      }))
    );
  };

  // Set up animation intervals
  useEffect(() => {
    // Create a new star every 1-2 seconds
    const createInterval = setInterval(addStar, Math.random() * 1000 + 1000);

    // Move stars every 50ms
    const moveInterval = setInterval(moveStars, 50);

    // Add initial stars
    for (let i = 0; i < 3; i++) {
      addStar();
    }

    // Clean up intervals on unmount
    return () => {
      clearInterval(createInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <nav className="nav">
      {/* Stars container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: `0 0 ${star.size * 2}px ${
                star.size
              }px rgba(255, 255, 255, 0.7), 
                                        ${-star.tail}px 0 ${
                star.size * 3
              }px rgba(255, 255, 255, 0.3)`,
            }}
          />
        ))}
      </div>

      {/* Original navbar content - keeping exact structure */}
      <Link
        to="/"
        className="title"
        style={{ position: "relative", zIndex: 2 }}
      >
        Constellation
      </Link>

      <ul style={{ position: "relative", zIndex: 2 }}>
        <CustomLink to="/prompt">Prompt Page</CustomLink>
        <CustomLink to="/habitTracker">Habit</CustomLink>
      </ul>

      <hr style={{ position: "relative", zIndex: 2 }}></hr>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {" "}
        {children}{" "}
      </Link>
    </li>
  );
}
