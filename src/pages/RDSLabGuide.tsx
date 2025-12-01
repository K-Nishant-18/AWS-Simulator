import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Check, Info, Database } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { LabValidator } from '../services/labValidator';
import { Button } from '../components/Button';

interface Step {
    title: string;
    description: string;
    details: string;
    completed: boolean;
}

export const RDSLabGuide: React.FC = () => {
    const state = useSimulationStore();
    const [validationMsg, setValidationMsg] = useState<{ success: boolean; message: string } | null>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const validateLab = () => {
        const result = LabValidator.validateRDSLab(state);
        setValidationMsg(result);
    };

    const steps: Step[] = [
        {
            title: 'Create a Database Instance',
            description: 'Launch a MySQL database instance',
            details: `Navigate to the RDS Console and click "Create database". Choose MySQL as your engine - it's one of the most popular open-source databases. Select the "Free tier" template to stay within free tier limits. Give your database a unique identifier like "myapp-db". RDS handles all the heavy lifting: provisioning hardware, installing the database software, setting up backups, and applying patches. This is much easier than managing a database server yourself!`,
            completed: false,
        },
        {
            title: 'Configure Database Settings',
            description: 'Set master username and password',
            details: `Set the master username (default is "admin") and create a strong password. This is the root account for your database - keep these credentials secure! In production, you'd store them in AWS Secrets Manager. The master user has full privileges to create databases, tables, and other users. For security, you should create additional users with limited privileges for your applications.`,
            completed: false,
        },
        {
            title: 'Choose Instance Class',
            description: 'Select db.t3.micro for free tier eligibility',
            details: `Choose the db.t3.micro instance class - it's free tier eligible and perfect for development and testing. Instance classes determine your database's CPU, memory, and network performance. The "t3" family provides burstable performance, meaning you get baseline performance with the ability to burst higher when needed. For production workloads, you'd choose larger instances like db.m5 (general purpose) or db.r5 (memory optimized).`,
            completed: false,
        },
        {
            title: 'Configure Storage',
            description: 'Set allocated storage to 20 GB',
            details: `Allocate 20 GB of storage (the minimum for RDS). RDS uses EBS (Elastic Block Store) volumes for storage. You can enable storage autoscaling to automatically increase storage when it gets full. For production, you'd also choose the storage type: General Purpose (gp3) for most workloads, or Provisioned IOPS (io1) for high-performance applications requiring consistent low latency.`,
            completed: false,
        },
        {
            title: 'Wait for Database to Become Available',
            description: 'Monitor the database status until it shows "Available"',
            details: `After clicking "Create database", RDS will provision your instance. This typically takes 5-10 minutes. The status will change from "Creating" to "Available". During this time, AWS is launching the EC2 instance, installing MySQL, configuring networking, and setting up automated backups. Once available, you'll see an endpoint (like myapp-db.abc123.us-east-1.rds.amazonaws.com) that your applications use to connect.`,
            completed: false,
        },
        {
            title: 'Note the Database Endpoint',
            description: 'Copy the endpoint URL for connecting to your database',
            details: `Click on your database instance and find the "Endpoint" in the "Connectivity & security" tab. This is the hostname your applications will use to connect. The format is: [db-identifier].[random-string].[region].rds.amazonaws.com. You'll use this endpoint in your application's database connection string along with the port (3306 for MySQL), username, and password. The endpoint remains the same even if AWS replaces the underlying hardware.`,
            completed: false,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Database size={32} />
                    <h2 className="text-2xl font-bold">Lab: Launch a Managed Database with Amazon RDS</h2>
                </div>
                <p className="text-green-100">
                    Learn how to create and configure a managed relational database using Amazon RDS.
                    You'll launch a MySQL database, configure settings, and understand how RDS simplifies database management.
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
                        <span><strong>Launch RDS instances:</strong> Create and configure managed database instances</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Choose database engines:</strong> Understand different database options (MySQL, PostgreSQL, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Configure storage:</strong> Set up appropriate storage for your workload</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">✓</span>
                        <span><strong>Understand endpoints:</strong> Learn how applications connect to RDS databases</span>
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
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-colors">
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
