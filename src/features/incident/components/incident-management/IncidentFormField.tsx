import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { IncidentFormData } from '../../types/incident';

interface IncidentFormFieldsProps {
  formData: IncidentFormData;
  onFormDataChange: (data: IncidentFormData) => void;
  errors?: Record<string, string>;
}

export default function IncidentFormFields({
  formData,
  onFormDataChange,
  errors = {}
}: IncidentFormFieldsProps) {
  const updateFormData = (field: keyof IncidentFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="flex-1 overflow-y-auto px-1 mt-4">
      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Incident Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData('type', value)}
              >
                <SelectTrigger className={`h-10 w-full ${errors.type ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collision">Collision</SelectItem>
                  <SelectItem value="penalty">Penalty</SelectItem>
                  <SelectItem value="dnf">DNF</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="unsafe_pit">Unsafe Pit</SelectItem>
                  <SelectItem value="track_obstruction">Track Obstruction</SelectItem>
                  <SelectItem value="rule_violation">Rule Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.raceCategory}
                onValueChange={(value) => updateFormData('raceCategory', value)}
              >
                <SelectTrigger
                  className={`h-10 w-full ${errors.raceCategory ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F1">F1</SelectItem>
                  <SelectItem value="Rally">Rally</SelectItem>
                  <SelectItem value="MotoGP">MotoGP</SelectItem>
                  <SelectItem value="IndyCar">IndyCar</SelectItem>
                  <SelectItem value="NASCAR">NASCAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="circuit" className="text-sm font-medium">
                Circuit <span className="text-destructive">*</span>
              </Label>
              <Input
                id="circuit"
                className={`h-10 ${errors.circuit ? 'border-destructive' : ''}`}
                placeholder="e.g., Silverstone Circuit"
                value={formData.circuit}
                onChange={(e) => updateFormData('circuit', e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                className={`h-10 ${errors.location ? 'border-destructive' : ''}`}
                placeholder="e.g., Turn 3"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Status and Severity Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-sm font-medium">
                Severity <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value: any) => updateFormData('severity', value)}
              >
                <SelectTrigger
                  className={`h-10 w-full ${errors.severity ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => updateFormData('status', value)}
              >
                <SelectTrigger
                  className={`h-10 w-full ${errors.status ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Incident Details Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="drivers" className="text-sm font-medium">
                Drivers Involved <span className="text-destructive">*</span>
              </Label>
              <Input
                id="drivers"
                className={`h-10 ${errors.drivers ? 'border-destructive' : ''}`}
                placeholder="e.g., Lewis Hamilton, Max Verstappen"
                value={formData.drivers}
                onChange={(e) => updateFormData('drivers', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lap" className="text-sm font-medium">
                Lap Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lap"
                type="number"
                className={`h-10 ${errors.lapNumber ? 'border-destructive' : ''}`}
                placeholder="e.g., 23"
                value={formData.lapNumber}
                onKeyDown={(e) => {
                  if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/[^0-9]/g, '');
                  const numValue = Number(numericValue);

                  if (numericValue === '') {
                    updateFormData('lapNumber', '');
                    return;
                  }

                  if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
                    updateFormData('lapNumber', numericValue);
                  }
                }}
                min={1}
                max={100}
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            className={`min-h-[100px] resize-none ${errors.description ? 'border-destructive' : ''}`}
            placeholder="Additional details about the incident..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            maxLength={255}
          />
          <div className="flex justify-end mt-1">
            <span
              className={`text-xs ${formData.description.length > 255 ? 'text-destructive' : 'text-muted-foreground'}`}
            >
              {formData.description.length}/255 characters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
