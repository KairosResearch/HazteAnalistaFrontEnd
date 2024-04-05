import { tableData, lessons } from "@/lib/data";
export async function GET() {
    return Response.json({tableData, lessons});
}