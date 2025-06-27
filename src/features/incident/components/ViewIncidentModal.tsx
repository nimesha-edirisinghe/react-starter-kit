'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  AlertTriangle,
  MapPin,
  Users,
  Flag,
  FileText,
  Calendar,
  Clock,
  Car,
  Trophy,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Share
} from 'lucide-react';
import { RacingIncident } from '~/mocks/fixtures/mockIncidents';

interface ViewIncidentModalProps {
  incident: RacingIncident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewIncidentModal({ incident, open, onOpenChange }: ViewIncidentModalProps) {
  if (!incident) return null;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: XCircle,
          bgColor: 'bg-red-500'
        };
      case 'high':
        return {
          color: 'bg-orange-50 text-orange-700 border-orange-200',
          icon: AlertTriangle,
          bgColor: 'bg-orange-500'
        };
      case 'medium':
        return {
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          icon: AlertCircle,
          bgColor: 'bg-yellow-500'
        };
      case 'low':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
          bgColor: 'bg-green-500'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: AlertCircle,
          bgColor: 'bg-gray-500'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'resolved':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
          bgColor: 'bg-green-500'
        };
      case 'investigating':
        return {
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          icon: AlertCircle,
          bgColor: 'bg-yellow-500'
        };
      case 'pending':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: Clock,
          bgColor: 'bg-red-500'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: AlertCircle,
          bgColor: 'bg-gray-500'
        };
    }
  };

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const severityConfig = getSeverityConfig(incident.severity);
  const statusConfig = getStatusConfig(incident.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] w-full min-w-5xl p-0 overflow-hidden sm:rounded-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-6">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-slate-900">
                    Incident #{incident.id}
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 mt-1">
                    {incident.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} •{' '}
                    {incident.raceCategory} • {incident.circuit}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Incident Type</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {incident.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-l-4 border-l-orange-500`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg`}
                      style={{ backgroundColor: severityConfig.bgColor + '20' }}
                    >
                      <severityConfig.icon
                        className="h-5 w-5"
                        style={{ color: severityConfig.bgColor }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Severity Level</p>
                      <Badge className={`${severityConfig.color} font-semibold`}>
                        {incident.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg`}
                      style={{ backgroundColor: statusConfig.bgColor + '20' }}
                    >
                      <statusConfig.icon
                        className="h-5 w-5"
                        style={{ color: statusConfig.bgColor }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Current Status</p>
                      <Badge className={`${statusConfig.color} font-semibold`}>
                        {incident.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Incident Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Incident Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Description
                    </label>
                    <div className="mt-2 p-4 bg-slate-50 rounded-lg border">
                      <p className="text-slate-800 leading-relaxed">{incident.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Race Category
                      </label>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-sm px-3 py-1">
                          <Trophy className="h-3 w-3 mr-1" />
                          {incident.raceCategory}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Lap Number
                      </label>
                      <p className="text-lg font-bold text-slate-900 mt-2">{incident.lapNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Timing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>Location & Timing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                          Circuit
                        </span>
                      </div>
                      <p className="text-lg font-bold text-green-900">{incident.circuit}</p>
                      <p className="text-sm text-green-700">{incident.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Race Time
                          </span>
                        </div>
                        <p className="text-lg font-mono font-bold text-slate-900">
                          {incident.raceTime}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Timestamp
                          </span>
                        </div>
                        <p className="text-sm text-slate-800">
                          {formatDateTime(incident.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Involved Parties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>Involved Parties</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3 block">
                      Drivers
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {incident.drivers.map((driver, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                        >
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Car className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-purple-900">{driver}</p>
                            <p className="text-sm text-purple-600">Driver #{index + 1}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3 block">
                      Teams
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {incident.teams.map((team, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Steward Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flag className="h-5 w-5 text-orange-600" />
                    <span>Steward Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Flag className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-orange-900">John Smith</p>
                        <p className="text-sm text-orange-600">
                          Race Steward • License #RS2024-001
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2 block">
                      Steward Notes
                    </label>
                    <div className="p-4 bg-slate-50 rounded-lg border min-h-[100px]">
                      {incident.stewardNotes ? (
                        <p className="text-slate-800 leading-relaxed">{incident.stewardNotes}</p>
                      ) : (
                        <p className="text-slate-500 italic">
                          No steward notes available for this incident.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        Response Time
                      </p>
                      <p className="text-lg font-bold text-blue-900">3.2 min</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                        Resolution Time
                      </p>
                      <p className="text-lg font-bold text-green-900">
                        {incident.status === 'resolved' ? '12.5 min' : 'Ongoing'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
