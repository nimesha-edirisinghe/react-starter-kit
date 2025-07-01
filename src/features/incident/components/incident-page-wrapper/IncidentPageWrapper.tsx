import { useState, useCallback } from 'react';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import { useCreateIncidentMutation } from '~/api/mutations/useCreateIncidentMutation';
import { IncidentFormData } from '../../types/incident';
import { IncidentTable } from '../incident-table/IncidentTable';
import AddIncidentDialog from '../incident-management/AddIncidentDialog';

export default function IncidentPageWrapper() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<IncidentFormData>({
    type: '',
    raceCategory: '',
    location: '',
    circuit: '',
    severity: '',
    drivers: '',
    teams: '',
    lapNumber: '',
    raceTime: '',
    description: '',
    status: '',
    stewardNotes: ''
  });

  const createIncidentMutation = useCreateIncidentMutation();

  const handleAddIncident = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setFormData({
      type: '',
      raceCategory: '',
      location: '',
      circuit: '',
      severity: '',
      drivers: '',
      teams: '',
      lapNumber: '',
      raceTime: '',
      description: '',
      status: '',
      stewardNotes: ''
    });
  }, []);

  const handleFormDataChange = useCallback((newFormData: IncidentFormData) => {
    setFormData(newFormData);
  }, []);

  const handleSubmit = useCallback(() => {
    const requiredFields = ['type', 'raceCategory', 'location', 'severity', 'status'] as const;
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    createIncidentMutation.mutate(formData, {
      onSuccess: (newIncident) => {
        console.log('Incident created successfully!', newIncident);
        handleCloseDialog();
      },
      onError: (error) => {
        console.error('Failed to create incident:', error);
        alert('Failed to create incident. Please try again.');
      }
    });
  }, [formData, createIncidentMutation, handleCloseDialog]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Incident Management</h1>
          <p className="text-slate-600">
            Monitor and manage all racing incidents with advanced filtering
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={handleAddIncident}
          className="flex items-center gap-2 cursor-pointer shrink-0 mt-4"
        >
          <Plus className="h-4 w-4" />
          <span>Add Incident</span>
        </Button>
      </div>

      <IncidentTable />

      <AddIncidentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleSubmit}
        isSubmitting={createIncidentMutation.isPending}
      />
    </div>
  );
}
