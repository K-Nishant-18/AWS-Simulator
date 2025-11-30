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

export const S3LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateS3Lab(state);
        setValidationMsg(result);
    };
    const steps: Step[] = [
        {
            title: 'Create an S3 Bucket',
            description: 'Click "Create Bucket" and name it something unique (e.g., my-website-2024-yourname)',
            completed: false,
        },
        {
            title: 'Upload index.html',
            description: 'Upload an HTML file with key "index.html" containing your website content',
            completed: false,
        },
        {
            title: 'Enable Public Access',
            description: 'In bucket settings, enable public access to make your content accessible',
            completed: false,
        },
        {
            title: 'Enable Static Website Hosting',
            description: 'Turn on static website hosting to serve your HTML files',
            completed: false,
        },
        {
            title: 'Access Your Website',
            description: 'Copy the website endpoint URL and verify your site is live!',
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Lab: Host a Static Website on S3</h2>
                <p className="text-gray-600">
                    Learn how to use Amazon S3 to host a static website. You'll create a bucket, upload HTML content,
                    configure permissions, and enable website hosting.
                </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Learning Objectives</h3>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                    <li>Understand S3 buckets and objects</li>
                    <li>Configure bucket permissions</li>
                    <li>Enable static website hosting</li>
                    <li>Upload and manage objects</li>
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
                    <li>• Bucket names must be globally unique across all AWS accounts</li>
                    <li>• Use lowercase letters, numbers, and hyphens only</li>
                    <li>• Public access is required for static website hosting</li>
                    <li>• The index document must be named "index.html"</li>
                </ul>
            </div>

            {/* CLI Reference */}
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                <h3 className="font-semibold mb-3">CLI Commands</h3>
                <div className="space-y-2 text-sm font-mono">
                    <div>
                        <div className="text-gray-400"># Create bucket</div>
                        <div>aws s3 mb s3://my-website-bucket</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># Upload file</div>
                        <div>aws s3 cp index.html s3://my-website-bucket/index.html</div>
                    </div>
                    <div>
                        <div className="text-gray-400"># List buckets</div>
                        <div>aws s3 ls</div>
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
