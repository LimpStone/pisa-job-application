"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string;
}

interface ProjectInputProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const ProjectInput: React.FC<ProjectInputProps> = ({ projects, setProjects }) => {
  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", technologies: "" }
    ]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setProjects(updatedProjects);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-medium">Projects (Optional)</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addProject}
          className="flex items-center gap-1"
        >
          <Plus className="h-3 w-3" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-gray-500">
          Add your relevant projects to showcase your experience.
        </p>
      )}

      {projects.map((project, index) => (
        <div key={`project-${index}`} className="p-4 border rounded-md space-y-3 relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeProject(index)}
            className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="mt-2">
            <Label htmlFor={`project-title-${index}`}>Project Title</Label>
            <Input
              id={`project-title-${index}`}
              value={project.title}
              onChange={(e) => updateProject(index, "title", e.target.value)}
              placeholder="E.g., E-commerce Website, Mobile App, etc."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`project-description-${index}`}>Description</Label>
            <Textarea
              id={`project-description-${index}`}
              value={project.description}
              onChange={(e) => updateProject(index, "description", e.target.value)}
              placeholder="Briefly describe your project and your role in it"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor={`project-technologies-${index}`}>Technologies Used</Label>
            <Input
              id={`project-technologies-${index}`}
              value={project.technologies}
              onChange={(e) => updateProject(index, "technologies", e.target.value)}
              placeholder="E.g., React, Node.js, Python, AWS, etc."
              className="mt-1"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectInput;
