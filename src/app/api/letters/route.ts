import { getAllLetters } from "@/lib/letters";

export async function GET() {
  const letters = getAllLetters();
  return Response.json(letters);
}
