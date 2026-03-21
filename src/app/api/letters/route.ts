import { getAllLetters } from "@/lib/letters";

export async function GET() {
  const letters = getAllLetters();
  return Response.json(letters, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
