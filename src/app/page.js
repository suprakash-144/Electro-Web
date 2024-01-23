import React from "react";
import Bg from "./../Components/bg";
import TodoArea from "@/Components/TodoArea";
import AddToList from "@/Components/AddToList";

function page() {
  return (
    <div className=" min-vh-100 bg-dark ">
      <Bg />
      <AddToList />
      <TodoArea />
    </div>
  );
}

export default page;
