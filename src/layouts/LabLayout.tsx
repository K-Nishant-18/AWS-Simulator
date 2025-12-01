import React, { useState } from 'react';
import { BookOpen, Code, HelpCircle, Network } from 'lucide-react';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

interface LabLayoutProps {
    guide: React.ReactNode;
    console: React.ReactNode;
    terminal: React.ReactNode;
    help?: React.ReactNode;
}

export const LabLayout: React.FC<LabLayoutProps> = ({
    guide,
    console: consoleContent,
    terminal,
    help,
}) => {
    const [activeTab, setActiveTab] = useState<'console' | 'terminal' | 'diagram'>('console');

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-aws-blue text-white px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src="/aws-logo.png" alt="AWS Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">AWS Real-Life Simulator</h1>
                            <p className="text-sm text-gray-300">Learn AWS hands-on, risk-free</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Guide Panel */}
                <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center gap-2 text-aws-blue">
                            <BookOpen size={20} />
                            <h2 className="font-semibold">Lab Guide</h2>
                        </div>
                    </div>
                    <div className="p-4">{guide}</div>
                </aside>

                {/* Center: Console/Terminal */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Tabs */}
                    <div className="bg-white border-b border-gray-200 flex">
                        <button
                            onClick={() => setActiveTab('console')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'console'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Code size={18} />
                            Console
                        </button>
                        <button
                            onClick={() => setActiveTab('terminal')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'terminal'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Code size={18} />
                            Terminal
                        </button>
                        <button
                            onClick={() => setActiveTab('diagram')}
                            className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'diagram'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Network size={18} />
                            Diagram
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'console' && consoleContent}
                        {activeTab === 'terminal' && terminal}
                        {activeTab === 'diagram' && <ArchitectureDiagram />}
                    </div>
                </main>

                {/* Right: Help Panel */}
                {help && (
                    <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-2 text-aws-blue">
                                <HelpCircle size={20} />
                                <h2 className="font-semibold">Help & Tips</h2>
                            </div>
                        </div>
                        <div className="p-4">{help}</div>
                    </aside>
                )}
            </div>
        </div>
    );
};
