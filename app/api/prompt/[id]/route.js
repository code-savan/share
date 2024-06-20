import { connectToDB } from "@utils/database";
import Quote from "@models/quote";
// GET (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const quote = await Quote.findById(params.id).populate("creator");

    if (!quote) return new Response("Quote not found", { status: 404 });

    return new Response(JSON.stringify(quote), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all quotes", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async(request, { params }) => {
    const { quote, tag } = await request.json()
    
    try {
        await connectToDB()

        const existingQuote = await Quote.findById(params.id)

        if (!existingQuote) return new Response("Quote not found",
            { status: 404 })
        
        existingQuote.quote = quote
        existingQuote.tag = tag

        await existingQuote.save()

        return new Response(JSON.stringify(existingQuote), { status: 200 })
    } catch (error) {
         return new Response("Failed to update quote", { status: 500 });
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Quote.findByIdAndDelete(params.id)

        return new Response("Quote deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete quote", {status: 500});
    }
}
