import { getLogin } from "@/services/backend/login";
export async function GET() {
    const data = await getLogin();
    return Response.json(data);
}