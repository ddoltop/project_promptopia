import { connectDB } from "@utils/database";

import Prompt from "@models/prompt";

export const dynamic = 'force-dynamic';
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
        'Cache-Control': 'private, no-store'
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
