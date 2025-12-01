import React from 'react';
import { Link } from 'react-router-dom';

interface NavCardProps {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode;
    color: 'green' | 'orange' | 'blue' | 'purple' | 'red';
}

export const NavCard: React.FC<NavCardProps> = ({ title, description, link, icon, color }) => {
    const colorStyles: Record<string, { bg: string, border: string, text: string, iconBg: string }> = {
        green: {
            bg: 'hover:bg-green-50',
            border: 'hover:border-green-300',
            text: 'group-hover:text-green-700',
            iconBg: 'bg-green-100 text-green-600'
        },
        orange: {
            bg: 'hover:bg-orange-50',
            border: 'hover:border-orange-300',
            text: 'group-hover:text-orange-700',
            iconBg: 'bg-orange-100 text-orange-600'
        },
        blue: {
            bg: 'hover:bg-blue-50',
            border: 'hover:border-blue-300',
            text: 'group-hover:text-blue-700',
            iconBg: 'bg-blue-100 text-blue-600'
        },
        purple: {
            bg: 'hover:bg-purple-50',
            border: 'hover:border-purple-300',
            text: 'group-hover:text-purple-700',
            iconBg: 'bg-purple-100 text-purple-600'
        },
        red: {
            bg: 'hover:bg-red-50',
            border: 'hover:border-red-300',
            text: 'group-hover:text-red-700',
            iconBg: 'bg-red-100 text-red-600'
        },
    };

    const style = colorStyles[color];

    return (
        <Link
            to={link}
            className={`group block bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${style.border} ${style.bg}`}
        >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${style.iconBg}`}>
                {icon}
            </div>
            <h3 className={`text-xl font-bold text-gray-900 mb-3 transition-colors ${style.text}`}>{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </Link>
    );
};
