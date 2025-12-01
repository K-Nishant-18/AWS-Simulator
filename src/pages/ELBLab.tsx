import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { ELBConsole } from './ELBConsole';
import { ELBLabGuide } from './ELBLabGuide';
import { Terminal } from '../components/Terminal';

export const ELBLab: React.FC = () => {
    return (
        <LabLayout
            guide={<ELBLabGuide />}
            console={<ELBConsole />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">ELB Help</h3>
                    <p className="text-sm text-gray-600">
                        Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances.
                    </p>
                    <h4 className="font-semibold text-sm mt-4">Load Balancer Types:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li><strong>Application Load Balancer</strong>: HTTP/HTTPS traffic (Layer 7)</li>
                        <li><strong>Network Load Balancer</strong>: TCP/UDP traffic (Layer 4)</li>
                        <li><strong>Gateway Load Balancer</strong>: Third-party appliances</li>
                    </ul>
                </div>
            }
        />
    );
};
