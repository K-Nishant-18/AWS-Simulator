import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavCardProps {
    title: string;
    description: string;
    link: string;
    icon: LucideIcon;
    color: string;
}

export const NavCard: React.FC<NavCardProps> = ({ title, description, link, icon: Icon, color }) => {
    const colorClasses: Record<string, string> = {
        green: 'bg-green-100 text-green-600',
        orange: 'bg-orange-100 text-orange-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
        red: 'bg-red-100 text-red-600',
    };

    const colorClass = colorClasses[color] || 'bg-gray-100 text-gray-600';

    return (
        <Link
            to={link}
            className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-aws-orange"
        >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClass}`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </Link>
    );
};
