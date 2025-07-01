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
}

export default function IncidentFormFields({
  formData,
  onFormDataChange
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
                Incident Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData('type', value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Collision">Collision</SelectItem>
                  <SelectItem value="Penalty">Penalty</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Track Obstruction">Track Obstruction</SelectItem>
                  <SelectItem value="Rule Violation">Rule Violation</SelectItem>
                  <SelectItem value="Weather">Weather</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select
                value={formData.raceCategory}
                onValueChange={(value) => updateFormData('raceCategory', value)}
              >
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F1">Formula 1</SelectItem>
                  <SelectItem value="F2">Formula 2</SelectItem>
                  <SelectItem value="MotoGP">MotoGP</SelectItem>
                  <SelectItem value="IndyCar">IndyCar</SelectItem>
                  <SelectItem value="Rally">Rally</SelectItem>
                  <SelectItem value="NASCAR">NASCAR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="location"
              className="h-10"
              placeholder="e.g., Monaco Grand Prix - Turn 3"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
          </div>
        </div>

        {/* Status and Severity Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-sm font-medium">
                Severity
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value: any) => updateFormData('severity', value)}
              >
                <SelectTrigger className="h-10 w-full">
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
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => updateFormData('status', value)}
              >
                <SelectTrigger className="h-10 w-full">
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
                Drivers Involved
              </Label>
              <Input
                id="drivers"
                className="h-10"
                placeholder="e.g., Lewis Hamilton, Max Verstappen"
                value={formData.drivers}
                onChange={(e) => updateFormData('drivers', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lap" className="text-sm font-medium">
                Lap Number
              </Label>
              <Input
                id="lap"
                type="number"
                className="h-10"
                placeholder="e.g., 23"
                value={formData.lapNumber}
                onChange={(e) => updateFormData('lapNumber', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Textarea
            id="description"
            className="min-h-[100px] resize-none"
            placeholder="Additional details about the incident..."
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
