import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/prompt.css";
export default function Prompt() {
  const [habitDescription, setHabitDescription] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (success && success.habitId) {
      navigate(`/habitTracker?habitId=${success.habitId}`);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    console.log(habitDescription, numberOfDays);

    try {
      const response = await fetch("http://localhost:3000/createHabit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habitDescription,
          numberOfDays: numberOfDays,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create habit");
      }

      setSuccess({
        habitId: data.habitId,
        habitName: data.plan.HabitName,
        constellation: data.plan.ConstellationType,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        Create Your Habit Constellation
      </h1>
      <div>
        {Array.from({ length: 800 }).map((_, i) => (
          <div
            key={`bg-star-${i}`}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: 0.7,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${
                1 + Math.random() * 1
              }s ease-in-out infinite ${Math.random() * 3}s`,
            }}
          />
        ))}
        <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="habit-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What habit do you wish to develop?
          </label>
          <textarea
            id="habit-description"
            value={habitDescription}
            onChange={(e) => setHabitDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="I want to..."
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="number-of-days"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            For how many days do you want to track this habit?
          </label>
          <input
            id="number-of-days"
            type="number"
            min="1"
            max="100"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Habit Constellation"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
          <h3 className="font-bold mb-2">
            Your habit constellation was created!
          </h3>
          <p>
            <strong>Habit:</strong> {success.habitName}
          </p>
          <p>
            <strong>Constellation:</strong> {success.constellation}
          </p>
          <p>
            <strong>Habit ID:</strong> {success.habitId}
          </p>
        </div>
      )}
    </div>
    
  );
}
