import AddToList from "@/Components/AddToList";
import Bg from "@/Components/Bg";
import React from "react";

const page = () => {
  return (
    <div className=" min-vh-100 bg-dark text-white">
      <Bg />
      <AddToList />
    </div>
  );
};

export default page;
