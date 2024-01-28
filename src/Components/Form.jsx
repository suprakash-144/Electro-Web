"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseContext } from "@/config/Firebase";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const Form = () => {
  const [login, setlogin] = useState(true);
  const { signupUser, signinUser, authchange } = useContext(FirebaseContext);
  const { logedin } = authchange();
  const router = useRouter();
  useEffect(() => {
    console.log(logedin);
    if (logedin) {
      toast.success("Login Successful");
      router.push("/home", { scroll: false });
    }
  }, [logedin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <div className="row">
        <div className="col-6">
          {login ? (
            <div className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
              <div className="d-flex justify-content-center align-items-center flex-column border-bottom ">
                <button className=" btn btn-outline-light text-dark px-5 mb-4">
                  {" "}
                  <FaGoogle className="mx-4" />
                  with Google
                </button>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column ">
                <div className=" d-flex justify-content-center text-dark">
                  <form
                    onSubmit={handleSubmit(signinUser)}
                    className=" d-flex flex-column"
                  >
                    <label> Email Address</label>
                    <input
                      {...register("email")}
                      className="form-control"
                      placeholder="email"
                    />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input
                      {...register("password")}
                      className="form-control"
                      placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>

                    <button type="submit" className="btn btn-primary ">
                      Login Now
                    </button>
                  </form>
                </div>
              </div>
              <div className="">
                <span onClick={() => setlogin(!login)} className=" ">
                  {" "}
                  Don&apos;t have a account ?{" "}
                </span>
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

                <input
                  type="submit"
                  className="btn btn-outline-warning  w-25"
                />
              </form>

              <button onClick={() => setlogin(!login)} className="btn ">
                Singin
              </button>
            </div>
          )}
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default Form;
