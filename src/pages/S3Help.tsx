import React from 'react';
import { HelpCircle, Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, DollarSign } from 'lucide-react';

export const S3Help: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is S3?</strong> Amazon Simple Storage Service (S3) is object storage built to store and retrieve any amount of data from anywhere.</p>
                    <p><strong>Use Cases:</strong> Static website hosting, backup/archive, data lakes, content distribution, application hosting</p>
                    <p><strong>Key Concepts:</strong> Buckets (containers), Objects (files), Keys (file names), Regions (locations)</p>
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
                        <h4 className="font-medium text-gray-900 mb-1">Creating a Bucket</h4>
                        <p className="text-sm text-gray-600">Click "Create Bucket" → Enter unique name → Select region → Configure options → Create</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Uploading Files</h4>
                        <p className="text-sm text-gray-600">Select bucket → Click "Upload" → Choose files → Set permissions → Upload</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Making Files Public</h4>
                        <p className="text-sm text-gray-600">Bucket settings → Permissions → Uncheck "Block all public access" → Confirm</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Enabling Website Hosting</h4>
                        <p className="text-sm text-gray-600">Properties → Static website hosting → Enable → Set index document → Save</p>
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
                        <span><strong>Use versioning:</strong> Enable versioning to protect against accidental deletions and overwrites</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Encrypt data:</strong> Use server-side encryption (SSE-S3, SSE-KMS) for sensitive data</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Lifecycle policies:</strong> Automatically transition old data to cheaper storage classes</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use CloudFront:</strong> Add CDN for better performance and lower costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Monitor access:</strong> Enable S3 access logging and CloudTrail for audit trails</span>
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
                        <span><strong>Never make buckets public unless necessary:</strong> Use pre-signed URLs for temporary access instead</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Use IAM policies:</strong> Grant least-privilege access to users and applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Enable MFA Delete:</strong> Require multi-factor authentication for object deletion</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Block public ACLs:</strong> Keep "Block public access" enabled by default</span>
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
                    <p><strong>Storage Classes:</strong></p>
                    <ul className="ml-4 space-y-1">
                        <li>• <strong>S3 Standard:</strong> Frequently accessed data ($0.023/GB)</li>
                        <li>• <strong>S3 Intelligent-Tiering:</strong> Automatic cost optimization</li>
                        <li>• <strong>S3 Glacier:</strong> Long-term archive ($0.004/GB)</li>
                    </ul>
                    <p className="mt-2"><strong>Tips:</strong> Delete old versions, use lifecycle policies, compress files, use CloudFront to reduce data transfer</p>
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
                        <p className="font-semibold text-purple-900 mb-1">403 Forbidden Error</p>
                        <p className="text-purple-800 text-xs"><strong>Problem:</strong> Can't access object</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Check bucket policy, object ACL, and "Block public access" settings</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Slow Upload/Download</p>
                        <p className="text-purple-800 text-xs"><strong>Problem:</strong> Poor performance</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Use multipart upload, enable transfer acceleration, or use CloudFront</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Bucket Name Taken</p>
                        <p className="text-purple-800 text-xs"><strong>Problem:</strong> Name already exists globally</p>
                        <p className="text-purple-800 text-xs"><strong>Solution:</strong> Add unique suffix (company name, date, random string)</p>
                    </div>
                </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Code className="text-gray-600" size={20} />
                    <h3 className="font-semibold text-gray-900">Useful CLI Commands</h3>
                </div>
                <div className="space-y-2 text-xs font-mono bg-gray-900 text-gray-100 p-3 rounded">
                    <div><span className="text-gray-400"># List buckets</span></div>
                    <div>aws s3 ls</div>
                    <div className="mt-2"><span className="text-gray-400"># Copy file to S3</span></div>
                    <div>aws s3 cp file.txt s3://bucket-name/</div>
                    <div className="mt-2"><span className="text-gray-400"># Sync directory</span></div>
                    <div>aws s3 sync ./local s3://bucket-name/</div>
                    <div className="mt-2"><span className="text-gray-400"># Delete object</span></div>
                    <div>aws s3 rm s3://bucket-name/file.txt</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS S3 Developer Guide</p>
                    <p><strong>🎥 Video:</strong> S3 Masterclass on YouTube</p>
                    <p><strong>💡 Tutorial:</strong> Building Serverless Websites with S3</p>
                    <p><strong>🔧 Tools:</strong> S3 Browser, CloudBerry Explorer</p>
                </div>
            </div>
        </div>
    );
};
