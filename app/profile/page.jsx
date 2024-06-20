"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log("Fetched data:", data);
    
      setPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, []);

  useEffect(() => {
    console.log("final log:", posts);
  }, [posts]);

  const handleEdit = (post) => { 
    router.push(`/update-prompt?id=${post._id}`);
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?")

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id)

        setPosts(filteredPosts); 
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
