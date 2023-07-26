'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import Profile from "@components/Profile"

const MyProfile = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  
  console.log('MyProfile called>>>>>>>>>>>>>', session);

  const handleEdit = async(post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  const handleDelete = async(post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');
    if(hasConfirmed){
      try {

        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });
        console.log('response:', response);
        // const data = await response.json();
        if(response.ok){
          // router.push('/profile');
          const filtered = posts.filter((p) => p._id !== post._id);
          setPosts(filtered);
        }
      }catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const retVal = await response.json();
      setPosts(retVal);
    }
    if(session?.user?.id){
      fetchPosts();
      console.log('MyProfile fetchPosts called 1 >>>>>>>>>>>>>', session);
    }
  },[session]);

  return (
    <>
      {posts ? (
        <Profile
          name="My"
          desc="Welcome to your profile page."
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ): <></>
      }
    </>
  )
}

export default MyProfile