import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    // console.log('-----------------------------------------------------')
    console.log('api prompt GET:',prompts);
    // console.log('-----------------------------------------------------')

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=1',
        'CDN-Cache-Control': 'public, s-maxage=60',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
