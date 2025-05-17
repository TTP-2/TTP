import React, { useState, useEffect, useRef } from "react";

export default function BinaryTypingLeft() {
  const message = "python";

  const binaryString = message
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  const [bits, setBits] = useState("");
  const containerRef = useRef(null);
  const [stopTyping, setStopTyping] = useState(false);

  useEffect(() => {
    if (stopTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setBits((prev) => {
        const nextBit = binaryString[index];
        index = (index + 1) % binaryString.length;
        return prev + nextBit;
      });
    }, 10); // typing faster

    return () => clearInterval(interval);
  }, [binaryString, stopTyping]);

  useEffect(() => {
    if (containerRef.current) {
      const el = containerRef.current;
      if (el.scrollHeight > el.clientHeight) {
        setStopTyping(true);
      }
    }
  }, [bits]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "limegreen",
        fontFamily: "monospace",
        overflow: "hidden",
        position: "relative",
        padding: 10,
        boxSizing: "border-box",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: 6,
          whiteSpace: "pre-wrap",
          userSelect: "none",
          maxWidth: "45vw",
          lineHeight: 1.2,
          overflowWrap: "break-word",
          height: "calc(100vh - 20px)",
          overflowY: "hidden",
        }}
      >
        {bits.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* Vertical middle line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "1px",
          backgroundColor: "limegreen",
          transform: "translateX(-50%)",
        }}
      />

      {/* Horizontal line from middle to right */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "1px",
          width: "50vw",
          backgroundColor: "limegreen",
          transform: "translateY(-50%)",
        }}
      />

      {/* Top right corner text box */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <input
          type="text"
          placeholder="Type here..."
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            padding: "4px 8px",
            borderRadius: 4,
            border: "1px solid limegreen",
            backgroundColor: "black",
            color: "limegreen",
            outline: "none",
            width: 150,
          }}
        />
      </div>
    </div>
  );
}
