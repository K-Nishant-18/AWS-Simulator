import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { Server, Play, Square, Shield, Activity } from 'lucide-react';

export const EC2Console: React.FC = () => {
    const { ec2, launchInstance, terminateInstance, createSecurityGroup } = useSimulationStore();
    const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
    const [isSgModalOpen, setIsSgModalOpen] = useState(false);

    // Launch Wizard State
    const [selectedAmi, setSelectedAmi] = useState('ami-amazon-linux-2');
    const [selectedType, setSelectedType] = useState('t2.micro');
    const [selectedSg, setSelectedSg] = useState('sg-default');

    // SG Modal State
    const [newSgName, setNewSgName] = useState('');
    const [newSgDesc, setNewSgDesc] = useState('');

    const handleLaunchInstance = () => {
        launchInstance(selectedType, selectedAmi, [selectedSg]);
        setIsLaunchModalOpen(false);
    };

    const [allowHttp, setAllowHttp] = useState(false);

    const handleCreateSg = () => {
        if (newSgName.trim()) {
            const newGroupId = createSecurityGroup(newSgName, newSgDesc);

            // If HTTP allowed, use the returned ID to add the rule
            if (allowHttp) {
                // We need to access the store directly to call addInboundRule because 
                // the hook's addInboundRule might be bound to stale state if we were using it differently,
                // but here we are just calling the function. 
                // However, since we are inside the component, we can just use the function from the hook.
                // But wait, we need to make sure we are calling the function that updates the store.
                // The function from useSimulationStore() is fine.
                useSimulationStore.getState().addInboundRule(newGroupId, 'tcp', 80, '0.0.0.0/0');
            }

            setNewSgName('');
            setNewSgDesc('');
            setAllowHttp(false);
            setIsSgModalOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">EC2 Dashboard</h1>
                    <p className="text-gray-600 mt-1">Virtual Servers in the Cloud</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={Shield} onClick={() => setIsSgModalOpen(true)}>
                        Security Groups
                    </Button>
                    <Button variant="primary" icon={Play} onClick={() => setIsLaunchModalOpen(true)}>
                        Launch Instance
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-3">
                        <Activity className="text-blue-600" />
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Running Instances</p>
                            <p className="text-2xl font-bold text-blue-900">
                                {ec2.instances.filter(i => i.state === 'running').length}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="flex items-center gap-3">
                        <Shield className="text-green-600" />
                        <div>
                            <p className="text-sm text-green-600 font-medium">Security Groups</p>
                            <p className="text-2xl font-bold text-green-900">
                                {ec2.securityGroups.length}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                    <div className="flex items-center gap-3">
                        <Server className="text-purple-600" />
                        <div>
                            <p className="text-sm text-purple-600 font-medium">Total Instances</p>
                            <p className="text-2xl font-bold text-purple-900">
                                {ec2.instances.length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Instances List */}
            <Card title="Instances">
                {ec2.instances.length === 0 ? (
                    <div className="text-center py-12">
                        <Server size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">No instances running. Launch your first virtual server!</p>
                        <Button variant="primary" onClick={() => setIsLaunchModalOpen(true)}>
                            Launch Instance
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">
                                        <Tooltip title="Instance ID" content="Unique identifier for your virtual server">
                                            Name / ID
                                        </Tooltip>
                                    </th>
                                    <th className="px-4 py-3">State</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">
                                        <Tooltip title="Public IP" content="Internet-reachable IP address">
                                            Public IP
                                        </Tooltip>
                                    </th>
                                    <th className="px-4 py-3">Security Groups</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ec2.instances.map((inst) => (
                                    <tr key={inst.instanceId} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-blue-600">{inst.instanceId}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${inst.state === 'running' ? 'bg-green-100 text-green-800' :
                                                inst.state === 'terminated' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {inst.state}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{inst.instanceType}</td>
                                        <td className="px-4 py-3 font-mono text-xs">{inst.publicIp || '-'}</td>
                                        <td className="px-4 py-3">{inst.securityGroups.join(', ')}</td>
                                        <td className="px-4 py-3">
                                            {inst.state === 'running' && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    icon={Square}
                                                    onClick={() => terminateInstance(inst.instanceId)}
                                                >
                                                    Terminate
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Launch Instance Modal */}
            <Modal
                isOpen={isLaunchModalOpen}
                onClose={() => setIsLaunchModalOpen(false)}
                title="Launch an Instance"
                size="lg"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsLaunchModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleLaunchInstance}>
                            Launch Instance
                        </Button>
                    </>
                }
            >
                <div className="space-y-6">
                    {/* AMI Selection */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">1. Choose an Amazon Machine Image (AMI)</h3>
                        <div className="space-y-2">
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-aws-orange has-[:checked]:bg-orange-50">
                                <input
                                    type="radio"
                                    name="ami"
                                    value="ami-amazon-linux-2"
                                    checked={selectedAmi === 'ami-amazon-linux-2'}
                                    onChange={(e) => setSelectedAmi(e.target.value)}
                                    className="mr-3 text-aws-orange focus:ring-aws-orange"
                                />
                                <div>
                                    <div className="font-medium">Amazon Linux 2 AMI (HVM)</div>
                                    <div className="text-sm text-gray-500">Free tier eligible</div>
                                </div>
                            </label>
                            <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-aws-orange has-[:checked]:bg-orange-50">
                                <input
                                    type="radio"
                                    name="ami"
                                    value="ami-ubuntu-20.04"
                                    checked={selectedAmi === 'ami-ubuntu-20.04'}
                                    onChange={(e) => setSelectedAmi(e.target.value)}
                                    className="mr-3 text-aws-orange focus:ring-aws-orange"
                                />
                                <div>
                                    <div className="font-medium">Ubuntu Server 20.04 LTS</div>
                                    <div className="text-sm text-gray-500">Free tier eligible</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Instance Type Selection */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">2. Choose Instance Type</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-2">Select</th>
                                        <th className="px-4 py-2">Type</th>
                                        <th className="px-4 py-2">vCPU</th>
                                        <th className="px-4 py-2">Memory (GiB)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="t2.micro"
                                                checked={selectedType === 't2.micro'}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="text-aws-orange focus:ring-aws-orange"
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-medium">t2.micro</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">1</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="t2.small"
                                                checked={selectedType === 't2.small'}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="text-aws-orange focus:ring-aws-orange"
                                            />
                                        </td>
                                        <td className="px-4 py-2 font-medium">t2.small</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Security Group Selection */}
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">3. Configure Security Group</h3>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
                            value={selectedSg}
                            onChange={(e) => setSelectedSg(e.target.value)}
                        >
                            {ec2.securityGroups.map(sg => (
                                <option key={sg.groupId} value={sg.groupId}>
                                    {sg.groupName} - {sg.description}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal>

            {/* Create Security Group Modal */}
            <Modal
                isOpen={isSgModalOpen}
                onClose={() => setIsSgModalOpen(false)}
                title="Create Security Group"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsSgModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCreateSg}>
                            Create
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Security Group Name"
                        placeholder="my-web-sg"
                        value={newSgName}
                        onChange={(e) => setNewSgName(e.target.value)}
                    />
                    <Input
                        label="Description"
                        placeholder="Allow HTTP traffic"
                        value={newSgDesc}
                        onChange={(e) => setNewSgDesc(e.target.value)}
                    />
                    <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                            type="checkbox"
                            checked={allowHttp}
                            onChange={(e) => setAllowHttp(e.target.checked)}
                            className="rounded text-aws-orange focus:ring-aws-orange"
                        />
                        <span className="text-sm text-gray-700">Allow HTTP traffic (Port 80) from anywhere</span>
                    </label>
                </div>
            </Modal>
        </div>
    );
};
