import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { IAMConsole } from './IAMConsole';
import { IAMLabGuide } from './IAMLabGuide';
import { IAMHelp } from './IAMHelp';
import { Terminal } from '../components/Terminal';

export const IAMLab: React.FC = () => {
    return (
        <LabLayout
            guide={<IAMLabGuide />}
            console={<IAMConsole />}
            terminal={<Terminal />}
            help={<IAMHelp />}
        />
    );
};
