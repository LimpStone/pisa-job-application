import * as z from "zod";

// Education level enum
export const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other"
] as const;

// Experience level enum
export const experienceLevels = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years"
] as const;

// Application form schema
export const applicationFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),

  // Education Information
  education: z.object({
    highestLevel: z.enum(educationLevels),
    institution: z.string().min(1, "Institution name is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    graduationYear: z.string().refine(
      (val) => !val || /^\d{4}$/.test(val),
      { message: "Please enter a valid year (e.g., 2022)" }
    ),
  }),

  // Professional Information
  experience: z.object({
    totalYears: z.enum(experienceLevels),
    currentTitle: z.string().min(1, "Current/most recent job title is required"),
    currentCompany: z.string().optional(),
    achievements: z.string().optional(),
  }),

  // Skills and Technologies
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  otherSkills: z.string().optional(),

  // Projects Information
  projects: z.array(
    z.object({
      title: z.string().min(1, "Project title is required"),
      description: z.string().min(1, "Project description is required"),
      technologies: z.string().min(1, "Technologies used is required"),
    })
  ).optional(),

  // Additional Information
  coverLetter: z.string().optional(),
  portfolioWebsite: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedIn: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),

  // Resume/CV
  hasResume: z.boolean().default(false),

  // Consent and Privacy
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
