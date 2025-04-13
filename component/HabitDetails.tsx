"use client";
import React, { useState, useRef, useEffect } from "react";
import "./habitStyle.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function HabitDetails() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await response.json();

      if (data.success) {
        // Add assistant response to chat
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Handle error in response
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      // Handle network error
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was a problem connecting to the server.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="terminal-text"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "500px",
          width: "100%",
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderBottom: "1px solid #444",
          backgroundColor: "#222",
        }}
      >
        <span style={{ textAlign: "left", fontWeight: "bold" }}>
          Habit Chat
        </span>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", margin: "auto" }}>
            Start a conversation with the Habit Assistant
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#2a6ea6" : "#333",
                padding: "10px 15px",
                borderRadius: "18px",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </div>
          ))
        )}
        {isLoading && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#333",
              padding: "10px 15px",
              borderRadius: "18px",
              maxWidth: "70%",
            }}
          >
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #444",
          backgroundColor: "#222",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{
            flex: 1,
            backgroundColor: "#333",
            border: "none",
            color: "#fff",
            padding: "10px",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            backgroundColor: "#2a6ea6",
            color: "#fff",
            border: "none",
            padding: "0 15px",
            borderRadius: "4px",
            cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
            opacity: isLoading || !inputValue.trim() ? 0.7 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default HabitDetails;
