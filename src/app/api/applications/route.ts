import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applicationFormSchema, type ApplicationFormValues } from "@/lib/schema";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received data:', body);

    // Validate the data against the schema
    const data = applicationFormSchema.parse(body);

    // Create the application with related data
    const application = await prisma.application.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        coverLetter: data.coverLetter || null,
        portfolioWebsite: data.portfolioWebsite || null,
        linkedIn: data.linkedIn || null,
        github: data.github || null,
        hasResume: data.hasResume,
        agreeToTerms: data.agreeToTerms,
        education: {
          create: {
            highestLevel: data.education.highestLevel,
            institution: data.education.institution,
            fieldOfStudy: data.education.fieldOfStudy,
            graduationYear: data.education.graduationYear,
          },
        },
        experience: {
          create: {
            totalYears: data.experience.totalYears,
            currentTitle: data.experience.currentTitle ?? undefined,
            currentCompany: data.experience.currentCompany ?? undefined,
            achievements: data.experience.achievements ?? undefined,
          },
        },
        skills: {
          create: data.skills.map((skill) => ({
            skill,
          })),
        },
        projects: {
          create: (data.projects ?? []).map((project) => ({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
          })),
        },
      },
      include: {
        education: true,
        experience: true,
        skills: true,
        projects: true,
      },
    });

    return NextResponse.json({ 
      message: "Application submitted successfully",
      applicationId: application.id,
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    
    // Return more detailed error information
    return NextResponse.json({ 
      message: "Error submitting application",
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 400 });
  }
}