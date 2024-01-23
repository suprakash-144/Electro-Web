"use client";
import React, { useRef } from "react";
import Card from "./Card";

const TodoArea = () => {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      className="min-vh-100 d-flex overflow-hidden p-3 gap-3 flex-row flex-wrap "
    >
      <Card refernce={ref} />
      <Card refernce={ref} />
      <Card refernce={ref} />
    </div>
  );
};

export default TodoArea;
