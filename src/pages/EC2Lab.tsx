import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { EC2Console } from './EC2Console';
import { EC2LabGuide } from './EC2LabGuide';
import { EC2Help } from './EC2Help';
import { Terminal } from '../components/Terminal';

export const EC2Lab: React.FC = () => {
    return (
        <LabLayout
            guide={<EC2LabGuide />}
            console={<EC2Console />}
            terminal={<Terminal />}
            help={<EC2Help />}
        />
    );
};
