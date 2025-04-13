"use client";
import React from "react";
import { useState } from "react";
import "./habitStyle.css";

interface HabitInfo {
  title: string;
  Description: number;
  node: number;
}

function HabitDetails() {
  return (
    <div
      className="terminal-text"
      style={{
        position: "relative",
        //border: '3px solid red',
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",

          // or whatever width you need
        }}
      >
        <span style={{ textAlign: "left" }}>Habit </span>
        <span style={{ textAlign: "right" }}>Day 01</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}

export default HabitDetails;
