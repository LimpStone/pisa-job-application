"use client";

import type React from "react";
import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface SkillInputProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

const SkillInput: React.FC<SkillInputProps> = ({
  skills,
  setSkills,
  label = "Skills",
  placeholder = "Add a skill and press Enter",
  error,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !skills.includes(trimmedValue)) {
      setSkills([...skills, trimmedValue]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center text-sm"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 text-blue-800 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addSkill}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default SkillInput;
