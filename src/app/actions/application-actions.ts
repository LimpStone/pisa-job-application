"use server"

import { PrismaClient } from "@prisma/client"
import { applicationFormSchema, type ApplicationFormValues } from "@/lib/schema"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function submitApplication(formData: ApplicationFormValues) {
  try {
    // Validate form data
    const validatedData = applicationFormSchema.parse(formData)

    // Create application record with related data
    const application = await prisma.application.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        zipCode: validatedData.zipCode,
        country: validatedData.country,
        coverLetter: validatedData.coverLetter,
        portfolioWebsite: validatedData.portfolioWebsite || null,
        linkedIn: validatedData.linkedIn || null,
        github: validatedData.github || null,
        hasResume: validatedData.hasResume,
        agreeToTerms: validatedData.agreeToTerms,
        jobId: validatedData.jobId,
        // Create related education record
        education: {
          create: {
            highestLevel: validatedData.education.highestLevel,
            institution: validatedData.education.institution,
            fieldOfStudy: validatedData.education.fieldOfStudy,
            graduationYear: validatedData.education.graduationYear,
          },
        },
        // Create related experience record
        experience: {
          create: {
            totalYears: validatedData.experience.totalYears,
            currentTitle: validatedData.experience.currentTitle,
            currentCompany: validatedData.experience.currentCompany,
            achievements: validatedData.experience.achievements,
          },
        },
        // Create related skills
        skills: {
          create: validatedData.skills.map((skill) => ({
            skill: skill,
          })),
        },
        // Create related projects
        projects: {
          create:
            validatedData.projects?.map((project) => ({
              title: project.title,
              description: project.description,
              technologies: project.technologies,
            })) || [],
        },
      },
    })

    // Update job applicants count
    await prisma.job.update({
      where: { id: validatedData.jobId },
      data: { applicants: { increment: 1 } },
    })

    // Revalidate the job page
    revalidatePath(`/jobs/${validatedData.jobId}`)

    return {
      success: true,
      applicationId: application.id,
      message: "Application submitted successfully",
    }
  } catch (error) {
    console.error("Error submitting application:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit application",
    }
  } finally {
    await prisma.$disconnect()
  }
}
