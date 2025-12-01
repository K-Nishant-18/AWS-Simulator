import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { EC2Console } from './EC2Console';
import { EC2LabGuide } from './EC2LabGuide';
import { EC2Help } from './EC2Help';
import { Terminal } from '../components/Terminal';
import { WelcomePopup } from '../components/WelcomePopup';

export const EC2Lab: React.FC = () => {
    return (
        <>
            <WelcomePopup serviceName="Amazon EC2" />
            <LabLayout
                guide={<EC2LabGuide />}
                console={<EC2Console />}
                terminal={<Terminal />}
                help={<EC2Help />}
            />
        </>
    );
};
