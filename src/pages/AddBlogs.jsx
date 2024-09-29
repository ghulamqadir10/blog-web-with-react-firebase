import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config"; // Adjust the path to your Firestore config
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../config";

function AddBlogs() {
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      alert("You must be logged in to add a blog.");
      return;
    }

    console.log("Data submitted:", data); // Log submitted data
    try {
      await addDoc(collection(db, "blogs"), {
        title: data.Title,
        description: data.description,
        uid: user.uid,
        userName: user.displayName,
      });
      alert("Blog added successfully!");
    } catch (error) {
      console.error("Error adding blog: ", error); // Log error details
      alert("Failed to add blog.");
    }
  };

  return (
    <div
      className="p-2 w-1/2 w-sm w-md max-w-lg text-center m-auto mt-20"
      style={{ borderRadius: `24px`, boxShadow: `3px 3px 8px 10px skyblue` }}
    >
      <div className="p-2 text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1
            className="text-4xl glass"
            style={{ textDecoration: `underline` }}
          >
            Add Blogs
          </h1>
          <br />
          <h2 className="text-3xl">Title:</h2>
          <input
            type="text"
            {...register("Title", { required: true })}
            placeholder="Title"
            className="input input-bordered w-full max-w-xs input-info"
          />
          {errors.Title && <p className="text-red-500">Title is required.</p>}
          <br />
          <h2 className="text-2xl">Description:</h2>
          <textarea
            className="textarea textarea-info mt-2"
            {...register("description", { required: true })}
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description is required.</p>
          )}
          <br />
          <button type="submit" className="btn btn-info btn-outline">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlogs;
