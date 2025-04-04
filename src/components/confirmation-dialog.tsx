"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  applicationId: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  applicationId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-lg font-semibold mt-4">
            Application Submitted Successfully
          </DialogTitle>
          <DialogDescription className="text-center">
            Thank you for applying to Pisa. We've received your application and will review it shortly.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 my-2 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-600">Application ID:</p>
          <p className="font-medium">{applicationId}</p>
        </div>

        <p className="text-sm text-gray-600">
          We'll contact you via email with updates on your application status.
          Please keep this application ID for your reference.
        </p>

        <DialogFooter className="mt-6">
          <Button onClick={onClose} className="w-full">
            Return to Jobs
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
