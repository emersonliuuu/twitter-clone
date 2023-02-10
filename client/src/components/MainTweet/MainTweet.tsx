import React, { useState } from "react";

const MainTweet = () => {
  const [tweet, setTweet] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(tweet);
    setTweet("");
    // window.location.reload();
  };

  return (
    <div>
      <p className="font-bold pl-2 my-2">Username</p>
      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweet(e.target.value)}
          typeof="text"
          placeholder="What's happening"
          className="bg-slate-200 p-2 rounded w-full"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      Some tweets right here.
    </div>
  );
};

export default MainTweet;
