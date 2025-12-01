import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    completed: boolean;
}

export const ELBLabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        // 1. Check if any Load Balancer exists
        const hasLB = state.elb.loadBalancers.length > 0;
        if (!hasLB) {
            setValidationMsg({ success: false, message: 'No Load Balancer found. Create an Application Load Balancer.' });
            return;
        }

        // 2. Check if any Target Group exists
        const hasTG = state.elb.targetGroups.length > 0;
        if (!hasTG) {
            setValidationMsg({ success: false, message: 'No Target Group found. You need a Target Group to route traffic to.' });
            return;
        }

        // 3. Check if targets are registered
        const hasTargets = state.elb.targetGroups.some(tg => tg.targets.length > 0);
        if (!hasTargets) {
            setValidationMsg({ success: false, message: 'Load Balancer created, but no instances registered. Add your EC2 instances to the Target Group.' });
            return;
        }

        setValidationMsg({ success: true, message: 'Success! You have set up a Load Balancer with registered targets.' });
    };

    const steps: Step[] = [
        {
            title: 'Launch EC2 Instances',
            description: 'Ensure you have at least one running EC2 instance to serve as a target.',
            completed: false,
        },
        {
            title: 'Create Load Balancer',
            description: 'Start the "Create Application Load Balancer" wizard.',
            completed: false,
        },
        {
            title: 'Configure Target Group',
            description: 'Create a new Target Group for HTTP traffic on port 80.',
            completed: false,
        },
        {
            title: 'Register Targets',
            description: 'Select your EC2 instances to receive traffic from the Load Balancer.',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Scale Your Application</h2>
                <p className="text-gray-600">
                    Learn how to distribute traffic across multiple instances using Elastic Load Balancing.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand Application Load Balancers (ALB)</li>
                    <li>Configure Target Groups</li>
                    <li>Register EC2 Instances as Targets</li>
                    <li>Achieve High Availability</li>
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
                    <li>• <strong>Target Group</strong>: A logical group of targets (EC2 instances) that receive traffic.</li>
                    <li>• <strong>Health Checks</strong>: The LB automatically checks if targets are healthy before sending traffic.</li>
                    <li>• <strong>DNS Name</strong>: You point your domain (Route 53) to this LB DNS name.</li>
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
