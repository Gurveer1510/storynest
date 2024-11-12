import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import { SignUpType } from "@gurveer1510/inkspot-common";
import InputBox from "./InputBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postAccount } from "../requests";


interface AuthProps {
  type: "SignIn" | "SignUp";
}
function Auth({ type }: AuthProps) {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState<SignUpType>({
    username: "",
    email: "",
    password: "",
  });

  const clickHandler = async () => {
    try {
      await postAccount(inputs, type)
      await new Promise(r => setTimeout(r,1800))
      navigate("/blogs")
    } catch (error) {
      console.log("ERROR: ", error)
    }
  }


  return (
    <div className="h-screen flex-col flex gap-4 justify-center items-center ">
      <div>
        <div className="px-2 mx-8 ">
          <div className="text-2xl lg:text-4xl font-bold text-center">
            {type == "SignIn" ? "Log into your account" : "Create an account"}
          </div>
          <div className="text-slate-400 text-center font-normal">
            {type == "SignIn"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              className="underline"
              to={type == "SignIn" ? "/signup" : "/signin"}
            >
              {type == "SignIn" ? "create" : "Login"}
            </Link>
          </div>
        </div>

        <div className=" w-full mt-2 flex flex-col gap-2 items-center justify-center">
          {type == "SignUp" ? (
            <InputBox

              type={"text"}
              label={"Username"}
              placeholder={"Gurveer Singh"}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          ) : null}

          <InputBox
            type={"email"}
            label={"Email"}
            placeholder={"xyz@abc.com"}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <InputBox
            type={"password"}
            label={"Password"}
            placeholder={"*********"}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <Button onClick={clickHandler} type={type} />
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Auth;
