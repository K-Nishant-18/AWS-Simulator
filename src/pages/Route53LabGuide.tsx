import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    completed: boolean;
}

export const Route53LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        // 1. Check if any hosted zone exists
        const hasZone = state.route53.hostedZones.length > 0;
        if (!hasZone) {
            setValidationMsg({ success: false, message: 'No Hosted Zone found. Create a Hosted Zone for your domain (e.g., myapp.com).' });
            return;
        }

        // 2. Check if any A record exists (besides default NS/SOA)
        const hasARecord = state.route53.hostedZones.some(zone =>
            zone.records.some(r => r.type === 'A')
        );

        if (hasARecord) {
            setValidationMsg({ success: true, message: 'Success! You have configured a custom domain with an A record.' });
        } else {
            setValidationMsg({ success: false, message: 'Hosted Zone exists, but no A record found. Create an A record to point your domain to an IP.' });
        }
    };

    const steps: Step[] = [
        {
            title: 'Create Hosted Zone',
            description: 'Register a domain name (e.g., myapp.com) to manage its DNS records.',
            completed: false,
        },
        {
            title: 'View Default Records',
            description: 'Notice the NS (Name Server) and SOA (Start of Authority) records created automatically.',
            completed: false,
        },
        {
            title: 'Create A Record',
            description: 'Point your domain (e.g., www.myapp.com) to an IP address (e.g., 192.0.2.1).',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Setup Custom Domain</h2>
                <p className="text-gray-600">
                    Learn how to route traffic to your application using Amazon Route 53.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand Hosted Zones</li>
                    <li>Manage DNS Records (A, CNAME)</li>
                    <li>Route traffic to resources</li>
                </ul>
            </div>

            {/* Steps */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Steps</h3>
                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                                {step.completed ? (
                                    <CheckCircle2 size={20} className="text-green-600" />
                                ) : (
                                    <Circle size={20} className="text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">
                                    {index + 1}. {step.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">💡 Tips</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• <strong>A Record</strong>: Points a hostname to an IPv4 address.</li>
                    <li>• <strong>CNAME</strong>: Points a hostname to another hostname.</li>
                    <li>• <strong>TTL (Time To Live)</strong>: How long DNS resolvers cache your record.</li>
                </ul>
            </div>

            {/* Validation */}
            <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Lab Validation</h3>
                    <Button onClick={validateLab} variant="primary" size="sm">
                        Check Progress
                    </Button>
                </div>

                {validationMsg && (
                    <div className={`p-4 rounded-lg flex gap-3 ${validationMsg.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {validationMsg.success ? <Check size={20} className="flex-shrink-0" /> : <AlertCircle size={20} className="flex-shrink-0" />}
                        <p className="text-sm font-medium">{validationMsg.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
