import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { Route53Console } from './Route53Console';
import { Route53LabGuide } from './Route53LabGuide';
import { Route53Help } from './Route53Help';
import { Terminal } from '../components/Terminal';
import { WelcomePopup } from '../components/WelcomePopup';

export const Route53Lab: React.FC = () => {
    return (
        <>
            <WelcomePopup serviceName="Amazon Route 53" />
            <LabLayout
                guide={<Route53LabGuide />}
                console={<Route53Console />}
                terminal={<Terminal />}
                help={<Route53Help />}
            />
        </>
    );
};
