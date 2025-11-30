import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { IAMConsole } from './IAMConsole';
import { IAMLabGuide } from './IAMLabGuide';
import { Terminal } from '../components/Terminal';

export const IAMLab: React.FC = () => {
    return (
        <LabLayout
            guide={<IAMLabGuide />}
            console={<IAMConsole />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What is IAM?</h3>
                        <p className="text-sm text-gray-600">
                            AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for your users.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Concepts</h3>
                        <dl className="text-sm space-y-2">
                            <div>
                                <dt className="font-medium text-gray-900">User</dt>
                                <dd className="text-gray-600">An entity that you create in AWS to represent the person or application that uses it to interact with AWS.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">Group</dt>
                                <dd className="text-gray-600">A collection of IAM users. You can use groups to specify permissions for a collection of users.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">Policy</dt>
                                <dd className="text-gray-600">An object in AWS that, when associated with an identity or resource, defines their permissions.</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="font-semibold text-red-900 text-sm mb-1">⚠️ Root User Warning</h4>
                        <p className="text-xs text-red-800">
                            The root user has unlimited access. It is strongly recommended to create an IAM user for yourself and lock away the root user credentials.
                        </p>
                    </div>
                </div>
            }
        />
    );
};
