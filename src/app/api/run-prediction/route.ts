import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received prediction request:", data)

    // Get the FastAPI URL from environment variables or use default
    const fastApiUrl = process.env.FASTAPI_URL || "http://localhost:8000"
    const predictionEndpoint = `${fastApiUrl}/predict`

    try {
      // Make request to FastAPI prediction service
      const response = await fetch(predictionEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error" }))
        console.error("FastAPI error:", errorData)
        return NextResponse.json(
          { 
            success: false, 
            error: errorData.detail || `FastAPI returned status ${response.status}` 
          }, 
          { status: 500 }
        )
      }

      const result = await response.json()
      console.log("FastAPI response:", result)

      return NextResponse.json(result)
    } catch (fetchError) {
      console.error("Error connecting to FastAPI:", fetchError)
      
      // Fallback to mock prediction if FastAPI is not available
      console.warn("FastAPI not available, using mock prediction")
      const mockScore = -1 
      
      return NextResponse.json({
        success: true,
        result: {
          applicationId: data.applicationId,
          score: mockScore,
        },
        warning: "Using mock prediction - FastAPI service not available"
      })
    }
  } catch (error) {
    console.error("Error in prediction route:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
}
