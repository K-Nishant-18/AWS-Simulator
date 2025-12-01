import React, { useEffect, useState } from 'react';
import { BookOpen, Lightbulb, X, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface WelcomePopupProps {
    serviceName: string;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ serviceName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const storageKey = `welcome-popup-${serviceName.toLowerCase().replace(/\s+/g, '-')}`;

    useEffect(() => {
        // Check if user has seen this popup before
        const hasSeenPopup = localStorage.getItem(storageKey);
        if (!hasSeenPopup) {
            // Show popup after a short delay for better UX
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [storageKey]);

    const handleClose = () => {
        localStorage.setItem(storageKey, 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" onClick={handleClose} />

            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto transform animate-scale-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>

                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-20">
                            <Sparkles size={120} />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                    <Sparkles size={24} />
                                </div>
                                <h2 className="text-2xl font-bold">Welcome to {serviceName}!</h2>
                            </div>
                            <p className="text-orange-100 text-sm">Let's get you started on the right track</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <p className="text-gray-700 text-center font-medium">
                            For the best learning experience, we recommend:
                        </p>

                        {/* Tips */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex-shrink-0 mt-0.5">
                                    <BookOpen className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">Read the Lab Guide</h3>
                                    <p className="text-sm text-blue-800">
                                        Step-by-step instructions to complete hands-on exercises
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
                                <div className="flex-shrink-0 mt-0.5">
                                    <Lightbulb className="text-amber-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-amber-900 mb-1">Check Help & Tips</h3>
                                    <p className="text-sm text-amber-800">
                                        Best practices, troubleshooting, and useful commands
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <p className="text-xs text-gray-500 text-center mb-4">
                                💡 You can access these resources anytime from the navigation tabs
                            </p>
                            <Button
                                onClick={handleClose}
                                variant="primary"
                                className="w-full"
                                size="lg"
                            >
                                Got it, let's start! 🚀
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </>
    );
};
