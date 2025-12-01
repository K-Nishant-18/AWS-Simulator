import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Check, Info, BookOpen } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    details: string;
    completed: boolean;
}

export const S3LabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateS3Lab(state);
        setValidationMsg(result);
    };

    const steps: Step[] = [
        {
            title: 'Create an S3 Bucket',
            description: 'Create a new S3 bucket with a globally unique name',
            details: `Navigate to the S3 Console and click "Create Bucket". Choose a unique name using lowercase letters, numbers, and hyphens (e.g., my-website-2024-yourname). Select the US East (N. Virginia) region. S3 bucket names must be globally unique across all AWS accounts worldwide, so if your chosen name is taken, try adding your initials or a random number.`,
            completed: false,
        },
        {
            title: 'Upload index.html File',
            description: 'Upload an HTML file to serve as your website homepage',
            details: `Click on your bucket name to open it, then click "Upload". Create or select an HTML file named "index.html" containing your website content. This file will be the entry point for your static website. Make sure the file key is exactly "index.html" (case-sensitive). You can include basic HTML with headings, paragraphs, images, and CSS styling.`,
            completed: false,
        },
        {
            title: 'Enable Public Access',
            description: 'Configure bucket permissions to allow public access',
            details: `In your bucket's settings, find the "Permissions" tab and click "Edit" under "Block public access". Uncheck "Block all public access" and save changes. This allows anyone on the internet to access your website files. In production environments, you would typically use CloudFront and more granular permissions, but for static website hosting, public access is required.`,
            completed: false,
        },
        {
            title: 'Enable Static Website Hosting',
            description: 'Turn on the static website hosting feature',
            details: `Go to the "Properties" tab of your bucket and scroll down to "Static website hosting". Click "Edit" and select "Enable". Set the index document to "index.html". This tells S3 to serve your index.html file when someone visits your bucket's website endpoint. S3 will provide you with a unique endpoint URL that you can use to access your website.`,
            completed: false,
        },
        {
            title: 'Access Your Website',
            description: 'Visit your website using the S3 endpoint URL',
            details: `Copy the website endpoint URL from the "Static website hosting" section (it will look like: http://your-bucket-name.s3-website-us-east-1.amazonaws.com). Open this URL in a new browser tab to view your live website! You can share this URL with anyone, and they'll be able to access your site. Remember that changes to your HTML files will be reflected immediately.`,
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <BookOpen size={32} />
                    <h2 className="text-2xl font-bold">Lab: Host a Static Website on Amazon S3</h2>
                </div>
                <p className="text-blue-100">
                    Learn how to use Amazon S3 to host a static website. You'll create a bucket, upload HTML content,
                    configure permissions, and enable website hosting - just like real-world web developers do!
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
                        <span><strong>Understand S3 buckets and objects:</strong> Learn the fundamental storage concepts in AWS S3</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Configure bucket permissions:</strong> Master public access settings and security best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Enable static website hosting:</strong> Transform an S3 bucket into a web server</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Upload and manage objects:</strong> Work with files in S3 using the console</span>
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
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
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
                            <p className="text-gray-600 text-sm">Click the button below to check if you've completed all requirements</p>
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
