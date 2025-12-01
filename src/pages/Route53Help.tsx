import React from 'react';
import { Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, Globe, Activity } from 'lucide-react';

export const Route53Help: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Globe className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is Route 53?</strong> AWS's scalable Domain Name System (DNS) web service.</p>
                    <p><strong>Use Cases:</strong> Domain registration, DNS routing, Health checking, Traffic flow management</p>
                    <p><strong>Key Concepts:</strong> Hosted Zones (container for records), Records (A, CNAME, etc.), Routing Policies</p>
                </div>
            </div>

            {/* Route 53 Components */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-3">Components Explained</h3>
                <div className="space-y-2 text-sm text-orange-800">
                    <div className="bg-white rounded p-2">
                        <p><strong>📂 Hosted Zone:</strong> Represents a collection of records that can be managed together, belonging to a single parent domain name.</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>📝 Records:</strong> Instructions for DNS servers. Common types: A (IPv4), AAAA (IPv6), CNAME (Canonical Name), MX (Mail Exchange).</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>🔀 Routing Policies:</strong> Rules for routing traffic (Simple, Weighted, Latency, Failover, Geolocation).</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>💓 Health Checks:</strong> Monitor the health of your resources and route traffic away from unhealthy ones.</p>
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
                        <h4 className="font-medium text-gray-900 mb-1">Creating a Hosted Zone</h4>
                        <p className="text-sm text-gray-600">Route 53 → Hosted zones → Create hosted zone → Enter domain name → Select Type (Public/Private)</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Creating an A Record</h4>
                        <p className="text-sm text-gray-600">Select Hosted Zone → Create record → Record name (e.g., www) → Record type (A) → Value (IP address)</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Setting up Failover</h4>
                        <p className="text-sm text-gray-600">Create Health Check → Create Primary Record (Failover: Primary) → Create Secondary Record (Failover: Secondary)</p>
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
                        <span><strong>Use Alias Records:</strong> Prefer Alias records over CNAME for AWS resources (S3, ELB, CloudFront) - they are free and faster.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Set appropriate TTL:</strong> Lower TTL (e.g., 60s) for critical/changing records, higher for static ones.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Enable Health Checks:</strong> Always configure health checks for production endpoints to ensure high availability.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Use Private Hosted Zones:</strong> For internal network traffic within VPCs, use private hosted zones for security.</span>
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
                        <span><strong>Enable DNSSEC:</strong> Protect against DNS spoofing and cache poisoning attacks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Limit Access:</strong> Use IAM policies to restrict who can modify DNS records.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Enable Query Logging:</strong> Log DNS queries to CloudWatch Logs for audit and troubleshooting.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Lock Domains:</strong> Enable domain locking to prevent unauthorized transfer of your domain.</span>
                    </li>
                </ul>
            </div>

            {/* Cost Optimization */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="text-yellow-600" size={20} />
                    <h3 className="font-semibold text-yellow-900">Cost Optimization</h3>
                </div>
                <div className="space-y-2 text-sm text-yellow-800">
                    <p><strong>Pricing Factors:</strong></p>
                    <ul className="ml-4 space-y-1">
                        <li>• <strong>Hosted Zones:</strong> $0.50 per hosted zone / month</li>
                        <li>• <strong>Queries:</strong> $0.40 per million queries (Standard)</li>
                        <li>• <strong>Health Checks:</strong> ~$0.50 - $2.00 per check / month</li>
                    </ul>
                    <p className="mt-2"><strong>Tips:</strong> Delete unused hosted zones. Use Alias records for AWS resources (queries are free). Avoid excessive health checks on non-critical endpoints.</p>
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
                        <p className="font-semibold text-purple-900 mb-1">DNS Changes Not Reflecting</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> TTL (Time To Live). Changes won't propagate until the cached TTL expires. Flush local DNS cache.</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Site Not Reachable</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Verify A record points to correct IP. If using ELB/S3, ensure Alias record is correct.</p>
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
                    <div><span className="text-gray-400"># List hosted zones</span></div>
                    <div>aws route53 list-hosted-zones</div>
                    <div className="mt-2"><span className="text-gray-400"># List records in a zone</span></div>
                    <div>aws route53 list-resource-record-sets --hosted-zone-id Z1234567890</div>
                    <div className="mt-2"><span className="text-gray-400"># Create health check</span></div>
                    <div>aws route53 create-health-check --caller-reference unique-ref --health-check-config ...</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS Route 53 Developer Guide</p>
                    <p><strong>🎥 Video:</strong> Deep Dive into AWS Route 53</p>
                    <p><strong>💡 Tutorial:</strong> Setting up DNS Failover</p>
                </div>
            </div>
        </div>
    );
};
