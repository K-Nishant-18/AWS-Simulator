import React from 'react';
import { Lightbulb, AlertTriangle, BookOpen, Code, Zap, Shield, Network, Activity } from 'lucide-react';

export const ELBHelp: React.FC = () => {
    return (
        <div className="space-y-6 p-4">
            {/* Quick Reference */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Network className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Quick Reference</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>What is ELB?</strong> Elastic Load Balancing automatically distributes incoming application traffic across multiple targets.</p>
                    <p><strong>Use Cases:</strong> High availability, Fault tolerance, Automatic scaling, Security</p>
                    <p><strong>Key Concepts:</strong> Load Balancer (entry point), Listener (checks for requests), Target Group (routes traffic), Targets (EC2, IP, Lambda)</p>
                </div>
            </div>

            {/* ELB Components */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-3">Components Explained</h3>
                <div className="space-y-2 text-sm text-purple-800">
                    <div className="bg-white rounded p-2">
                        <p><strong>⚖️ Application Load Balancer (ALB):</strong> Best for HTTP/HTTPS traffic. Operates at Layer 7 (Application Layer). Supports path-based routing.</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>👂 Listener:</strong> A process that checks for connection requests using the protocol and port that you configure.</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>🎯 Target Group:</strong> Routes requests to one or more registered targets, such as EC2 instances, using the protocol and port number that you specify.</p>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p><strong>💓 Health Checks:</strong> Periodically sends requests to registered targets to test their status. Traffic is only routed to healthy targets.</p>
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
                        <h4 className="font-medium text-gray-900 mb-1">Creating an ALB</h4>
                        <p className="text-sm text-gray-600">EC2 Console → Load Balancers → Create Load Balancer → Application Load Balancer → Configure listeners/zones → Configure Security Groups → Configure Routing</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Registering Targets</h4>
                        <p className="text-sm text-gray-600">Target Groups → Select Group → Targets tab → Edit → Select instances → Add to registered</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-1">Configuring Health Checks</h4>
                        <p className="text-sm text-gray-600">Target Groups → Select Group → Health checks tab → Edit → Set path (e.g., /health) and thresholds</p>
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
                        <span><strong>Multi-AZ Deployment:</strong> Enable at least two Availability Zones to ensure high availability.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Security Groups:</strong> Configure LB security group to allow inbound traffic, and Instance security groups to ONLY allow traffic from the LB.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Access Logs:</strong> Enable access logs to capture detailed information about requests sent to your load balancer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span><strong>Delete Protection:</strong> Enable deletion protection for production load balancers to prevent accidental deletion.</span>
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
                        <span><strong>HTTPS Termination:</strong> Offload SSL/TLS termination to the load balancer to reduce load on instances.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>WAF Integration:</strong> Attach AWS WAF to your ALB to protect against common web exploits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Strict Security Groups:</strong> Ensure backend instances ONLY accept traffic from the Load Balancer's security group.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span><strong>Latest Security Policies:</strong> Use the latest predefined security policy for SSL negotiation.</span>
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
                        <li>• <strong>Application Load Balancer:</strong> ~$0.0225 per hour</li>
                        <li>• <strong>LCU (Capacity Units):</strong> ~$0.008 per LCU-hour (based on connections, bandwidth, etc.)</li>
                    </ul>
                    <p className="mt-2"><strong>Tips:</strong> Consolidate multiple applications behind a single ALB using path-based routing (e.g., /app1, /app2) instead of creating a separate LB for each app. Delete unused Load Balancers.</p>
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
                        <p className="font-semibold text-purple-900 mb-1">502 Bad Gateway</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Target is closing the connection, response header is too large, or target is taking too long to respond.</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">503 Service Unavailable</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> No registered targets, or no healthy targets in the target group.</p>
                    </div>
                    <div className="bg-white rounded p-3">
                        <p className="font-semibold text-purple-900 mb-1">Health Check Failing</p>
                        <p className="text-purple-800 text-xs"><strong>Check:</strong> Security group rules, correct path/port, instance is running and application is listening.</p>
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
                    <div><span className="text-gray-400"># Create Load Balancer</span></div>
                    <div>aws elbv2 create-load-balancer --name my-load-balancer --subnets subnet-12345678 subnet-23456789 --security-groups sg-12345678</div>
                    <div className="mt-2"><span className="text-gray-400"># Create Target Group</span></div>
                    <div>aws elbv2 create-target-group --name my-targets --protocol HTTP --port 80 --vpc-id vpc-12345678</div>
                    <div className="mt-2"><span className="text-gray-400"># Register Targets</span></div>
                    <div>aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:... --targets Id=i-12345678 Id=i-23456789</div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-blue-900">Learn More</h3>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>📖 Documentation:</strong> AWS ELB User Guide</p>
                    <p><strong>🎥 Video:</strong> Introduction to Application Load Balancer</p>
                    <p><strong>💡 Tutorial:</strong> Load Balancing with EC2 Auto Scaling</p>
                </div>
            </div>
        </div>
    );
};
