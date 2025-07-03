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

interface EditIncidentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: IncidentFormData;
  onFormDataChange: (data: IncidentFormData) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function EditIncidentDialog({
  isOpen,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false
}: EditIncidentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-none w-[50vw] max-h-[95vh] overflow-hidden flex flex-col min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Incident</DialogTitle>
          <DialogDescription>Update the incident details below.</DialogDescription>
        </DialogHeader>
        <IncidentFormFields formData={formData} onFormDataChange={onFormDataChange} />
        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} className="cursor-pointer">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
