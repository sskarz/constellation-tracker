import React from "react";
import { useState, useEffect } from "react";
import StarNode from "./star-node.tsx";

// Base URL for the backend API
const API_BASE_URL = "http://localhost:3000";

interface ConstellationTrackerProps {
  habitId: string; // Added habitId prop to identify which habit to fetch
}

interface Point {
  x: number;
  y: number;
}

interface HabitData {
  habitName: string;
  constellationType: string;
  totalDays: number;
  description: string;
  dayNodes: {
    [key: string]: {
      x: number;
      y: number;
      activated: boolean;
    };
  };
}

export default function ConstellationTracker({
  habitId,
}: ConstellationTrackerProps) {
  const [habitData, setHabitData] = useState<HabitData | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [allCompleted, setAllCompleted] = useState(false);
  const [points, setPoints] = useState<Array<Point>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch habit data from the backend
  useEffect(() => {

    const fetchHabitData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/getHabit?habitId=${habitId}`
        );


        if (!response.ok) {
          throw new Error(`Failed to fetch habit data: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch habit data");
        }

        setHabitData(data.habit);

        // Extract points and completed days from habit data
        const newPoints: Point[] = [];
        const newCompletedDays = new Set<number>();

        // Convert dayNodes object into arrays for our component
        Object.entries(data.habit.dayNodes).forEach(
          ([nodeKey, nodeData]: [string, any], index) => {
            const dayNumber = parseInt(nodeKey.replace("node", ""));

            newPoints.push({
              x: nodeData.x,
              y: nodeData.y,
            });

            if (nodeData.activated) {
              newCompletedDays.add(dayNumber);
            }
          }
        );

        setPoints(newPoints);
        setCompletedDays(newCompletedDays);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    if (habitId) {
      fetchHabitData();
    }
  }, [habitId]);

  // Check if all days are completed
  useEffect(() => {
    if (
      habitData &&
      completedDays.size === habitData.totalDays &&
      habitData.totalDays > 0
    ) {
      setAllCompleted(true);
    } else {
      setAllCompleted(false);
    }
  }, [completedDays, habitData]);

  const toggleDay = async (day: number) => {
    try {
      // Call backend to toggle node status
      const response = await fetch(
        `${API_BASE_URL}/habit/${habitId}/toggleNode`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodeNumber: day }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update node: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to update node");
      }

      // Update local state based on response
      const newCompletedDays = new Set(completedDays);

      if (data.activated) {
        newCompletedDays.add(day);
      } else {
        newCompletedDays.delete(day);
      }

      setCompletedDays(newCompletedDays);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update progress"
      );
    }
  };

  const resetProgress = async () => {
    try {
      // Reset all nodes to not activated
      const resetPromises = Array.from(
        { length: habitData?.totalDays || 0 },
        (_, i) => {
          const day = i + 1;
          // Only reset if the day is currently completed
          if (completedDays.has(day)) {
            return fetch(`${API_BASE_URL}/habit/${habitId}/toggleNode`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ nodeNumber: day }),
            });
          }
          return Promise.resolve();
        }
      );

      await Promise.all(resetPromises);

      // Clear local state
      setCompletedDays(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset progress");
    }
  };

  if (loading) {
    return <div>Loading habit tracker...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!habitData) {
    return <div>No habit data found</div>;
  }

  return (


    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >

      <div
        style={{
          position: "relative",
          backgroundColor: "transparent", // slate-900
          borderRadius: "0.5rem", // rounded-lg
          aspectRatio: "4 / 4",
          width: "100%",
          overflow: "hidden",
          transition: "all 1s",
          boxShadow: allCompleted
            ? "0 0 50px 10px rgba(255, 255, 255, 0.2)"
            : undefined,
        }}
      >
        {/* Constellation lines */}
        <svg
          style={{
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {points.length > 1 &&
            points.map((point, index) => {
              if (index === points.length - 1) return null;

              return (
                <line
                  key={`line-${index}`}
                  x1={point.x}
                  y1={point.y}
                  x2={points[index + 1].x}
                  y2={points[index + 1].y}
                  stroke={
                    allCompleted
                      ? "rgba(226, 214, 214, 0.6)"
                      : "rgba(255, 255, 255, 0.28)"
                  }
                  strokeWidth="0.2"
                  style={{
                    transition: "all 1s",
                  }}
                />
              );
            })}
        </svg>

        {/* Stars/ Nodes */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
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
      <div style={{ position: "relative" }}>
        <div className="text-slate-300">
          <h3>{habitData.habitName}</h3>
          <p>{habitData.description}</p>
          <span className="font-bold text-white">
            {completedDays.size}
          </span> of{" "}
          <span className="font-bold text-white">{habitData.totalDays}</span>{" "}
          days completed
        </div>
        <button onClick={resetProgress}>Reset Progress</button>
      </div>


    </div>
  );
}
