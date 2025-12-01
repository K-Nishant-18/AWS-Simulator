import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { Route53Console } from './Route53Console';
import { Route53LabGuide } from './Route53LabGuide';
import { Terminal } from '../components/Terminal';

export const Route53Lab: React.FC = () => {
    return (
        <LabLayout
            guide={<Route53LabGuide />}
            console={<Route53Console />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">Route 53 Help</h3>
                    <p className="text-sm text-gray-600">
                        Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service.
                    </p>
                    <h4 className="font-semibold text-sm mt-4">Record Types:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li><strong>A</strong>: IPv4 Address</li>
                        <li><strong>AAAA</strong>: IPv6 Address</li>
                        <li><strong>CNAME</strong>: Canonical Name</li>
                        <li><strong>MX</strong>: Mail Exchange</li>
                    </ul>
                </div>
            }
        />
    );
};
