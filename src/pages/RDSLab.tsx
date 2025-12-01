import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { RDSConsole } from './RDSConsole';
import { RDSLabGuide } from './RDSLabGuide';
import { RDSHelp } from './RDSHelp';
import { Terminal } from '../components/Terminal';

export const RDSLab: React.FC = () => {
    return (
        <LabLayout
            guide={<RDSLabGuide />}
            console={<RDSConsole />}
            terminal={<Terminal />}
            help={<RDSHelp />}
        />
    );
};
