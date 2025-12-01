import React from 'react';
import { Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, DollarSign, Server } from 'lucide-react';

export const EC2Help: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Server className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is EC2?</strong> Amazon Elastic Compute Cloud provides scalable virtual servers in the cloud.</p>
                    <p><strong>Use Cases:</strong> Web servers, application hosting, databases, batch processing, gaming servers, development environments</p>
                    <p><strong>Key Concepts:</strong> Instances (virtual machines), AMIs (templates), Instance types (sizes), Security groups (firewalls)</p>
                </div>
            </div>

            {/* Instance Types Guide */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-3">Instance Type Families</h3>
                <div className="space-y-2 text-sm text-orange-800">
                    <div className="bg-white rounded p-2">
                        <p><strong>T2/T3 (General Purpose):</strong> Burstable performance, good for web servers, dev environments</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>M5 (Balanced):</strong> Balance of compute, memory, and networking for most workloads</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>C5 (Compute Optimized):</strong> High-performance processors for compute-intensive tasks</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>R5 (Memory Optimized):</strong> Large memory for databases and in-memory caches</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>P3 (GPU):</strong> Machine learning, graphics rendering, video encoding</p>
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
                        <h4 className="font-medium text-gray-900 mb-1">Launching an Instance</h4>
                        <p className="text-sm text-gray-600">EC2 Dashboard → Launch Instance → Choose AMI → Select instance type → Configure → Launch</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Connecting via SSH</h4>
                        <p className="text-sm text-gray-600">ssh -i keypair.pem ec2-user@[public-ip]</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Creating Security Groups</h4>
                        <p className="text-sm text-gray-600">EC2 → Security Groups → Create → Add inbound/outbound rules → Save</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Stopping vs Terminating</h4>
                        <p className="text-sm text-gray-600"><strong>Stop:</strong> Pause instance (keep data, stop charges). <strong>Terminate:</strong> Delete permanently</p>
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
                        <span><strong>Use Auto Scaling:</strong> Automatically adjust capacity based on demand</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Tag everything:</strong> Use tags for organization, cost tracking, and automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use IAM roles:</strong> Never store credentials on instances, use IAM roles instead</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Regular backups:</strong> Create AMIs or use EBS snapshots for disaster recovery</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Monitor with CloudWatch:</strong> Set up alarms for CPU, memory, and disk usage</span>
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
                        <span><strong>Restrict SSH access:</strong> Never use 0.0.0.0/0 for SSH (port 22). Use your IP or VPN</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Keep systems updated:</strong> Regularly patch OS and applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Use private subnets:</strong> Place instances in private subnets, use bastion hosts for access</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Enable encryption:</strong> Encrypt EBS volumes and use encrypted AMIs</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Protect key pairs:</strong> Store .pem files securely, never commit to version control</span>
                    </li>
                </ul>
            </div>

            {/* Cost Optimization */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="text-yellow-600" size={20} />
                    <h3 className="font-semibold text-yellow-900">Cost Optimization</h3>
                </div>
                <div className="space-y-2 text-sm text-yellow-800">
                    <p><strong>Pricing Models:</strong></p>
                    <ul className="ml-4 space-y-1">
                        <li>• <strong>On-Demand:</strong> Pay per hour/second, no commitment</li>
                        <li>• <strong>Reserved Instances:</strong> 1-3 year commitment, up to 75% savings</li>
                        <li>• <strong>Spot Instances:</strong> Bid on spare capacity, up to 90% savings</li>
                        <li>• <strong>Savings Plans:</strong> Flexible pricing, commit to usage amount</li>
                    </ul>
                    <p className="mt-2"><strong>Tips:</strong> Stop unused instances, right-size instances, use Spot for fault-tolerant workloads, schedule instances</p>
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
                        <p className="font-semibold text-purple-900 mb-1">Can't Connect via SSH</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Security group allows port 22, key pair permissions (chmod 400), correct username (ec2-user, ubuntu, admin)</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Instance Status Check Failed</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Stop and start instance (not reboot), check system logs, verify EBS volume health</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">High CPU Usage</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Check CloudWatch metrics, identify processes with `top`, consider larger instance type or Auto Scaling</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Out of Disk Space</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Resize EBS volume, clean up logs/temp files, add additional EBS volumes</p>
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
                    <div><span className="text-gray-400"># List instances</span></div>
                    <div>aws ec2 describe-instances</div>
                    <div className="mt-2"><span className="text-gray-400"># Launch instance</span></div>
                    <div>aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro</div>
                    <div className="mt-2"><span className="text-gray-400"># Stop instance</span></div>
                    <div>aws ec2 stop-instances --instance-ids i-xxx</div>
                    <div className="mt-2"><span className="text-gray-400"># Create security group</span></div>
                    <div>aws ec2 create-security-group --group-name my-sg --description "My SG"</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS EC2 User Guide</p>
                    <p><strong>🎥 Video:</strong> EC2 Deep Dive on AWS Training</p>
                    <p><strong>💡 Tutorial:</strong> Building Scalable Web Applications</p>
                    <p><strong>🔧 Tools:</strong> EC2 Instance Connect, Systems Manager</p>
                </div>
            </div>
        </div>
    );
};
