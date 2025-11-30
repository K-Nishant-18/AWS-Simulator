import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    completed: boolean;
}

export const IAMLabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateIAMLab(state);
        setValidationMsg(result);
    };
    const steps: Step[] = [
        {
            title: 'Create an Admin User',
            description: 'Create a new user named "admin-user"',
            completed: false,
        },
        {
            title: 'Attach AdministratorAccess',
            description: 'Attach the "AdministratorAccess" policy to your new user',
            completed: false,
        },
        {
            title: 'Create a Read-Only Group',
            description: 'Create a group named "auditors"',
            completed: false,
        },
        {
            title: 'Verify Permissions',
            description: 'Check that your user has the correct policies attached',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Secure Your Account</h2>
                <p className="text-gray-600">
                    Learn how to manage identities and permissions using AWS Identity and Access Management (IAM).
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand Users, Groups, and Policies</li>
                    <li>Practice the Principle of Least Privilege</li>
                    <li>Manage permissions via Policy attachment</li>
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
                <h3 className="font-semibold text-yellow-900 mb-2">💡 Security Best Practices</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Never use the root account for daily tasks</li>
                    <li>• Grant only the permissions necessary (Least Privilege)</li>
                    <li>• Enable MFA (Multi-Factor Authentication) for all users</li>
                    <li>• Rotate access keys regularly</li>
                </ul>
            </div>

            {/* CLI Reference */}
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                <h3 className="font-semibold mb-3">CLI Commands</h3>
                <div className="space-y-2 text-sm font-mono">
                    <div>
                        <div className="text-gray-400"># Create User</div>
                        <div>aws iam create-user --user-name admin-user</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># Attach Policy</div>
                        <div>aws iam attach-user-policy --user-name admin-user --policy-arn arn:aws:iam::aws:policy/AdministratorAccess</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># Create Group</div>
                        <div>aws iam create-group --group-name auditors</div>
                    </div>
                </div>
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
