import { connectToDB } from "@utils/database";
import Quote from "@models/quote";

export const GET = async (request, { params }) => {
  try {
      await connectToDB();
      
      const quotes = await Quote.find({
        creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all quotes", { status: 500 });
  }
};
