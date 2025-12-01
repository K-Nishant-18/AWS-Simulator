import React from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="border-b border-gray-200 bg-white">
            <nav className="flex overflow-x-auto no-scrollbar" aria-label="Tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`
                                px-6 py-4 font-medium text-sm whitespace-nowrap
                                border-b-2 transition-all duration-200
                                flex items-center gap-2
                                ${isActive
                                    ? 'border-aws-orange text-aws-orange bg-orange-50/50'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }
                            `}
                        >
                            {Icon && <Icon size={18} className={isActive ? 'text-aws-orange' : 'text-gray-500'} />}
                            {tab.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};
