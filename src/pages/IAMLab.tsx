import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { IAMConsole } from './IAMConsole';
import { IAMLabGuide } from './IAMLabGuide';
import { IAMHelp } from './IAMHelp';
import { Terminal } from '../components/Terminal';
import { WelcomePopup } from '../components/WelcomePopup';

export const IAMLab: React.FC = () => {
    return (
        <>
            <WelcomePopup serviceName="Identity and Access Management (IAM)" />
            <LabLayout
                guide={<IAMLabGuide />}
                console={<IAMConsole />}
                terminal={<Terminal />}
                help={<IAMHelp />}
            />
        </>
    );
};
