import React from 'react';
import { Route53Dashboard } from './Route53Dashboard';

export const Route53Console: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Amazon Route 53</h1>
                    <p className="text-gray-600 mt-1">Scalable domain name system (DNS) web service</p>
                </div>
            </div>

            {/* Dashboard Content */}
            <Route53Dashboard />
        </div>
    );
};


