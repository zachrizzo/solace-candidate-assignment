import { AdvocateService } from "@/features/advocates/services/advocate.service";
import { Advocate } from "@/features/advocates/types/advocate.types";

export async function GET() {
  try {
    // Use the advocate service to get all advocates
    const data = await AdvocateService.getAllAdvocates();

    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "city",
      "degree",
      "specialties",
      "yearsOfExperience",
      "phoneNumber",
    ];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return Response.json(
        {
          error: "Missing required fields",
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    // Create the advocate using the service
    const newAdvocate = await AdvocateService.createAdvocate(body);

    return Response.json(
      {
        data: newAdvocate,
        message: "Advocate created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating advocate:", error);
    return Response.json(
      { error: "Failed to create advocate" },
      { status: 500 }
    );
  }
}
