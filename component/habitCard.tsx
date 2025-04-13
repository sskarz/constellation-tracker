


"use client"
import React from 'react';
import { useState, useEffect } from "react"
import StarNode from "./star-node.tsx"


interface ConstellationTrackerProps {
  days: number
}

export default function ConstellationTracker({ days }: ConstellationTrackerProps) {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [allCompleted, setAllCompleted] = useState(false)
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([])
  

  useEffect(() => {
    // Generate constellation points based on viewport size
    setPoints([
      { x: 10, y: 40}, 
      { x: 60, y: 45 }, 
      { x: 80, y: 60 },
      { x: 90, y: 80},
      
       
  ])

    // Check if we have saved progress in localStorage
    //Will be replaced 
    const savedProgress = localStorage.getItem("constellationProgress")
    if (savedProgress) {
      setCompletedDays(new Set(JSON.parse(savedProgress)))
    }
  }, [days])

  useEffect(() => {
    // Check if all days are completed
    if (completedDays.size === days && days > 0) {
      setAllCompleted(true)
    } else {
      setAllCompleted(false)
    }

    // Save progress to localStorage
    if (completedDays.size > 0) {
      localStorage.setItem("constellationProgress", JSON.stringify([...completedDays]))
    }
  }, [completedDays, days])

  const toggleDay = (day: number) => {
    const newCompletedDays = new Set(completedDays)

    if (newCompletedDays.has(day)) {
      newCompletedDays.delete(day)
    } else {
      newCompletedDays.add(day)
    }

    setCompletedDays(newCompletedDays)
  }

  const resetProgress = () => {
    setCompletedDays(new Set())
    localStorage.removeItem("constellationProgress")
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', }}>
      <div
        style={{
          position: 'relative',
          backgroundColor: 'transparent', // slate-900
          borderRadius: '0.5rem', // rounded-lg
          //border: '1px solid #1e293b', // border-slate-800
          aspectRatio: '4 / 4',
          width: '100%',
          overflow: 'hidden',
          transition: 'all 1s',
          boxShadow: allCompleted ? '0 0 50px 10px rgba(255, 255, 255, 0.2)' : undefined,
        }}
      >
        {/* Constellation lines */}
       <svg
        style={{
          position: 'absolute',
          inset: '0',
          width: '100%',
            height: '100%',
          
        }}
          viewBox="0 0 100 100"
           preserveAspectRatio="xMidYMid meet"
        >
          {points.length > 1 &&
            points.map((point, index) => {
              if (index === points.length - 1) return null

              return (
                <line
                  key={`line-${index}`}
                  x1={point.x}
                  y1={point.y}
                  x2={points[index + 1].x}
                  y2={points[index + 1].y}
                  stroke={allCompleted ? "rgba(226, 214, 214, 0.6)" : "rgba(255, 255, 255, 0.28)"}
                  strokeWidth="0.2"
                  style={{
                    transition: 'all 1s', // 'duration-1000' corresponds to a 1000ms transition duration
                  }}
                />
              )
            })}
        </svg>

        {/* Stars/ Nodes */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}>
          {points.map((point, index) => (
            <StarNode
              key={index}
              day={index + 1}
              x={point.x}
              y={point.y}
              isCompleted={completedDays.has(index + 1)}
              allCompleted={allCompleted}
              onClick={() => toggleDay(index + 1)}
            />
          ))}
        </div>

       

    </div>

      {/* Controls */}
      <div  style = {{position: 'relative',}}>
        <div className="text-slate-300">
          <span className="font-bold text-white">{completedDays.size}</span> of{" "}
          <span className="font-bold text-white">{days}</span> days completed
        </div>
        <button
          onClick={resetProgress}
        >
          Reset Progress
        </button>
      </div>

    

     
    </div>
  )
}
