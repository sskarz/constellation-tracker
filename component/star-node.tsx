"use client"
import React from 'react';
import { useState } from "react";
import './habitStyle.css'

interface StarNodeProps {
  day: number
  x: number
  y: number
  isCompleted: boolean
  allCompleted: boolean
  onClick: () => void
}

function StarNode({ day, x, y, isCompleted, allCompleted, onClick }: StarNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Increased star sizes for better visibility with fewer stars
  const baseSize = isCompleted ? 2.2 : 1.6
  const hoverSize = isCompleted ? 2.6 : 2.0
  const size = isHovered ? hoverSize : baseSize

  const getStarColor = () => {
    if (allCompleted) return "rgba(255, 255, 255, 1)"
    if (isCompleted) return "rgba(255, 215, 0, 1)" // Gold for completed
    return "rgba(255, 255, 255, 0.7)" // White for incomplete
  }

  const getShadowSize = () => {
    if (allCompleted) return "0 0 12px 5px rgba(255, 255, 255, 0.8)"
    if (isCompleted) return "0 0 10px 3px rgba(255, 215, 0, 0.6)"
    return "none"
  }

  return (
    <button
      className="centered-button"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}rem`,
        height: `${size}rem`,
        backgroundColor: getStarColor(),
        boxShadow: getShadowSize(),
        zIndex: isHovered ? 10 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Day ${day} ${isCompleted ? "completed" : "not completed"}`}
      aria-pressed={isCompleted}
    >
      {isHovered && (
        <div className="tooltip">
          Day {day}
        </div>
      )}
    </button>
  )
}

export default StarNode