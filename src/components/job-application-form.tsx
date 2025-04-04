"use client";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/file-upload";
import SkillInput from "@/components/skill-input";
import ProjectInput from "@/components/project-input";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";

export const applicationFormSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  zipCode: z.string().nonempty("Zip code is required"),
  country: z.string().nonempty("Country is required"),
  education: z.object({
    highestLevel: z.string(),
    institution: z.string(),
    fieldOfStudy: z.string(),
    graduationYear: z.string(),
  }),
  experience: z.object({
    totalYears: z.string(),
    currentTitle: z.string(),
    currentCompany: z.string(),
    achievements: z.string(),
  }),
  skills: z.array(z.string()),
  otherSkills: z.string(),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      technologies: z.string(),
    })
  ),
  coverLetter: z.string(),
  portfolioWebsite: z.string().optional(),
  linkedIn: z.string().optional(),
  github: z.string().optional(),
  hasResume: z.boolean(),
  agreeToTerms: z.boolean(),
});

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

const experienceLevels = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  jobId,
  jobTitle,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      education: {
        highestLevel: educationLevels[2], // Default to Bachelor's
        institution: "",
        fieldOfStudy: "",
        graduationYear: "",
      },
      experience: {
        totalYears: experienceLevels[1], // Default to 1-3 years
        currentTitle: "",
        currentCompany: "",
        achievements: "",
      },
      skills: [],
      otherSkills: "",
      projects: [],
      coverLetter: "",
      portfolioWebsite: "",
      linkedIn: "",
      github: "",
      hasResume: false,
      agreeToTerms: false,
    },
  });

  async function onSubmit(values: ApplicationFormValues) {
    try {
      setIsSubmitting(true);

      // Mock form submission for static site
      // In a real app, this would be an API call to a serverless function
      console.log("Application data:", values);
      console.log("Resume file:", resumeFile ? `${resumeFile.name} (${resumeFile.size} bytes)` : "None");

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create mock application ID
      const mockApplicationId = `APP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Show success dialog
      setApplicationId(mockApplicationId);
      setConfirmationOpen(true);

      // Reset form
      form.reset();
      setResumeFile(null);

      // Show success toast
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip/Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="education.highestLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Level of Education</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education.institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="University/College Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education.fieldOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Computer Science" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education.graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="YYYY" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experience.totalYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience.currentTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current/Most Recent Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience.currentCompany"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current/Most Recent Company</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience.achievements"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Key Achievements</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Briefly describe your key achievements and responsibilities"
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SkillInput
                            skills={field.value}
                            setSkills={field.onChange}
                            label="Technical Skills"
                            placeholder="Add a skill and press Enter (e.g., JavaScript, React, Python)"
                            error={form.formState.errors.skills?.message}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="otherSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Skills</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="List any other relevant skills or qualifications"
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ProjectInput
                          projects={field.value}
                          setProjects={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Tell us why you're interested in this position and why you'd be a good fit"
                            className="min-h-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="portfolioWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio Website</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn Profile</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://linkedin.com/in/..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub Profile</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://github.com/..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Resume/CV</h3>
                <FileUpload
                  onFileSelected={setResumeFile}
                  label="Upload Your Resume"
                  description="Upload your resume in PDF, DOC, or DOCX format (Max: 5MB)"
                />
              </div>

              {/* Terms and Submission */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            className="text-blue-600 hover:underline" rel="noreferrer"
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            target="_blank"
                            className="text-blue-600 hover:underline" rel="noreferrer"
                          >
                            Privacy Policy
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        applicationId={applicationId}
      />
    </>
  );
};

export default JobApplicationForm;
