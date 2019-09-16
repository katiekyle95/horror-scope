import React from "react";
import "./style.css";

export function List({ children }) {
  return (
    <div className="list-container">
      <ul className="listGroup">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-item">{children}</li>;
}
