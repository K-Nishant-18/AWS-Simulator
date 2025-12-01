import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
}

export const S3Icon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M32 2L6 14V50L32 62L58 50V14L32 2Z" fill="#E7157B" fillOpacity="0.1" />
        <path d="M32 5L10 16V48L32 59L54 48V16L32 5Z" stroke="#DC2626" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 16L10 26M32 16L54 26M32 16V59" stroke="#DC2626" strokeWidth="4" strokeLinejoin="round" />
        <path d="M10 26L32 36L54 26" stroke="#DC2626" strokeWidth="4" strokeLinejoin="round" />
    </svg>
);

export const EC2Icon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="12" width="48" height="40" rx="4" fill="#F97316" fillOpacity="0.1" stroke="#F97316" strokeWidth="4" />
        <path d="M16 24H48" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 36H32" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 48H24" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
        <rect x="40" y="32" width="12" height="12" rx="2" fill="#F97316" />
    </svg>
);

export const IAMIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M32 4L56 16V30C56 45.8 45.8 60.4 32 64C18.2 60.4 8 45.8 8 30V16L32 4Z" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 20V36" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
        <path d="M32 44H32.02" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 30H44" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

export const RDSIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M32 8C45.2548 8 56 13.3726 56 20V44C56 50.6274 45.2548 56 32 56C18.7452 56 8 50.6274 8 44V20C8 13.3726 18.7452 8 32 8Z" fill="#6366F1" fillOpacity="0.1" stroke="#6366F1" strokeWidth="4" />
        <path d="M56 20C56 26.6274 45.2548 32 32 32C18.7452 32 8 26.6274 8 20" stroke="#6366F1" strokeWidth="4" />
        <path d="M56 32C56 38.6274 45.2548 44 32 44C18.7452 44 8 38.6274 8 32" stroke="#6366F1" strokeWidth="4" />
    </svg>
);

export const Route53Icon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="32" cy="32" r="24" fill="#EAB308" fillOpacity="0.1" stroke="#EAB308" strokeWidth="4" />
        <path d="M8 32H56" stroke="#EAB308" strokeWidth="4" />
        <path d="M32 8V56" stroke="#EAB308" strokeWidth="4" />
        <path d="M15 15L49 49" stroke="#EAB308" strokeWidth="4" />
        <path d="M49 15L15 49" stroke="#EAB308" strokeWidth="4" />
        <circle cx="32" cy="32" r="8" fill="#EAB308" />
    </svg>
);

export const ELBIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="4" y="24" width="16" height="16" rx="2" stroke="#3B82F6" strokeWidth="4" fill="#3B82F6" fillOpacity="0.1" />
        <rect x="44" y="8" width="16" height="16" rx="2" stroke="#3B82F6" strokeWidth="4" fill="#3B82F6" fillOpacity="0.1" />
        <rect x="44" y="40" width="16" height="16" rx="2" stroke="#3B82F6" strokeWidth="4" fill="#3B82F6" fillOpacity="0.1" />
        <path d="M20 32H32" stroke="#3B82F6" strokeWidth="4" />
        <path d="M32 16V48" stroke="#3B82F6" strokeWidth="4" />
        <path d="M32 16H44" stroke="#3B82F6" strokeWidth="4" />
        <path d="M32 48H44" stroke="#3B82F6" strokeWidth="4" />
    </svg>
);
