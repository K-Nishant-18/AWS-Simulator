import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulationStore } from '../store/simulationStore';
import { Server, HardDrive, Users, Shield } from 'lucide-react';

const ResourceNode = ({ data }: { data: { label: string; type: string; icon: any; subLabel?: string } }) => {
    const Icon = data.icon;
    const colors = {
        s3: 'bg-green-50 border-green-200 text-green-700',
        ec2: 'bg-orange-50 border-orange-200 text-orange-700',
        iam: 'bg-blue-50 border-blue-200 text-blue-700',
        sg: 'bg-gray-50 border-gray-200 text-gray-700',
        policy: 'bg-purple-50 border-purple-200 text-purple-700',
    };

    const colorClass = colors[data.type as keyof typeof colors] || 'bg-white border-gray-200';

    return (
        <div className={`px-4 py-3 rounded-lg border-2 shadow-sm min-w-[180px] ${colorClass}`}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md shadow-sm">
                    <Icon size={20} />
                </div>
                <div>
                    <div className="font-bold text-sm">{data.label}</div>
                    {data.subLabel && <div className="text-xs opacity-75">{data.subLabel}</div>}
                </div>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-wider font-semibold opacity-60">
                {data.type.toUpperCase()}
            </div>
        </div>
    );
};

const nodeTypes = {
    resource: ResourceNode,
};

export const ArchitectureDiagram: React.FC = () => {
    const { s3, ec2, iam } = useSimulationStore();

    const { nodes, edges } = useMemo(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let yOffset = 50;
        const xSpacing = 250;
        const ySpacing = 120;

        // IAM Column (Left)
        let iamY = yOffset;

        // Users
        iam.users.forEach((user) => {
            const nodeId = `user-${user.userName}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50, y: iamY },
                data: { label: user.userName, type: 'iam', icon: Users, subLabel: 'IAM User' },
            });

            // Connect User to Policies
            user.policies.forEach((policyArn) => {
                const policyName = iam.policies.find(p => p.policyArn === policyArn)?.policyName || 'Policy';

                // Check if policy node already exists (shared policies)
                let existingPolicyNode = newNodes.find(n => n.data.label === policyName && n.data.type === 'policy');
                if (!existingPolicyNode) {
                    // We won't add separate nodes for now to keep it simple, 
                    // but logic is here if we want to expand.
                }
            });

            iamY += ySpacing;
        });

        // EC2 Column (Center)
        let ec2Y = yOffset;
        ec2.instances.forEach((instance) => {
            const nodeId = `ec2-${instance.instanceId}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50 + xSpacing, y: ec2Y },
                data: {
                    label: instance.instanceId,
                    type: 'ec2',
                    icon: Server,
                    subLabel: `${instance.instanceType} • ${instance.state}`
                },
            });

            // Security Groups
            instance.securityGroups.forEach((sgId) => {
                const sg = ec2.securityGroups.find(g => g.groupId === sgId);
                if (sg) {
                    const sgNodeId = `sg-${sg.groupId}`;
                    // Check if SG node exists
                    if (!newNodes.find(n => n.id === sgNodeId)) {
                        newNodes.push({
                            id: sgNodeId,
                            type: 'resource',
                            position: { x: 50 + xSpacing, y: ec2Y + ySpacing }, // Simple offset
                            data: { label: sg.groupName, type: 'sg', icon: Shield, subLabel: 'Security Group' }
                        });
                    }

                    newEdges.push({
                        id: `${nodeId}-${sgNodeId}`,
                        source: nodeId,
                        target: sgNodeId,
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#f97316' },
                    });
                }
            });

            ec2Y += (ySpacing * 1.5); // Give more space for SGs
        });

        // S3 Column (Right)
        let s3Y = yOffset;
        s3.buckets.forEach((bucket) => {
            newNodes.push({
                id: `s3-${bucket.name}`,
                type: 'resource',
                position: { x: 50 + (xSpacing * 2), y: s3Y },
                data: {
                    label: bucket.name,
                    type: 's3',
                    icon: HardDrive,
                    subLabel: `${bucket.objects.length} objects`
                },
            });
            s3Y += ySpacing;
        });

        return { nodes: newNodes, edges: newEdges };
    }, [s3, ec2, iam]);

    return (
        <div className="h-[600px] w-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
            >
                <Background color="#e5e7eb" gap={16} />
                <Controls />
            </ReactFlow>
        </div>
    );
};
