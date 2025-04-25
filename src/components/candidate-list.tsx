"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    score: 92,
    education: "Master's Degree",
    location: { city: "San Francisco", state: "CA", country: "USA" },
    institution: "Stanford University",
    fieldOfStudy: "Computer Science",
    experience: 5,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    id: 2,
    name: "Jamie Smith",
    score: 87,
    education: "Bachelor's Degree",
    location: { city: "New York", state: "NY", country: "USA" },
    institution: "NYU",
    fieldOfStudy: "Software Engineering",
    experience: 3,
    skills: ["JavaScript", "React", "CSS", "HTML"],
  },
  {
    id: 3,
    name: "Taylor Wilson",
    score: 95,
    education: "PhD",
    location: { city: "Boston", state: "MA", country: "USA" },
    institution: "MIT",
    fieldOfStudy: "Computer Science",
    experience: 8,
    skills: ["Python", "Machine Learning", "React", "AWS"],
  },
  {
    id: 4,
    name: "Morgan Lee",
    score: 78,
    education: "Bachelor's Degree",
    location: { city: "Seattle", state: "WA", country: "USA" },
    institution: "University of Washington",
    fieldOfStudy: "Information Systems",
    experience: 2,
    skills: ["JavaScript", "React", "UI Design"],
  },
  {
    id: 5,
    name: "Casey Brown",
    score: 89,
    education: "Master's Degree",
    location: { city: "Austin", state: "TX", country: "USA" },
    institution: "UT Austin",
    fieldOfStudy: "Computer Engineering",
    experience: 4,
    skills: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 6,
    name: "Riley Garcia",
    score: 91,
    education: "Master's Degree",
    location: { city: "Chicago", state: "IL", country: "USA" },
    institution: "University of Chicago",
    fieldOfStudy: "Data Science",
    experience: 6,
    skills: ["Python", "React", "SQL", "Data Visualization"],
  },
  {
    id: 7,
    name: "Jordan Martinez",
    score: 84,
    education: "Bachelor's Degree",
    location: { city: "Denver", state: "CO", country: "USA" },
    institution: "University of Colorado",
    fieldOfStudy: "Web Development",
    experience: 3,
    skills: ["JavaScript", "React", "Node.js", "CSS"],
  },
  {
    id: 8,
    name: "Avery Robinson",
    score: 93,
    education: "PhD",
    location: { city: "Portland", state: "OR", country: "USA" },
    institution: "Portland State University",
    fieldOfStudy: "Computer Science",
    experience: 7,
    skills: ["React", "GraphQL", "TypeScript", "AWS"],
  },
  {
    id: 9,
    name: "Quinn Thompson",
    score: 82,
    education: "Bachelor's Degree",
    location: { city: "Miami", state: "FL", country: "USA" },
    institution: "University of Miami",
    fieldOfStudy: "Computer Science",
    experience: 2,
    skills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 10,
    name: "Reese Clark",
    score: 88,
    education: "Master's Degree",
    location: { city: "Los Angeles", state: "CA", country: "USA" },
    institution: "UCLA",
    fieldOfStudy: "Software Engineering",
    experience: 5,
    skills: ["React", "Redux", "Node.js", "MongoDB"],
  },
]

interface CandidateListProps {
  jobId: number
}

export function CandidateList({ jobId }: CandidateListProps) {
  const [sortField, setSortField] = useState<string>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [expanded, setExpanded] = useState<number | null>(null)

  // In a real app, fetch candidates based on jobId
  const candidates = mockCandidates

  const sortedCandidates = [...candidates].sort((a, b) => {
    let comparison = 0

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === "education") {
      comparison = a.education.localeCompare(b.education)
    } else if (sortField === "location") {
      comparison = a.location.city.localeCompare(b.location.city)
    } else if (sortField === "experience") {
      comparison = a.experience - b.experience
    } else {
      // Default to score
      comparison = a.score - b.score
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc") // Default to descending for new sort field
    }
  }

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">{candidates.length} Candidates</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <SortAsc className="h-4 w-4" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort("score")}>
              ML Score {sortField === "score" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("name")}>
              Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("education")}>
              Education {sortField === "education" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("location")}>
              Location {sortField === "location" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("experience")}>
              Experience {sortField === "experience" && (sortDirection === "asc" ? "↑" : "↓")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-2">
          {sortedCandidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg overflow-hidden bg-white">
              <div
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(candidate.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
                    {candidate.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-gray-500">
                      {candidate.location.city}, {candidate.location.state}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">{candidate.score}</div>
                  {expanded === candidate.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              {expanded === candidate.id && (
                <div className="p-3 border-t bg-gray-50">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-xs text-gray-500">Education</div>
                      <div className="text-sm">{candidate.education}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Field of Study</div>
                      <div className="text-sm">{candidate.fieldOfStudy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Institution</div>
                      <div className="text-sm">{candidate.institution}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Experience</div>
                      <div className="text-sm">{candidate.experience} years</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
