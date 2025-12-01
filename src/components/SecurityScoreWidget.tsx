import React from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';

interface SecurityScoreWidgetProps {
    score: number;
}

export const SecurityScoreWidget: React.FC<SecurityScoreWidgetProps> = ({ score }) => {
    const getScoreColor = (score: number) => {
        if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-200' };
        if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600', ring: 'ring-yellow-200' };
        return { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-200' };
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <CheckCircle2 className="text-green-600" size={24} />;
        if (score >= 60) return <Shield className="text-yellow-600" size={24} />;
        return <AlertCircle className="text-red-600" size={24} />;
    };

    const colors = getScoreColor(score);
    const circumference = 2 * Math.PI * 54; // radius = 54
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Security Score</h3>
                {getScoreIcon(score)}
            </div>

            <div className="flex items-center justify-center mb-4">
                <div className="relative w-40 h-40">
                    {/* Background circle */}
                    <svg className="transform -rotate-90 w-40 h-40">
                        <circle
                            cx="80"
                            cy="80"
                            r="54"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-gray-200"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="54"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className={colors.bg}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                        />
                    </svg>
                    {/* Score text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
                        <span className="text-sm text-gray-500">out of 100</span>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className={`text-lg font-semibold ${colors.text} mb-1`}>
                    {getScoreLabel(score)}
                </p>
                <p className="text-sm text-gray-600">
                    {score >= 80 && "Your IAM security is well-configured"}
                    {score >= 60 && score < 80 && "Some improvements recommended"}
                    {score < 60 && "Action required to improve security"}
                </p>
            </div>

            {/* Score breakdown */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">MFA Coverage</span>
                    <span className="font-medium">40%</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Policy Assignment</span>
                    <span className="font-medium">30%</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Access Key Health</span>
                    <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">User Activity</span>
                    <span className="font-medium">10%</span>
                </div>
            </div>
        </div>
    );
};
