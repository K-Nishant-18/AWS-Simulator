import React, { useState } from 'react';
import { Network, Plus, Server } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { ELBLabGuide } from './ELBLabGuide';
import { ELBHelp } from './ELBHelp';


export const ELBConsole: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'lab' | 'help'>('dashboard');
    const [isCreateLBModalOpen, setIsCreateLBModalOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-600 p-2 rounded-lg">
                        <Network className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Load Balancers</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('lab')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'lab' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Lab Guide
                    </button>
                    <button
                        onClick={() => setActiveTab('help')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'help' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        Help & Tips
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    {activeTab === 'dashboard' && (
                        <ELBDashboardContent
                            isCreateLBModalOpen={isCreateLBModalOpen}
                            setIsCreateLBModalOpen={setIsCreateLBModalOpen}
                        />
                    )}

                    {activeTab === 'lab' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <ELBLabGuide />
                        </div>
                    )}

                    {activeTab === 'help' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <ELBHelp />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Sub-component for the dashboard content to keep the main component clean
const ELBDashboardContent = ({ isCreateLBModalOpen, setIsCreateLBModalOpen }: { isCreateLBModalOpen: boolean, setIsCreateLBModalOpen: (v: boolean) => void }) => {
    const { elb, ec2, createLoadBalancer, createTargetGroup, registerTargets } = useSimulationStore();

    // Form State
    const [lbName, setLbName] = useState('');
    const [tgName, setTgName] = useState('');
    const [selectedInstances, setSelectedInstances] = useState<string[]>([]);

    const handleCreate = () => {
        if (lbName && tgName && selectedInstances.length > 0) {
            // 1. Create Target Group
            const tgArn = createTargetGroup(tgName, 'HTTP', 80);

            // 2. Register Targets
            registerTargets(tgArn, selectedInstances);

            // 3. Create Load Balancer
            createLoadBalancer(lbName, tgArn);

            setIsCreateLBModalOpen(false);
            setLbName('');
            setTgName('');
            setSelectedInstances([]);
        }
    };

    const toggleInstanceSelection = (instanceId: string) => {
        if (selectedInstances.includes(instanceId)) {
            setSelectedInstances(selectedInstances.filter(id => id !== instanceId));
        } else {
            setSelectedInstances([...selectedInstances, instanceId]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Load Balancers</h2>
                <Button onClick={() => setIsCreateLBModalOpen(true)} icon={Plus}>
                    Create load balancer
                </Button>
            </div>

            {/* Load Balancers List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Name</th>
                                <th className="p-4">DNS Name</th>
                                <th className="p-4">State</th>
                                <th className="p-4">VPC ID</th>
                                <th className="p-4">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {elb.loadBalancers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Network size={48} className="text-gray-300 mb-4" />
                                            <p className="text-lg font-medium text-gray-900">No load balancers found</p>
                                            <Button onClick={() => setIsCreateLBModalOpen(true)} variant="secondary" size="sm" className="mt-2">
                                                Create load balancer
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                elb.loadBalancers.map((lb) => (
                                    <tr key={lb.arn} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-aws-blue">{lb.name}</td>
                                        <td className="p-4 font-mono text-xs">{lb.dnsName}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {lb.state}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">{lb.vpcId}</td>
                                        <td className="p-4">application</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Target Groups List */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Target Groups</h2>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Name</th>
                                <th className="p-4">Protocol</th>
                                <th className="p-4">Port</th>
                                <th className="p-4">Targets</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {elb.targetGroups.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        No target groups found
                                    </td>
                                </tr>
                            ) : (
                                elb.targetGroups.map((tg) => (
                                    <tr key={tg.arn} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-aws-blue">{tg.name}</td>
                                        <td className="p-4">{tg.protocol}</td>
                                        <td className="p-4">{tg.port}</td>
                                        <td className="p-4">{tg.targets.length} instances</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Wizard Modal */}
            <Modal
                isOpen={isCreateLBModalOpen}
                onClose={() => setIsCreateLBModalOpen(false)}
                title="Create Application Load Balancer"
                size="lg"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreateLBModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreate}>Create load balancer</Button>
                    </div>
                }
            >
                <div className="space-y-6">
                    {/* Step 1: Basic Config */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">1. Basic Configuration</h3>
                        <Input
                            label="Load Balancer Name"
                            placeholder="my-alb"
                            value={lbName}
                            onChange={(e) => setLbName(e.target.value)}
                        />
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                            Scheme: <strong>Internet-facing</strong><br />
                            IP address type: <strong>IPv4</strong>
                        </div>
                    </div>

                    {/* Step 2: Listeners and Routing */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">2. Listeners and Routing</h3>
                        <p className="text-sm text-gray-600">
                            Your Load Balancer listens on: <strong>HTTP:80</strong>
                        </p>
                        <Input
                            label="Target Group Name"
                            placeholder="my-targets"
                            value={tgName}
                            onChange={(e) => setTgName(e.target.value)}
                            helperText="Creates a new target group to route traffic to."
                        />
                    </div>

                    {/* Step 3: Register Targets */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">3. Register Targets</h3>
                        <p className="text-sm text-gray-600 mb-2">Select instances to include in the target group:</p>

                        {ec2.instances.length === 0 ? (
                            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                                No running instances found. Please launch an EC2 instance first.
                            </div>
                        ) : (
                            <div className="border rounded-md divide-y">
                                {ec2.instances.map(instance => (
                                    <div
                                        key={instance.instanceId}
                                        className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${selectedInstances.includes(instance.instanceId) ? 'bg-blue-50' : ''}`}
                                        onClick={() => toggleInstanceSelection(instance.instanceId)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedInstances.includes(instance.instanceId)}
                                            onChange={() => { }}
                                            className="h-4 w-4 text-aws-orange focus:ring-aws-orange border-gray-300 rounded"
                                        />
                                        <Server size={16} className="text-gray-500" />
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{instance.instanceId}</div>
                                            <div className="text-xs text-gray-500">{instance.instanceType} • {instance.state}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
