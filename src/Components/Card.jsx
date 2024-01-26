import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TiTickOutline } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
const Card = ({ refernce, data, index, setdata }) => {
  const [complete, setcompelete] = useState(false);
  const completeitem = (e) => {
    setcompelete(true);
    // let todos = JSON.parse(localStorage.getItem("todos"));
    // todos[e].completion = complete;
    // console.log(todos[e].completion);

    // setdata(todos);
    // localStorage.setItem("todos", JSON.stringify(todos));
  };
  const deleteitem = (e) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(e, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    setdata(todos);
    setcompelete(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={refernce}
      whileDrag={{ scale: 1.02 }}
      whileHover={{ scale: 1.01 }}
      dragElastic={0.1}
      className={`${
        complete ? "text-decoration-line-through opacity-75 " : ""
      } text-dark p-3 cardset`}
    >
      <p className="fs-6 ">{data.title}</p>
      <p className="overflow-auto">{data.description}</p>
      <div className="position-absolute ">
        {complete ? (
          <FaRegTrashAlt
            size={"2em"}
            color="yellow"
            className="rounded-circle p-2 bg-dark"
            onClick={() => {
              deleteitem(index);
            }}
          />
        ) : (
          <TiTickOutline
            size={"2em"}
            color="yellow"
            className="rounded-circle p-1 bg-dark"
            onClick={() => {
              completeitem(index);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Card;
