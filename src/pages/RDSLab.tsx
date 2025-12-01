import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { RDSConsole } from './RDSConsole';
import { RDSLabGuide } from './RDSLabGuide';
import { RDSHelp } from './RDSHelp';
import { Terminal } from '../components/Terminal';
import { WelcomePopup } from '../components/WelcomePopup';

export const RDSLab: React.FC = () => {
    return (
        <>
            <WelcomePopup serviceName="Amazon RDS" />
            <LabLayout
                guide={<RDSLabGuide />}
                console={<RDSConsole />}
                terminal={<Terminal />}
                help={<RDSHelp />}
            />
        </>
    );
};
