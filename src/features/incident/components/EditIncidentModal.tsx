'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select';
import { useState, useEffect } from 'react';
import { Badge } from '~/components/ui/badge';
import { X } from 'lucide-react';
import { RacingIncident } from '~/mocks/fixtures/mockIncidents';

interface EditIncidentModalProps {
  incident: RacingIncident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (incident: RacingIncident) => void;
}

export function EditIncidentModal({
  incident,
  open,
  onOpenChange,
  onSave
}: EditIncidentModalProps) {
  const [formData, setFormData] = useState<RacingIncident | null>(null);
  const [newDriver, setNewDriver] = useState('');
  const [newTeam, setNewTeam] = useState('');

  useEffect(() => {
    if (incident) {
      setFormData({ ...incident });
    }
  }, [incident]);

  if (!incident || !formData) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: keyof RacingIncident, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAddDriver = () => {
    if (newDriver.trim() && formData) {
      setFormData({
        ...formData,
        drivers: [...formData.drivers, newDriver.trim()]
      });
      setNewDriver('');
    }
  };

  const handleRemoveDriver = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        drivers: formData.drivers.filter((_, i) => i !== index)
      });
    }
  };

  const handleAddTeam = () => {
    if (newTeam.trim() && formData) {
      setFormData({
        ...formData,
        teams: [...formData.teams, newTeam.trim()]
      });
      setNewTeam('');
    }
  };

  const handleRemoveTeam = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        teams: formData.teams.filter((_, i) => i !== index)
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Incident - #{incident.id}</DialogTitle>
          <DialogDescription>Modify incident details and update steward notes</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Incident Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
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

              <div>
                <Label htmlFor="category">Race Category</Label>
                <Select
                  value={formData.raceCategory}
                  onValueChange={(value) => handleInputChange('raceCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F1">Formula 1</SelectItem>
                    <SelectItem value="Rally">Rally</SelectItem>
                    <SelectItem value="MotoGP">MotoGP</SelectItem>
                    <SelectItem value="IndyCar">IndyCar</SelectItem>
                    <SelectItem value="NASCAR">NASCAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="severity">Severity</Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => handleInputChange('severity', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Location & Timing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location & Timing</h3>

            <div>
              <Label htmlFor="circuit">Circuit</Label>
              <Input
                id="circuit"
                value={formData.circuit}
                onChange={(e) => handleInputChange('circuit', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lapNumber">Lap Number</Label>
                <Input
                  id="lapNumber"
                  type="number"
                  value={formData.lapNumber}
                  onChange={(e) => handleInputChange('lapNumber', Number.parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="raceTime">Race Time</Label>
                <Input
                  id="raceTime"
                  value={formData.raceTime}
                  onChange={(e) => handleInputChange('raceTime', e.target.value)}
                  placeholder="HH:MM:SS"
                />
              </div>
            </div>
          </div>

          {/* Involved Drivers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Involved Drivers</h3>

            <div className="flex flex-wrap gap-2">
              {formData.drivers.map((driver, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{driver}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDriver(index)}
                    className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add driver name"
                value={newDriver}
                onChange={(e) => setNewDriver(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDriver()}
              />
              <Button type="button" onClick={handleAddDriver} variant="outline">
                Add
              </Button>
            </div>
          </div>

          {/* Involved Teams */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Involved Teams</h3>

            <div className="flex flex-wrap gap-2">
              {formData.teams.map((team, index) => (
                <Badge key={index} variant="outline" className="flex items-center space-x-1">
                  <span>{team}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeam(index)}
                    className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add team name"
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
              />
              <Button type="button" onClick={handleAddTeam} variant="outline">
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Steward Notes */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Steward Notes</h3>
          <Textarea
            value={formData.stewardNotes || ''}
            onChange={(e) => handleInputChange('stewardNotes', e.target.value)}
            rows={4}
            placeholder="Add steward notes and observations..."
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
