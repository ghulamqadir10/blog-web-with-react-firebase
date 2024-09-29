import React, { useEffect, useState } from "react";
import { db } from "../../config"; // Adjust the path to your Firestore config
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = doc(db, "blogs", id);
        const blogSnapshot = await getDoc(blogDoc);
        if (blogSnapshot.exists()) {
          setBlog({ id: blogSnapshot.id, ...blogSnapshot.data() });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      {blog ? (
        <div className="bg-white shadow-lg rounded-lg p-10">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p className="mt-4">{blog.description}</p>
          <p className="mt-4 text-gray-500">
            Written by: {blog.userName || "nothung"}
          </p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div>No blog found!</div>
      )}
    </div>
  );
}

export default SingleBlog;
