'use client'
import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import Form from '@components/Form';
import { use } from 'bcrypt/promises';

const EditPrompt = () => {
  console.log('EditPrompt called>>>>>>>>>>>>>');
  const router = useRouter();
  // const {data: session} = useSession();
  const searchParams = useSearchParams();

  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  console.log('promptId:', promptId);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      console.log('getPromptDetails called>>>>>>>>>>>>>', data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    }
    if(promptId) getPromptDetails();
  },[promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();

    console.log('updatePrompt called>>>>>>>>>>>>>', promptId);
    if(!promptId) return alert('Prompt ID not found');

    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })
      if(response.ok) {
        console.log('success')
        router.push('/');
      }
    }catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  
  if(post) return (
      <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />)
  return (<></>)
}

export default EditPrompt