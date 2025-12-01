import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check, BookOpen, Network, Info } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    details: string;
    completed: boolean;
}

export const ELBLabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateELBLab(state);
        setValidationMsg(result);
    };

    const steps: Step[] = [
        {
            title: 'Launch EC2 Instances',
            description: 'Ensure you have at least one running EC2 instance',
            details: `Before creating a load balancer, you need targets. Go to the EC2 Console and launch at least two t2.micro instances. Install a web server (like Apache or Nginx) on them so they can respond to HTTP requests. Ensure they are in the same VPC but preferably in different Availability Zones for high availability.`,
            completed: false,
        },
        {
            title: 'Create Target Group',
            description: 'Create a group for your instances',
            details: `Navigate to "Target Groups" and click "Create target group". Choose "Instances" as the target type. Name it "my-targets". Select HTTP protocol and port 80. Select the VPC where your instances are running. Configure health checks (default path "/" is usually fine). Click "Next" and register your running instances as targets.`,
            completed: false,
        },
        {
            title: 'Create Load Balancer',
            description: 'Launch an Application Load Balancer',
            details: `Go to "Load Balancers" and click "Create Load Balancer". Select "Application Load Balancer". Name it "my-alb". Select "Internet-facing". Choose your VPC and select at least two subnets in different Availability Zones. In "Listeners and routing", choose HTTP port 80 and select the target group you just created ("my-targets"). Review and create.`,
            completed: false,
        },
        {
            title: 'Verify Traffic Distribution',
            description: 'Test your load balancer',
            details: `Once the Load Balancer state is "Active", copy its DNS name. Paste it into a web browser. You should see your web server's response. If you refresh multiple times, you might see the response coming from different instances if you customized their index.html pages to show their hostname/IP.`,
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Network size={32} />
                    <h2 className="text-2xl font-bold">Lab: Scale Your Application with ELB</h2>
                </div>
                <p className="text-purple-100">
                    Learn how to distribute traffic across multiple instances using Elastic Load Balancing.
                    You'll create a target group, launch an Application Load Balancer, and register targets.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Info className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900 text-lg">Learning Objectives</h3>
                </div>
                <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Understand ALBs:</strong> Learn how Application Load Balancers work at Layer 7</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Configure Target Groups:</strong> Group instances to receive traffic</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>High Availability:</strong> Distribute traffic across Availability Zones</span>
                    </li>
                </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
                    <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm">📋</span>
                    Step-by-Step Instructions
                </h3>
                <div className="space-y-3">
                    {steps.map((step, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 transition-colors">
                            <div
                                className="flex gap-3 p-4 cursor-pointer bg-white hover:bg-gray-50"
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {step.completed ? (
                                        <CheckCircle2 size={24} className="text-green-600" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-base">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className="text-gray-400 text-sm">
                                        {expandedStep === index ? '▼' : '▶'}
                                    </span>
                                </div>
                            </div>
                            {expandedStep === index && (
                                <div className="bg-gray-50 p-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-700 leading-relaxed">{step.details}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lab Validation */}
            <div className="border-t-2 border-gray-200 pt-6">
                <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Lab Validation</h3>
                            <p className="text-gray-600 text-sm">Verify that you've completed all requirements correctly</p>
                        </div>
                        <Button onClick={validateLab} variant="primary" size="lg" className="w-full sm:w-auto self-start">
                            <Check size={20} className="mr-2" />
                            Check Progress
                        </Button>
                    </div>

                    {validationMsg && (
                        <div className={`mt-4 p-4 rounded-lg flex gap-3 ${validationMsg.success ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                            {validationMsg.success ? (
                                <CheckCircle2 size={24} className="flex-shrink-0 text-green-600" />
                            ) : (
                                <AlertCircle size={24} className="flex-shrink-0 text-red-600" />
                            )}
                            <div>
                                <p className={`font-semibold ${validationMsg.success ? 'text-green-900' : 'text-red-900'}`}>
                                    {validationMsg.success ? '🎉 Congratulations!' : '⚠️ Not Quite There'}
                                </p>
                                <p className={`text-sm mt-1 ${validationMsg.success ? 'text-green-800' : 'text-red-800'}`}>
                                    {validationMsg.message}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

