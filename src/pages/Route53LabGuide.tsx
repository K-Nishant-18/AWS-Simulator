import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Check, Globe, Info } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    details: string;
    completed: boolean;
}

export const Route53LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateRoute53Lab(state);
        setValidationMsg(result);
    };

    const steps: Step[] = [
        {
            title: 'Create a Hosted Zone',
            description: 'Register a domain name to manage its DNS records',
            details: `Navigate to the Route 53 Console and click "Create hosted zone". Enter a domain name (e.g., myapp.com). You can choose "Public hosted zone" for internet-facing domains or "Private hosted zone" for internal VPC domains. For this lab, create a public hosted zone. This container will hold all your DNS records for that domain.`,
            completed: false,
        },
        {
            title: 'View Default Records',
            description: 'Inspect the automatically created NS and SOA records',
            details: `Once your hosted zone is created, you'll see two records automatically: NS (Name Server) and SOA (Start of Authority). The NS records list the AWS name servers that answer DNS queries for your domain. The SOA record provides information about the domain and the corresponding Amazon Route 53 hosted zone. Do not delete these!`,
            completed: false,
        },
        {
            title: 'Create an A Record',
            description: 'Point your domain to an IP address',
            details: `Click "Create record". Leave the subdomain empty (or enter 'www'). Choose "A - Routes traffic to an IPv4 address and some AWS resources" as the record type. In the "Value" field, enter a sample IP address like "192.0.2.1" (this is a test IP). Leave TTL at default (300). Click "Create records". This tells DNS resolvers that myapp.com is located at 192.0.2.1.`,
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Globe size={32} />
                    <h2 className="text-2xl font-bold">Lab: Setup Custom Domain Routing</h2>
                </div>
                <p className="text-orange-100">
                    Learn how to route traffic to your application using Amazon Route 53.
                    You'll create a hosted zone and configure DNS records to point a domain to an IP address.
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
                        <span><strong>Understand Hosted Zones:</strong> Learn how Route 53 organizes DNS records</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Manage DNS Records:</strong> Create A records to route traffic</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>DNS Concepts:</strong> Understand NS, SOA, and TTL values</span>
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

