import { lessons } from "@/lib/data";
export async function GET() {
    return Response.json({lessons});
}