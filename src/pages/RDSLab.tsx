import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { RDSConsole } from './RDSConsole';
import { RDSLabGuide } from './RDSLabGuide';
import { Terminal } from '../components/Terminal';

export const RDSLab: React.FC = () => {
    return (
        <LabLayout
            guide={<RDSLabGuide />}
            console={<RDSConsole />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">RDS Help</h3>
                    <p className="text-sm text-gray-600">
                        Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud.
                    </p>
                    <h4 className="font-semibold text-sm mt-4">Common Engines:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>MySQL</li>
                        <li>PostgreSQL</li>
                        <li>MariaDB</li>
                        <li>Oracle</li>
                        <li>SQL Server</li>
                    </ul>
                </div>
            }
        />
    );
};
