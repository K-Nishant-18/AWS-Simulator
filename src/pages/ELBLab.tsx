import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { ELBConsole } from './ELBConsole';
import { ELBLabGuide } from './ELBLabGuide';
import { ELBHelp } from './ELBHelp';
import { Terminal } from '../components/Terminal';

export const ELBLab: React.FC = () => {
    return (
        <LabLayout
            guide={<ELBLabGuide />}
            console={<ELBConsole />}
            terminal={<Terminal />}
            help={<ELBHelp />}
        />
    );
};
