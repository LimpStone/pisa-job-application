import Link from "next/link"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Briefcase, MapPin, Clock, Building } from "lucide-react"
import { getPublicJobs } from "./actions/public-job-actions"
import { formatDistanceToNow } from "date-fns"

export default async function Home() {
  // Fetch real jobs from the database
  const { success, jobs, error } = await getPublicJobs()

  // Get the 3 most recent jobs to feature
  const featuredJobs = success && jobs.length > 0 ? jobs.slice(0, 3) : []

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team at Pisa</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're looking for talented individuals to help us build the future of technology. Find your dream job
              today.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-blue-600 hover:bg-blue-600">
                <Link href="https://www.pisa.com.mx/nuestra-empresa/#quienessomos">About Pisa</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <Button asChild variant="ghost" className="flex items-center gap-1">
                <Link href="/jobs">
                  View All Jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {!success ? (
              <div className="text-center p-8 border rounded-lg bg-white">
                <h3 className="text-lg font-medium mb-2">Error Loading Jobs</h3>
                <p className="text-gray-500 mb-4">{error || "Failed to load jobs. Please try again later."}</p>
              </div>
            ) : featuredJobs.length === 0 ? (
              <div className="text-center p-8 border rounded-lg bg-white">
                <h3 className="text-lg font-medium mb-2">No Jobs Available</h3>
                <p className="text-gray-500 mb-4">Check back later for new job postings.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="text-sm text-blue-600 font-medium">{job.department}</div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building className="h-4 w-4 flex-shrink-0" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-4 w-4 flex-shrink-0" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/apply/${job.id}`}>Apply Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Join Pisa?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 10h-4V4h-2v6h-4v2h4v6h2v-6h4v-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovative Culture</h3>
                <p className="text-gray-600">
                  We encourage creative thinking and innovation at all levels of the organization.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3c-2.2 0-4 1.8-4 4 0 .4.1.7.1 1l-7.1 4.2c-.7-.7-1.7-1.2-2.8-1.2C1.5 11 0 12.5 0 14.3s1.5 3.3 3.3 3.3c1.1 0 2.1-.5 2.8-1.2l7.1 4.2c-.1.3-.1.7-.1 1 0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-1.1 0-2.1.5-2.8 1.2l-7.1-4.2c.1-.3.1-.7.1-1 0-.4-.1-.7-.1-1l7.1-4.2c.7.7 1.7 1.2 2.8 1.2 1.8 0 3.3-1.5 3.3-3.3S18.8 3 17 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-gray-600">
                  We invest in our employees' development with clear paths for advancement.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Great Benefits</h3>
                <p className="text-gray-600">
                  Enjoy competitive salaries, health benefits, flexible work arrangements, and more.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
