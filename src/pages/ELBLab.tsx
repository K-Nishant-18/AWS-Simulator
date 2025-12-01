import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { ELBConsole } from './ELBConsole';
import { ELBLabGuide } from './ELBLabGuide';
import { ELBHelp } from './ELBHelp';
import { Terminal } from '../components/Terminal';
import { WelcomePopup } from '../components/WelcomePopup';

export const ELBLab: React.FC = () => {
    return (
        <>
            <WelcomePopup serviceName="Elastic Load Balancing" />
            <LabLayout
                guide={<ELBLabGuide />}
                console={<ELBConsole />}
                terminal={<Terminal />}
                help={<ELBHelp />}
            />
        </>
    );
};
