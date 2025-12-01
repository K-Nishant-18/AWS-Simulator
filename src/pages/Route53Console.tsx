import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Route53LabGuide } from './Route53LabGuide';
import { Route53Help } from './Route53Help';
import { Route53Dashboard } from './Route53Dashboard';

export const Route53Console: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'lab' | 'help'>('dashboard');

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-500 p-2 rounded-lg">
                        <Globe className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Route 53</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('lab')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'lab' ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Lab Guide
                    </button>
                    <button
                        onClick={() => setActiveTab('help')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'help' ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Help & Tips
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    {activeTab === 'dashboard' && (
                        <Route53Dashboard />
                    )}

                    {activeTab === 'lab' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <Route53LabGuide />
                        </div>
                    )}

                    {activeTab === 'help' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <Route53Help />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

