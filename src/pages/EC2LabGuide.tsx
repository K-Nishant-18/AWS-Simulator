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

export const EC2LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateEC2Lab(state);
        setValidationMsg(result);
    };
    const steps: Step[] = [
        {
            title: 'Create a Security Group',
            description: 'Create a new security group named "web-sg" that allows HTTP traffic',
            completed: false,
        },
        {
            title: 'Launch an Instance',
            description: 'Launch a t2.micro instance using Amazon Linux 2 AMI',
            completed: false,
        },
        {
            title: 'Attach Security Group',
            description: 'Select your "web-sg" security group during launch',
            completed: false,
        },
        {
            title: 'Verify Running State',
            description: 'Wait for the instance state to change to "running"',
            completed: false,
        },
        {
            title: 'Check Public IP',
            description: 'Locate the Public IP address of your new instance',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Launch Your First EC2 Instance</h2>
                <p className="text-gray-600">
                    Learn how to launch and configure a virtual server in the cloud using Amazon EC2.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand EC2 instances and AMIs</li>
                    <li>Configure Security Groups (firewalls)</li>
                    <li>Launch and terminate instances</li>
                    <li>Identify instance metadata (IPs, state)</li>
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
                    <li>• t2.micro instances are Free Tier eligible</li>
                    <li>• Security Groups act as a virtual firewall</li>
                    <li>• Instances take a few moments to reach "running" state</li>
                    <li>• Always terminate unused instances to save costs</li>
                </ul>
            </div>

            {/* CLI Reference */}
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                <h3 className="font-semibold mb-3">CLI Commands</h3>
                <div className="space-y-2 text-sm font-mono">
                    <div>
                        <div className="text-gray-400"># Create Security Group</div>
                        <div>aws ec2 create-security-group --group-name web-sg --description "Allow HTTP"</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># Launch Instance</div>
                        <div>aws ec2 run-instances --image-id ami-amazon-linux-2 --instance-type t2.micro</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># List Instances</div>
                        <div>aws ec2 describe-instances</div>
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
