import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    title: string;
    content: string;
    cliExample?: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
    title,
    content,
    cliExample,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });
        }
        setIsVisible(true);
    };

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsVisible(false)}
                className="inline-flex items-center gap-1 cursor-help"
            >
                {children}
                <HelpCircle size={16} className="text-gray-400" />
            </div>

            {isVisible && (
                <div
                    className="fixed z-[100] w-80 p-4 bg-gray-900 text-white rounded-lg shadow-xl pointer-events-none"
                    style={{
                        top: `${position.top - 8}px`,
                        left: `${position.left}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    <div className="font-semibold mb-2">{title}</div>
                    <div className="text-sm text-gray-300 mb-2">{content}</div>
                    {cliExample && (
                        <div className="mt-3 p-2 bg-gray-800 rounded text-xs font-mono">
                            {cliExample}
                        </div>
                    )}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
                </div>
            )}
        </>
    );
};
