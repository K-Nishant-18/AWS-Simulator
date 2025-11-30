import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { S3Console } from './S3Console';
import { S3LabGuide } from './S3LabGuide';
import { Terminal } from '../components/Terminal';

export const S3Lab: React.FC = () => {
    return (
        <LabLayout
            guide={<S3LabGuide />}
            console={<S3Console />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What is Amazon S3?</h3>
                        <p className="text-sm text-gray-600">
                            Amazon Simple Storage Service (S3) is object storage built to store and retrieve any amount of data
                            from anywhere. It's commonly used for backup, archiving, and hosting static websites.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Concepts</h3>
                        <dl className="text-sm space-y-2">
                            <div>
                                <dt className="font-medium text-gray-900">Bucket</dt>
                                <dd className="text-gray-600">A container for objects. Bucket names must be globally unique.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">Object</dt>
                                <dd className="text-gray-600">A file and its metadata stored in a bucket.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">Key</dt>
                                <dd className="text-gray-600">The unique identifier (name/path) for an object within a bucket.</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-semibold text-green-900 text-sm mb-1">✓ Best Practice</h4>
                        <p className="text-xs text-green-800">
                            Always keep buckets private by default. Only enable public access when absolutely necessary,
                            such as for static website hosting.
                        </p>
                    </div>
                </div>
            }
        />
    );
};
