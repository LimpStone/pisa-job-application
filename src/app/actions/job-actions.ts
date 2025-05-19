"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createJob(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const department = formData.get("department") as string
    const location = formData.get("location") as string
    const type = formData.get("type") as string
    const level = formData.get("level") as string
    const salary = formData.get("salary") as string
    const description = formData.get("description") as string
    const requirements = formData.get("requirements") as string
    const responsibilities = formData.get("responsibilities") as string

    // Validate required fields
    if (
      !title ||
      !company ||
      !department ||
      !location ||
      !type ||
      !level ||
      !description ||
      !requirements ||
      !responsibilities
    ) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Create job in database
    const job = await prisma.job.create({
      data: {
        title,
        company,
        department,
        location,
        type,
        level,
        salary,
        description,
        requirements,
        responsibilities,
        postedDate: new Date(),
        applicants: 0,
      },
    })

    revalidatePath("/PisaManager")

    return {
      success: true,
      message: "Job created successfully",
      job,
    }
  } catch (error) {
    console.error("Error creating job:", error)
    return {
      success: false,
      message: "Failed to create job. Please try again.",
    }
  }
}

export async function getJobs() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        postedDate: "desc",
      },
    })
    return jobs
  } catch (error) {
    console.error("Error fetching jobs:", error)
    throw new Error("Failed to fetch jobs")
  }
}

export async function updateJob(id: number, data: any) {
  try {
    await prisma.job.update({
      where: { id },
      data,
    })
    revalidatePath("/PisaManager")
    return { success: true, message: "Job updated successfully" }
  } catch (error) {
    console.error("Error updating job:", error)
    return { success: false, message: "Failed to update job" }
  }
}

export async function deleteJob(id: number) {
  try {
    await prisma.job.delete({
      where: { id },
    })
    revalidatePath("/PisaManager")
    return { success: true, message: "Job deleted successfully" }
  } catch (error) {
    console.error("Error deleting job:", error)
    return { success: false, message: "Failed to delete job" }
  }
}
