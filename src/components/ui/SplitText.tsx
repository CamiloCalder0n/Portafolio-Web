import React from "react";

interface SplitTextProps {
  text: string;
  type?: "chars" | "words";
  className?: string;
  wordClassName?: string;
  itemClassName?: string;
}

export default function SplitText({
  text,
  type = "chars",
  className = "",
  wordClassName = "inline-block overflow-hidden",
  itemClassName = "inline-block",
}: SplitTextProps) {
  // Return early if text is empty
  if (!text) return null;

  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`} aria-label={text} role="text">
      {type === "words" ? (
        words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className={`${wordClassName}`}
            aria-hidden="true"
          >
            <span className={`${itemClassName} split-word mr-[0.25em]`}>
              {word}
            </span>
          </span>
        ))
      ) : (
        words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className={`${wordClassName} mr-[0.25em]`}
            aria-hidden="true"
            style={{ whiteSpace: "nowrap" }}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`${itemClassName} split-char`}
              >
                {char}
              </span>
            ))}
          </span>
        ))
      )}
    </span>
  );
}
