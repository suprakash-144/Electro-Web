"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseContext } from "@/config/Firebase";
import { redirect } from "next/navigation";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const Form = () => {
  const [login, setlogin] = useState(true);
  const { signupUser, signinUser, State } = useContext(FirebaseContext);

  useEffect(() => {
    if (State()) {
      redirect("/home");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      {login ? (
        <div className="d-flex justify-content-center align-items-center flex-column ">
          <div className=" d-flex justify-content-center text-dark">
            <form
              onSubmit={handleSubmit(signinUser)}
              className=" d-flex flex-column "
            >
              <input
                {...register("email")}
                className="form-control"
                placeholder="Email"
              />
              <p>{errors.email?.message}</p>

              <input
                {...register("password")}
                className="form-control"
                placeholder="Password"
              />
              <p>{errors.password?.message}</p>
              <button type="submit" className="btn btn-outline-success  w-25">
                Login
              </button>
            </form>
          </div>
          <div>
            <button
              onClick={() => setlogin(!login)}
              className="btn btn-outline-warning "
            >
              {" "}
              Signup{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className=" d-flex justify-content-center text-white">
          <form
            onSubmit={handleSubmit(signupUser)}
            className="form d-flex flex-column "
          >
            <input
              {...register("email")}
              className="form-control"
              placeholder="Email"
            />
            <p>{errors.email?.message}</p>

            <input
              {...register("password")}
              className="form-control"
              placeholder="Password"
            />
            <p>{errors.password?.message}</p>

            <input type="submit" className="btn btn-outline-warning  w-25" />
          </form>

          <button onClick={() => setlogin(!login)} className="btn ">
            Singin
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
