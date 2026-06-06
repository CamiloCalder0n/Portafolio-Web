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

  // Se intercala un espacio real entre cada palabra para que el navegador tenga
  // oportunidad de salto de línea (los wrappers inline-block adyacentes sin
  // whitespace NO se parten y desbordan en móvil).
  return (
    <span className={`inline-block ${className}`} aria-label={text} role="text">
      {type === "words"
        ? words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span className={wordClassName} aria-hidden="true">
                <span className={`${itemClassName} split-word`}>{word}</span>
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </React.Fragment>
          ))
        : words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span
                className={wordClassName}
                aria-hidden="true"
                style={{ whiteSpace: "nowrap" }}
              >
                {word.split("").map((char, charIndex) => (
                  <span key={charIndex} className={`${itemClassName} split-char`}>
                    {char}
                  </span>
                ))}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
    </span>
  );
}
