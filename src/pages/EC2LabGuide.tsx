import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, Check, BookOpen, Lightbulb, Terminal, AlertTriangle, Info, Server } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    details: string;
    completed: boolean;
}

export const EC2LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateEC2Lab(state);
        setValidationMsg(result);
    };

    const steps: Step[] = [
        {
            title: 'Create a Security Group',
            description: 'Create a security group to control network traffic to your instance',
            details: `Navigate to the EC2 Console and click "Security Groups" or use the "Create Security Group" button. Name it "web-sg" and add a description like "Security group for web server". Security groups act as virtual firewalls, controlling inbound and outbound traffic. Think of them as the bouncer at a club - they decide who gets in and who doesn't. For a web server, you'll need to allow HTTP traffic on port 80.`,
            completed: false,
        },
        {
            title: 'Add HTTP Inbound Rule',
            description: 'Allow HTTP traffic (port 80) from anywhere (0.0.0.0/0)',
            details: `In your security group, add an inbound rule with: Type=HTTP, Protocol=TCP, Port=80, Source=0.0.0.0/0 (anywhere). This allows anyone on the internet to access your web server. In production, you'd typically restrict this to specific IP ranges or use a load balancer. The 0.0.0.0/0 notation means "from any IP address" - it's CIDR notation for the entire internet.`,
            completed: false,
        },
        {
            title: 'Launch an EC2 Instance',
            description: 'Launch a t2.micro instance using Amazon Linux 2 AMI',
            details: `Click "Launch Instance" and select the Amazon Linux 2 AMI (Amazon Machine Image). Choose t2.micro as the instance type - it's free tier eligible and perfect for testing. An AMI is like a template for your server, containing the operating system and pre-installed software. Amazon Linux 2 is AWS's optimized Linux distribution, similar to CentOS/RHEL.`,
            completed: false,
        },
        {
            title: 'Attach Security Group',
            description: 'Select your "web-sg" security group during instance launch',
            details: `In the instance launch wizard, scroll to the "Network settings" section and select your "web-sg" security group. Remove any default security groups if present. This associates your firewall rules with the instance. Without the correct security group, your instance won't be accessible even if it's running. You can change security groups later, but it's best to set them correctly from the start.`,
            completed: false,
        },
        {
            title: 'Verify Running State',
            description: 'Wait for the instance to reach "running" state',
            details: `After launching, your instance will show "pending" status while AWS provisions the virtual machine. This typically takes 30-60 seconds. Once it changes to "running", your instance is live and ready to use. The instance is now consuming resources and will incur charges (though t2.micro is free tier eligible for 750 hours/month). You can see the status in the "Instance State" column.`,
            completed: false,
        },
        {
            title: 'Note the Public IP',
            description: 'Find and record the public IP address of your instance',
            details: `In the instance details, locate the "Public IPv4 address" field. This is the IP address you'd use to connect to your instance from the internet. If you were running a web server, you could access it at http://[public-ip]. The IP address is dynamically assigned and will change if you stop and start the instance. For a permanent IP, you'd use an Elastic IP address.`,
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Server size={32} />
                    <h2 className="text-2xl font-bold">Lab: Launch Your First EC2 Instance</h2>
                </div>
                <p className="text-orange-100">
                    Learn how to launch and configure an Amazon EC2 (Elastic Compute Cloud) instance. You'll create security groups,
                    launch a virtual server, and understand the fundamentals of cloud computing infrastructure.
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
                        <span><strong>Understand EC2 instances:</strong> Learn what virtual servers are and how they work in the cloud</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Configure security groups:</strong> Master network security and firewall rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Select instance types:</strong> Choose appropriate compute resources for your workload</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Manage instance lifecycle:</strong> Launch, monitor, and understand instance states</span>
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
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors">
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
