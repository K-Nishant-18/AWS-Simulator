import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    completed: boolean;
}

export const RDSLabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        // Simple validation for MVP
        const hasInstance = state.rds.instances.length > 0;
        if (hasInstance) {
            setValidationMsg({ success: true, message: 'Success! You have launched an RDS database instance.' });
        } else {
            setValidationMsg({ success: false, message: 'No RDS instances found. Please create a database.' });
        }
    };

    const steps: Step[] = [
        {
            title: 'Launch a Database',
            description: 'Click "Create database" to start the wizard',
            completed: false,
        },
        {
            title: 'Choose Engine',
            description: 'Select MySQL or PostgreSQL as your database engine',
            completed: false,
        },
        {
            title: 'Configure Settings',
            description: 'Give your instance a unique identifier and master username',
            completed: false,
        },
        {
            title: 'Create',
            description: 'Launch the instance and wait for it to become "Available"',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Launch a Production Database</h2>
                <p className="text-gray-600">
                    Learn how to provision a managed relational database using Amazon RDS.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand Managed Databases vs. Self-hosted</li>
                    <li>Select appropriate Database Engines</li>
                    <li>Configure Master Credentials</li>
                    <li>Understand Connection Endpoints</li>
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
                    <li>• RDS handles backups, patching, and scaling for you</li>
                    <li>• Never store your master password in plain text code</li>
                    <li>• The "Endpoint" is the URL your app uses to connect</li>
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
