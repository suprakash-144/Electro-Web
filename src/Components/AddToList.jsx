"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "./Card";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    completion: yup.boolean().required().default(false),
  })
  .required();

const AddToList = () => {
  const ref = useRef(null);
  const [data, setdata] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos"));
    if (items) {
      setdata(items);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addtolist = (values) => {
    setdata([...data, values]);
    localStorage.setItem("todos", JSON.stringify(data));
  };

  return (
    <div className="z-index-3 min-vh-25">
      <div className=" d-flex justify-content-center text-white">
        <form
          onSubmit={handleSubmit(addtolist)}
          className="form d-flex flex-column w-25"
        >
          <input {...register("title")} className="form-control" />
          <p>{errors.title?.message}</p>

          <input {...register("description")} className="form-control" />
          <p>{errors.description?.message}</p>
          <input type="submit" />
        </form>
      </div>
      <div className=" my-3 text-white opacity-50 d-flex justify-content-center align-items-center">
        Sticky Wall
      </div>
      <div
        ref={ref}
        className="position-relative z-inxdex-3 min-vh-80 d-flex overflow-hidden p-3 gap-3 flex-row flex-wrap "
      >
        {data &&
          data?.map((item, key) => (
            <Card
              refernce={ref}
              key={key}
              data={item}
              index={key}
              setdata={setdata}
            />
          ))}
      </div>
    </div>
  );
};

export default AddToList;
