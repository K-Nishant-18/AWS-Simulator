import React from 'react';
import { Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, DollarSign, Database } from 'lucide-react';

export const RDSHelp: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Database className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is RDS?</strong> Amazon Relational Database Service makes it easy to set up, operate, and scale relational databases in the cloud.</p>
                    <p><strong>Supported Engines:</strong> MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Amazon Aurora</p>
                    <p><strong>Key Features:</strong> Automated backups, Multi-AZ deployment, Read replicas, Automatic patching, Monitoring</p>
                </div>
            </div>

            {/* Database Engines */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3">Choosing a Database Engine</h3>
                <div className="space-y-2 text-sm text-green-800">
                    <div className="bg-white rounded p-2">
                        <p><strong>🐬 MySQL:</strong> Most popular open-source database, great for web applications</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>🐘 PostgreSQL:</strong> Advanced features, JSON support, excellent for complex queries</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>🦭 MariaDB:</strong> MySQL fork with better performance and additional features</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>⚡ Aurora:</strong> AWS-native, 5x faster than MySQL, 3x faster than PostgreSQL</p>
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
                        <h4 className="font-medium text-gray-900 mb-1">Creating a Database</h4>
                        <p className="text-sm text-gray-600">RDS → Create database → Choose engine → Select template → Configure settings → Create</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Connecting to Database</h4>
                        <p className="text-sm text-gray-600">mysql -h [endpoint] -P 3306 -u admin -p</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Creating Snapshots</h4>
                        <p className="text-sm text-gray-600">Select DB → Actions → Take snapshot → Name it → Create</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Restoring from Snapshot</h4>
                        <p className="text-sm text-gray-600">Snapshots → Select → Actions → Restore → Configure new DB → Restore</p>
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
                        <span><strong>Enable Multi-AZ:</strong> Deploy in multiple availability zones for high availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use Read Replicas:</strong> Offload read traffic to improve performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Automated backups:</strong> Enable automated backups with appropriate retention period</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Monitor performance:</strong> Use CloudWatch and Enhanced Monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Parameter groups:</strong> Customize database settings for your workload</span>
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
                        <span><strong>Use private subnets:</strong> Never expose databases directly to the internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Encrypt at rest:</strong> Enable encryption for data stored on disk</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>SSL/TLS connections:</strong> Require encrypted connections from applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Strong passwords:</strong> Use complex master passwords, rotate regularly</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Security groups:</strong> Restrict database access to specific application servers only</span>
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
                    <p><strong>Instance Classes:</strong></p>
                    <ul className="ml-4 space-y-1">
                        <li>• <strong>db.t3.micro:</strong> Free tier eligible, good for dev/test</li>
                        <li>• <strong>db.m5:</strong> General purpose, balanced performance</li>
                        <li>• <strong>db.r5:</strong> Memory optimized for large datasets</li>
                    </ul>
                    <p className="mt-2"><strong>Tips:</strong> Use Reserved Instances for production (up to 69% savings), stop dev/test databases when not in use, use Aurora Serverless for variable workloads</p>
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
                        <p className="font-semibold text-purple-900 mb-1">Can't Connect to Database</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Security group allows inbound traffic, DB is in available state, correct endpoint and port, VPC/subnet configuration</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">High CPU Usage</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Optimize queries, add indexes, scale up instance class, use read replicas</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Storage Full</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Enable storage autoscaling, increase allocated storage, clean up old data</p>
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
                    <div><span className="text-gray-400"># List databases</span></div>
                    <div>aws rds describe-db-instances</div>
                    <div className="mt-2"><span className="text-gray-400"># Create database</span></div>
                    <div>aws rds create-db-instance --db-instance-identifier mydb --db-instance-class db.t3.micro --engine mysql</div>
                    <div className="mt-2"><span className="text-gray-400"># Create snapshot</span></div>
                    <div>aws rds create-db-snapshot --db-snapshot-identifier mysnap --db-instance-identifier mydb</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS RDS User Guide</p>
                    <p><strong>🎥 Video:</strong> RDS Deep Dive on AWS Training</p>
                    <p><strong>💡 Tutorial:</strong> Building Scalable Database Applications</p>
                    <p><strong>🔧 Tools:</strong> DBeaver, MySQL Workbench, pgAdmin</p>
                </div>
            </div>
        </div>
    );
};
