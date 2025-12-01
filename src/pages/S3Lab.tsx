import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { S3Console } from './S3Console';
import { S3LabGuide } from './S3LabGuide';
import { S3Help } from './S3Help';
import { Terminal } from '../components/Terminal';

export const S3Lab: React.FC = () => {
    return (
        <LabLayout
            guide={<S3LabGuide />}
            console={<S3Console />}
            terminal={<Terminal />}
            help={<S3Help />}
        />
    );
};
