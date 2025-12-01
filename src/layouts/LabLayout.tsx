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
    const [activeTab, setActiveTab] = useState<'guide' | 'console' | 'terminal' | 'diagram' | 'help'>('console');

    return (
        <div className="h-screen h-[100dvh] flex flex-col bg-gray-50 w-full">
            {/* Header */}
            <header className="bg-aws-blue text-white px-4 md:px-6 py-3 md:py-4 shadow-lg flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                            <img src="/aws-logo.png" alt="AWS Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold leading-tight">AWS Real-Life Simulator</h1>
                            <p className="text-xs md:text-sm text-gray-300 hidden md:block">Learn AWS hands-on, risk-free</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Guide Panel (Desktop) */}
                <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0">
                        <div className="flex items-center gap-2 text-aws-blue">
                            <BookOpen size={20} />
                            <h2 className="font-semibold">Lab Guide</h2>
                        </div>
                    </div>
                    <div className="p-4">{guide}</div>
                </aside>

                {/* Center: Console/Terminal */}
                <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                    {/* Tabs */}
                    <div className="bg-white border-b border-gray-200 flex overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('guide')}
                            className={`lg:hidden px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'guide'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <BookOpen size={18} />
                            Guide
                        </button>
                        <button
                            onClick={() => setActiveTab('console')}
                            className={`px-4 md:px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'console'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Code size={18} />
                            Console
                        </button>
                        <button
                            onClick={() => setActiveTab('terminal')}
                            className={`px-4 md:px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'terminal'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Code size={18} />
                            Terminal
                        </button>
                        <button
                            onClick={() => setActiveTab('diagram')}
                            className={`px-4 md:px-6 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'diagram'
                                ? 'border-aws-orange text-aws-orange'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Network size={18} />
                            Diagram
                        </button>
                        {help && (
                            <button
                                onClick={() => setActiveTab('help')}
                                className={`lg:hidden px-4 py-3 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'help'
                                    ? 'border-aws-orange text-aws-orange'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <HelpCircle size={18} />
                                Help
                            </button>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                        {activeTab === 'guide' && <div className="lg:hidden">{guide}</div>}
                        {activeTab === 'console' && consoleContent}
                        {activeTab === 'terminal' && terminal}
                        {activeTab === 'diagram' && <ArchitectureDiagram />}
                        {activeTab === 'help' && <div className="lg:hidden">{help}</div>}
                    </div>
                </main>

                {/* Right: Help Panel (Desktop) */}
                {help && (
                    <aside className="hidden lg:block w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0">
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
