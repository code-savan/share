"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";


import Form from "@components/Form";
const EditPrompt = () => {
  <Suspense
    fallback={
      <div className="w-full flex-center">
        <Image
          src="assets/icons/loader.svg"
          width={50}
          height={50}
          alt="loader"
          className="object-contain"
        />
      </div>
    }
  >
    <Edit />
  </Suspense>;

}
  
const Edit = () => {
  const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    quote: "",
    tag: "",
  });
    
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                quote: data.quote,
                tag: data.tag,
            })
        }

        if(promptId) getPromptDetails()
    },[promptId])



  const updatePrompt = async (e) => {
    e.preventDefault();
      setSubmitting(true);
      
      if(!promptId) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
