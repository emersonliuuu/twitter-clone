import { FormEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const user = await axios.post("/auth/signin", {
        username,
        password,
      });
      dispatch(loginSuccess(user.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailed);
      console.log(error);
    }
  };
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginStart());
    try {
      const user = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(user.data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailed());
      console.log(error);
    }
  };

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h1 className="font-bold text-center text-3xl">Sign in to Twitter</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        type="text"
        className="text-xl rounded-full py-2 px-4"
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        className="text-xl rounded-full py-2 px-4"
      ></input>
      <button
        onClick={handleSignin}
        className="text-xl rounded-full bg-blue-500 text-white py-2"
      >
        Log in
      </button>

      <p className="font-normal text-center text-xl">Don't have an account?</p>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        type="text"
        className="text-xl rounded-full py-2 px-4"
      ></input>
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        type="email"
        className="text-xl rounded-full py-2 px-4"
      ></input>
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
        className="text-xl rounded-full py-2 px-4"
      ></input>
      <button
        onClick={handleSignup}
        className="text-xl rounded-full bg-blue-500 text-white py-2"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signin;
