import React, { useEffect, useState } from "react";
import { db } from "../../config"; // Adjust the path to your Firestore config
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        const blogsSnapshot = await getDocs(blogsCollection);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-10">
      <h1 className="text-center my-5 text-[33px]">All blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white shadow-lg rounded-lg p-10">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="mt-2">{blog.description}</p>
          <p className="mt-2 text-gray-600">
            By: {blog.userName || "Anonymous"}
          </p>{" "}
          {/* Display username */}
          <Link
            to={`/singleblog/${blog.id}`}
            className="mt-4 inline-block text-blue-500"
          >
            Read more
          </Link>
          <Link
            to={`/userblogs/${blog.uid}`}
            className="mt-4 inline-block text-green-500 mx-3"
          >
            See all from this user
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
