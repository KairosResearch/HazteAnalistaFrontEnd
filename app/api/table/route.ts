import { tableData } from "@/lib/data";
export async function GET() {
    return Response.json({tableData});
}