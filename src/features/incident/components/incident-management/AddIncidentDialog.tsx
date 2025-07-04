import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import type { IncidentFormData } from '../../types/incident';
import IncidentFormFields from './IncidentFormField';
import { useState } from 'react';
import { validateIncidentForm } from '../../utils/form-validation';

interface AddIncidentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: IncidentFormData;
  onFormDataChange: (data: IncidentFormData) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function AddIncidentDialog({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false
}: AddIncidentDialogProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors = validateIncidentForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-none w-[50vw] max-h-[95vh] overflow-hidden flex flex-col min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add New Incident</DialogTitle>
          <DialogDescription>
            Create a new racing incident record with all relevant details.
          </DialogDescription>
        </DialogHeader>
        <IncidentFormFields
          formData={formData}
          onFormDataChange={onFormDataChange}
          errors={errors}
        />
        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="cursor-pointer">
            {isSubmitting ? 'Creating...' : 'Add Incident'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
