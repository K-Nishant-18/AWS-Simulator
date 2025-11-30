import React from 'react';
import { LabLayout } from '../layouts/LabLayout';
import { EC2Console } from './EC2Console';
import { EC2LabGuide } from './EC2LabGuide';
import { Terminal } from '../components/Terminal';

export const EC2Lab: React.FC = () => {
    return (
        <LabLayout
            guide={<EC2LabGuide />}
            console={<EC2Console />}
            terminal={<Terminal />}
            help={
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">What is Amazon EC2?</h3>
                        <p className="text-sm text-gray-600">
                            Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the cloud.
                            It allows you to launch virtual servers (instances) in minutes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Concepts</h3>
                        <dl className="text-sm space-y-2">
                            <div>
                                <dt className="font-medium text-gray-900">Instance</dt>
                                <dd className="text-gray-600">A virtual server running in the AWS cloud.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">AMI</dt>
                                <dd className="text-gray-600">Amazon Machine Image. A template that contains the software configuration (OS, app server, etc.) required to launch your instance.</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-gray-900">Security Group</dt>
                                <dd className="text-gray-600">A virtual firewall that controls inbound and outbound traffic for your instances.</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <h4 className="font-semibold text-green-900 text-sm mb-1">✓ Best Practice</h4>
                        <p className="text-xs text-green-800">
                            Follow the principle of least privilege when configuring security groups.
                            Only open ports that are absolutely necessary (e.g., port 80 for web, 22 for SSH).
                        </p>
                    </div>
                </div>
            }
        />
    );
};
