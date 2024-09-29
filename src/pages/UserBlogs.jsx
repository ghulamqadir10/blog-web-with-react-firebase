import React, { useEffect, useState } from "react";
import { db } from "../../config"; // Adjust the path to your Firestore config
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

function UserBlogs() {
  const { uid } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        console.log("Fetching blogs for UID:", uid); // Log UID for debugging
        const blogsCollection = collection(db, "blogs");
        const q = query(blogsCollection, where("uid", "==", uid));
        const blogsSnapshot = await getDocs(q);

        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched blogs:", blogsList); // Log the fetched blogs
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching user blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-10">
      <h1 className="text-center my-5 text-[33px]">User Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found for this user.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-lg rounded-lg p-10">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="mt-2">{blog.description}</p>
            <p className="mt-2 text-gray-500">Author: {blog.userName}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserBlogs;
