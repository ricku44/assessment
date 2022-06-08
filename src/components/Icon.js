import React from "react";

export default function Icon({ name, size = 20, className = "", onClick, a, style }) {
  return (
    <svg
      style={style}
      className={`fill-current ${className}`}
      width={size.toString() + "px"}
      height={size.toString() + "px"}
      onClick={onClick}
      a={a}
    >
      <use xlinkHref={`/icons/solid.svg#${name}`} />
    </svg>
  );
}
