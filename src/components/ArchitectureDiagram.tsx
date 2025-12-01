import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSimulationStore } from '../store/simulationStore';
import { Server, HardDrive, Users, Shield, Database, Globe, Network } from 'lucide-react';

const ResourceNode = ({ data }: { data: { label: string; type: string; icon: any; subLabel?: string } }) => {
    const Icon = data.icon;
    const colors = {
        s3: 'bg-green-50 border-green-200 text-green-700',
        ec2: 'bg-orange-50 border-orange-200 text-orange-700',
        iam: 'bg-blue-50 border-blue-200 text-blue-700',
        sg: 'bg-gray-50 border-gray-200 text-gray-700',
        policy: 'bg-purple-50 border-purple-200 text-purple-700',
        rds: 'bg-indigo-50 border-indigo-200 text-indigo-700',
        route53: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        elb: 'bg-sky-50 border-sky-200 text-sky-700',
        targetGroup: 'bg-slate-50 border-slate-200 text-slate-700',
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
    const { s3, ec2, iam, rds, route53, elb } = useSimulationStore();

    const { nodes, edges } = useMemo(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        let yOffset = 50;
        const xSpacing = 280;
        const ySpacing = 120;

        // --- Column 1: Route 53 (DNS) ---
        let r53Y = yOffset;
        route53.hostedZones.forEach((zone) => {
            const nodeId = `r53-${zone.id}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50, y: r53Y },
                data: { label: zone.name, type: 'route53', icon: Globe, subLabel: 'Hosted Zone' },
            });
            r53Y += ySpacing;
        });

        // --- Column 2: ELB (Load Balancers) ---
        let elbY = yOffset;
        elb.loadBalancers.forEach((lb) => {
            const nodeId = `elb-${lb.arn}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50 + xSpacing, y: elbY },
                data: { label: lb.name, type: 'elb', icon: Network, subLabel: 'Application LB' },
            });

            // Connect Route 53 to ELB (Conceptual)
            if (route53.hostedZones.length > 0) {
                newEdges.push({
                    id: `dns-to-lb-${lb.arn}`,
                    source: `r53-${route53.hostedZones[0].id}`,
                    target: nodeId,
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#eab308' },
                });
            }

            // Target Groups
            const tg = elb.targetGroups.find(t => t.arn === lb.targetGroupArn);
            if (tg) {
                const tgNodeId = `tg-${tg.arn}`;
                newNodes.push({
                    id: tgNodeId,
                    type: 'resource',
                    position: { x: 50 + xSpacing, y: elbY + 100 },
                    data: { label: tg.name, type: 'targetGroup', icon: Network, subLabel: 'Target Group' },
                });

                newEdges.push({
                    id: `${nodeId}-${tgNodeId}`,
                    source: nodeId,
                    target: tgNodeId,
                    type: 'smoothstep',
                });

                // Connect Target Group to Instances
                tg.targets.forEach(targetId => {
                    newEdges.push({
                        id: `${tgNodeId}-${targetId}`,
                        source: tgNodeId,
                        target: `ec2-${targetId}`,
                        type: 'smoothstep',
                        animated: true,
                        style: { stroke: '#0ea5e9' },
                    });
                });
            }

            elbY += (ySpacing * 2);
        });

        // --- Column 3: EC2 (Compute) ---
        let ec2Y = yOffset;
        ec2.instances.forEach((instance) => {
            const nodeId = `ec2-${instance.instanceId}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50 + (xSpacing * 2), y: ec2Y },
                data: {
                    label: instance.instanceId,
                    type: 'ec2',
                    icon: Server,
                    subLabel: `${instance.instanceType} • ${instance.state}`
                },
            });

            // Security Groups (Visualized as attached nodes)
            instance.securityGroups.forEach((sgId, idx) => {
                const sg = ec2.securityGroups.find(g => g.groupId === sgId);
                if (sg) {
                    const sgNodeId = `sg-${sg.groupId}-${instance.instanceId}`; // Unique per instance for visual clarity
                    newNodes.push({
                        id: sgNodeId,
                        type: 'resource',
                        position: { x: 50 + (xSpacing * 2) + 40, y: ec2Y + 80 + (idx * 60) },
                        data: { label: sg.groupName, type: 'sg', icon: Shield, subLabel: 'Security Group' }
                    });

                    newEdges.push({
                        id: `${nodeId}-${sgNodeId}`,
                        source: nodeId,
                        target: sgNodeId,
                        type: 'smoothstep',
                        style: { stroke: '#f97316', strokeDasharray: '5,5' },
                    });
                }
            });

            ec2Y += (ySpacing * 2);
        });

        // --- Column 4: Data (RDS & S3) ---
        let dataY = yOffset;

        // RDS
        rds.instances.forEach((db) => {
            const nodeId = `rds-${db.dbInstanceIdentifier}`;
            newNodes.push({
                id: nodeId,
                type: 'resource',
                position: { x: 50 + (xSpacing * 3), y: dataY },
                data: { label: db.dbInstanceIdentifier, type: 'rds', icon: Database, subLabel: db.engine },
            });

            // Connect EC2 to RDS (Conceptual - all EC2s can talk to RDS)
            if (ec2.instances.length > 0) {
                newEdges.push({
                    id: `ec2-to-db-${nodeId}`,
                    source: `ec2-${ec2.instances[0].instanceId}`, // Just connect first one for visual simplicity
                    target: nodeId,
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: '#4f46e5' },
                });
            }

            dataY += ySpacing;
        });

        // S3
        s3.buckets.forEach((bucket) => {
            newNodes.push({
                id: `s3-${bucket.name}`,
                type: 'resource',
                position: { x: 50 + (xSpacing * 3), y: dataY },
                data: {
                    label: bucket.name,
                    type: 's3',
                    icon: HardDrive,
                    subLabel: `${bucket.objects.length} objects`
                },
            });
            dataY += ySpacing;
        });

        // IAM (Floating / Bottom)
        let iamY = Math.max(r53Y, elbY, ec2Y, dataY) + 50;
        iam.users.forEach((user) => {
            newNodes.push({
                id: `user-${user.userName}`,
                type: 'resource',
                position: { x: 50, y: iamY },
                data: { label: user.userName, type: 'iam', icon: Users, subLabel: 'IAM User' },
            });
            iamY += 80;
        });

        return { nodes: newNodes, edges: newEdges };
    }, [s3, ec2, iam, rds, route53, elb]);

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
