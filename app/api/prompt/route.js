import {connectDB} from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req) => {
  try{
    await connectDB();
    const prompts = await Prompt.find({}).populate('creator');
    // console.log('-----------------------------------------------------')
    console.log(prompts);
    // console.log('-----------------------------------------------------')

    return new Response(JSON.stringify(prompts), {status: 200})
  }catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", {status: 500})
  }
}