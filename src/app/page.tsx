"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: send to backend
    alert(`name: ${name}, email: ${email}, description: ${description}`);
  };

  return (
    <>
    
      <form onSubmit={handleSubmit}>
        <div className="text-3xl font-bold underline">Submit a request</div>
        <div>
          <label>
            Name:{" "}
            <input
              className="border-2 rounded-md"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Email:{" "}
            <input
              className="border-2 rounded-md"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Description:{" "}
            <textarea
              className="border-2 rounded-md"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
