import {connectDB} from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, {params}) => {
  try{
    await connectDB();
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');
    // console.log('user route-----------------------------------------------------')
    // console.log(prompts);
    // console.log('user route-----------------------------------------------------')

    return new Response(JSON.stringify(prompts), {status: 200})
  }catch (error) {
    // console.log(error);
    return new Response("Failed to fetch prompts", {status: 500})
  }
}