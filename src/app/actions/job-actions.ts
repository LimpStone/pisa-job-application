"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { unstable_noStore as noStore } from "next/cache"

export async function createJob(formData: FormData) {
  try {
    const jobData = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      department: formData.get("department") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      level: formData.get("level") as string,
      salary: formData.get("salary") as string,
      description: formData.get("description") as string,
      requirements: formData.get("requirements") as string,
      responsibilities: formData.get("responsibilities") as string,
      postedDate: new Date(),
      applicants: 0,
    }

    const job = await prisma.job.create({
      data: jobData,
    })

    // Revalidar todas las rutas relevantes
    revalidatePath("/")
    revalidatePath("/PisaManager")
    revalidatePath("/jobs")

    return { success: true, message: "Job created successfully", job }
  } catch (error) {
    console.error("Error creating job:", error)
    return { success: false, message: "Failed to create job" }
  }
}

export async function getJobs() {
  noStore() // Deshabilitar el caché para esta función
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

export async function updateJob(jobId: number, jobData: any) {
  try {
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: jobData,
    })

    // Revalidar todas las rutas relevantes
    revalidatePath("/")
    revalidatePath("/PisaManager")
    revalidatePath("/jobs")

    return { success: true, message: "Job updated successfully", job: updatedJob }
  } catch (error) {
    console.error("Error updating job:", error)
    return { success: false, message: "Failed to update job" }
  }
}

export async function deleteJob(jobId: number) {
  try {
    await prisma.job.delete({
      where: { id: jobId },
    })

    // Revalidar todas las rutas relevantes
    revalidatePath("/")
    revalidatePath("/PisaManager")
    revalidatePath("/jobs")

    return { success: true, message: "Job deleted successfully" }
  } catch (error) {
    console.error("Error deleting job:", error)
    return { success: false, message: "Failed to delete job" }
  }
}
