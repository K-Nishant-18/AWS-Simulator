import React from 'react';
import { HelpCircle, Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, DollarSign, Users } from 'lucide-react';

export const IAMHelp: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is IAM?</strong> AWS Identity and Access Management controls who can access your AWS resources and what they can do.</p>
                    <p><strong>Use Cases:</strong> User management, access control, service permissions, federated access, compliance</p>
                    <p><strong>Key Concepts:</strong> Users (people/apps), Groups (collections), Roles (temporary permissions), Policies (rules)</p>
                </div>
            </div>

            {/* IAM Components */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-3">IAM Components Explained</h3>
                <div className="space-y-2 text-sm text-purple-800">
                    <div className="bg-white rounded p-2">
                        <p><strong>👤 Users:</strong> Individual people or applications that need AWS access</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>👥 Groups:</strong> Collections of users with similar permissions (e.g., Developers, Admins)</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>🎭 Roles:</strong> Temporary credentials for services or federated users</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>📜 Policies:</strong> JSON documents that define permissions (what actions are allowed/denied)</p>
                    </div>
                </div>
            </div>

            {/* Common Tasks */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="text-orange-500" size={18} />
                    Common Tasks
                </h3>
                <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Creating a User</h4>
                        <p className="text-sm text-gray-600">IAM → Users → Add User → Set name → Choose access type → Set permissions → Create</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Creating a Group</h4>
                        <p className="text-sm text-gray-600">IAM → Groups → Create Group → Name it → Attach policies → Add users</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Attaching Policies</h4>
                        <p className="text-sm text-gray-600">Select user/group/role → Permissions → Attach policies → Choose from AWS managed or custom</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Enabling MFA</h4>
                        <p className="text-sm text-gray-600">User → Security credentials → Assign MFA device → Scan QR code → Enter two codes</p>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="text-green-600" size={20} />
                    <h3 className="font-semibold text-green-900">Best Practices</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Enable MFA:</strong> Require multi-factor authentication for all users, especially admins</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Least privilege:</strong> Grant only the minimum permissions needed to perform a task</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use groups:</strong> Assign permissions to groups, not individual users</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Rotate credentials:</strong> Change passwords and access keys regularly (every 90 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use roles for EC2:</strong> Never store credentials on instances, use IAM roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Monitor activity:</strong> Enable CloudTrail to log all IAM actions</span>
                    </li>
                </ul>
            </div>

            {/* Security Tips */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Shield className="text-red-600" size={20} />
                    <h3 className="font-semibold text-red-900">Security Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Never use root account:</strong> Create IAM users for daily tasks, lock root account with MFA</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>No hardcoded credentials:</strong> Never put access keys in code or version control</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Delete unused credentials:</strong> Remove old access keys and inactive users</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Use password policy:</strong> Enforce strong passwords with complexity requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Review permissions:</strong> Regularly audit who has access to what</span>
                    </li>
                </ul>
            </div>

            {/* Policy Examples */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Code className="text-yellow-600" size={20} />
                    <h3 className="font-semibold text-yellow-900">Common Policy Patterns</h3>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-yellow-900 mb-1">Read-Only S3 Access</p>
                        <code className="text-xs text-yellow-800">s3:GetObject, s3:ListBucket</code>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-yellow-900 mb-1">EC2 Full Access</p>
                        <code className="text-xs text-yellow-800">ec2:*, elasticloadbalancing:*</code>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-yellow-900 mb-1">Deny All Except Specific Region</p>
                        <code className="text-xs text-yellow-800">Condition: StringEquals aws:RequestedRegion: us-east-1</code>
                    </div>
                </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="text-purple-600" size={20} />
                    <h3 className="font-semibold text-purple-900">Troubleshooting Guide</h3>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Access Denied Error</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> User has correct policy attached, policy allows the action, no explicit deny exists</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Can't Assume Role</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Trust policy allows the principal, user has sts:AssumeRole permission</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">MFA Not Working</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Check time sync on device, try backup codes, re-sync virtual MFA device</p>
                    </div>
                </div>
            </div>

            {/* CLI Commands */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Code className="text-gray-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Useful CLI Commands</h3>
                </div>
                <div className="space-y-2 text-xs font-mono bg-gray-900 text-gray-100 p-3 rounded">
                    <div><span className="text-gray-400"># List users</span></div>
                    <div>aws iam list-users</div>
                    <div className="mt-2"><span className="text-gray-400"># Create user</span></div>
                    <div>aws iam create-user --user-name john</div>
                    <div className="mt-2"><span className="text-gray-400"># Attach policy</span></div>
                    <div>aws iam attach-user-policy --user-name john --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess</div>
                    <div className="mt-2"><span className="text-gray-400"># Create access key</span></div>
                    <div>aws iam create-access-key --user-name john</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS IAM User Guide</p>
                    <p><strong>🎥 Video:</strong> IAM Best Practices on AWS Training</p>
                    <p><strong>💡 Tutorial:</strong> IAM Policy Simulator</p>
                    <p><strong>🔧 Tools:</strong> IAM Access Analyzer, Policy Generator</p>
                </div>
            </div>
        </div>
    );
};
