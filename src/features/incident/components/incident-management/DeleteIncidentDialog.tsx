import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';

interface DeleteIncidentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  incidentType: string;
}

export default function DeleteIncidentDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  incidentType
}: DeleteIncidentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] w-[450px]">
        <DialogHeader>
          <DialogTitle>Delete Incident</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {incidentType} incident? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-shrink-0 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? 'Deleting...' : 'Delete Incident'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
