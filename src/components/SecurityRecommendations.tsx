import React from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';
import type { SecurityRecommendation } from '../types/aws';

interface SecurityRecommendationsProps {
    recommendations: SecurityRecommendation[];
    onActionClick?: (recommendation: SecurityRecommendation) => void;
}

export const SecurityRecommendations: React.FC<SecurityRecommendationsProps> = ({
    recommendations
}) => {
    if (recommendations.length === 0) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Shield className="mx-auto text-green-600 mb-3" size={48} />
                <h3 className="text-lg font-semibold text-green-900 mb-2">All Clear!</h3>
                <p className="text-green-700">No security recommendations at this time. Great job!</p>
            </div>
        );
    }

    const getIcon = (severity: string) => {
        switch (severity) {
            case 'critical':
                return <AlertTriangle className="text-red-600" size={20} />;
            case 'warning':
                return <AlertTriangle className="text-yellow-600" size={20} />;
            default:
                return <Info className="text-blue-600" size={20} />;
        }
    };

    const getStyles = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getTextStyles = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'text-red-900';
            case 'warning':
                return 'text-yellow-900';
            default:
                return 'text-blue-900';
        }
    };

    return (
        <div className="space-y-3">
            {recommendations.map((rec) => (
                <div
                    key={rec.id}
                    className={`border rounded-lg p-4 ${getStyles(rec.severity)}`}
                >
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon(rec.severity)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold mb-1 ${getTextStyles(rec.severity)}`}>
                                {rec.title}
                            </h4>
                            <p className={`text-sm mb-2 ${getTextStyles(rec.severity)} opacity-90`}>
                                {rec.description}
                            </p>
                            <p className={`text-sm ${getTextStyles(rec.severity)} opacity-75`}>
                                <strong>Action:</strong> {rec.action}
                            </p>
                            {rec.affectedResource && (
                                <p className={`text-xs mt-2 ${getTextStyles(rec.severity)} opacity-60`}>
                                    Affected: {rec.affectedResource}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
