import { AdvocateService } from "@/features/advocates/services/advocate.service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return Response.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const advocate = await AdvocateService.getAdvocateById(id);

    if (!advocate) {
      return Response.json({ error: "Advocate not found" }, { status: 404 });
    }

    return Response.json({ data: advocate });
  } catch (error) {
    console.error(`Error fetching advocate with ID ${params.id}:`, error);
    return Response.json(
      { error: "Failed to fetch advocate" },
      { status: 500 }
    );
  }
}
