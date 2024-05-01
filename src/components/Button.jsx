import React from "react";

function Button({ className, size, variant, children, onClick }) {
  const buttonClasses = `button ${className} ${size} ${variant}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
