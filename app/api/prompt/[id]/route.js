import {connectDB} from '@utils/database';
import Prompt from '@models/prompt';

// GET
export const GET = async (req,{params}) => {
  try{
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if(!prompt){
      return new Response("Prompt not found", {status: 404})
    }
    return new Response(JSON.stringify(prompt), {status: 200})
  }catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompt", {status: 500})
  }
}

// PATCH
export const PATCH = async (req,{params}) => {
  const {prompt, tag} = await req.json();
  console.log('prompt:', prompt);

  try{
    await connectDB();
    const exPrompt = await Prompt.findById(params.id).populate('creator');
    if(!exPrompt){
      return new Response("Prompt not found", {status: 404})
    }
    exPrompt.prompt = prompt;
    exPrompt.tag = tag;
    await exPrompt.save();

    return new Response(JSON.stringify(exPrompt), {status: 200})
  }catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", {status: 500})
  }
}

//DELETE
export const DELETE = async (req,{params}) => {
  // const {prompt, tag} = await req.json();

  try{
    await connectDB();
    const exPrompt = await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", {status: 200})
  }catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", {status: 500})
  }
}