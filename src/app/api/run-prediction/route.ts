import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { appConfig } from "@/config/app-config"
import fs from "fs"

const execPromise = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Received prediction request:", data)

    // For development/testing, if the Python script doesn't exist or can't be executed,
    // return a mock prediction result
    const scriptPath = appConfig.pythonScriptPath
    let scriptExists = false

    try {
      // Check if the script exists
      await fs.promises.access(scriptPath)
      scriptExists = true
    } catch (error) {
      console.warn(`Python script not found at ${scriptPath}. Using mock prediction.`)
    }

    if (scriptExists) {
      // Create a JSON string to pass to the Python script
      const jsonData = JSON.stringify(data)

      // Execute the Python script with the application data
      const { stdout, stderr } = await execPromise(`python ${scriptPath} '${jsonData}'`)

      if (stderr) {
        console.error("Python script error:", stderr)
        return NextResponse.json({ success: false, error: stderr }, { status: 500 })
      }

      // Parse the output from the Python script
      let result
      try {
        result = JSON.parse(stdout)
      } catch (e) {
        console.error("Error parsing Python script output:", e, "Raw output:", stdout)
        return NextResponse.json({ success: false, error: "Invalid output from prediction script" }, { status: 500 })
      }

      return NextResponse.json({ success: true, result })
    } else {
      // Return mock prediction result
      const mockScore = -1 // Random score between 70-99
      return NextResponse.json({
        success: true,
        result: {
          applicationId: data.applicationId,
          score: mockScore,
        },
      })
    }
  } catch (error) {
    console.error("Error running prediction:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
