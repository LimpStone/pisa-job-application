"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileSelected: (file: File | null) => void;
  accept?: string;
  label?: string;
  description?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  accept = ".pdf,.doc,.docx",
  label = "Upload Resume/CV",
  description = "Upload your resume in PDF, DOC, or DOCX format",
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validate file type
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (!accept.includes(fileType || '')) {
        setError(`Invalid file type. Please upload a file in ${accept} format`);
        setFileName(null);
        onFileSelected(null);
        return;
      }

      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        setFileName(null);
        onFileSelected(null);
        return;
      }

      setFileName(file.name);
      setError(null);
      onFileSelected(file);
    } else {
      setFileName(null);
      setError(null);
      onFileSelected(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setError(null);
    onFileSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="resume-upload">{label}</Label>
      <div className="relative">
        <Input
          ref={fileInputRef}
          id="resume-upload"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        {!fileName ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={handleButtonClick}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">{description}</p>
            <p className="mt-1 text-xs text-gray-500">Max file size: 5MB</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={handleButtonClick}
            >
              Browse Files
            </Button>
          </div>
        ) : (
          <div className="border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-6 w-6 text-blue-500" />
              <span className="text-sm font-medium">{fileName}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
