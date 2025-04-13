import React from 'react';
import ConstellationTracker from "../../component/habitCard.tsx";


export default function Home() {
  return (
    <div className="home-container">
      <h1>Constellation Tracker</h1>
      <p>Track your daily habits with this constellation visualization</p>
      
      <div className="tracker-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ConstellationTracker days={6} />
      </div>
    </div>
  );
}