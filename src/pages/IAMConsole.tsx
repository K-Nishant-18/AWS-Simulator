import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { Users, UserPlus, Shield, Key, Lock, UserCheck } from 'lucide-react';

export const IAMConsole: React.FC = () => {
    const { iam, createUser, createGroup, attachPolicyToUser } = useSimulationStore();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

    const [newUserName, setNewUserName] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedUserForPolicy, setSelectedUserForPolicy] = useState<string | null>(null);

    const handleCreateUser = () => {
        if (newUserName.trim()) {
            createUser(newUserName);
            setNewUserName('');
            setIsUserModalOpen(false);
        }
    };

    const handleCreateGroup = () => {
        if (newGroupName.trim()) {
            createGroup(newGroupName);
            setNewGroupName('');
            setIsGroupModalOpen(false);
        }
    };

    const handleAttachPolicy = (policyArn: string) => {
        if (selectedUserForPolicy) {
            attachPolicyToUser(selectedUserForPolicy, policyArn);
            setIsPolicyModalOpen(false);
            setSelectedUserForPolicy(null);
        }
    };

    const openPolicyModal = (userName: string) => {
        setSelectedUserForPolicy(userName);
        setIsPolicyModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">IAM Dashboard</h1>
                    <p className="text-gray-600 mt-1">Identity and Access Management</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={Users} onClick={() => setIsGroupModalOpen(true)}>
                        Create Group
                    </Button>
                    <Button variant="primary" icon={UserPlus} onClick={() => setIsUserModalOpen(true)}>
                        Add User
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-3">
                        <Users className="text-blue-600" />
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Users</p>
                            <p className="text-2xl font-bold text-blue-900">
                                {iam.users.length}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="flex items-center gap-3">
                        <Users className="text-green-600" />
                        <div>
                            <p className="text-sm text-green-600 font-medium">User Groups</p>
                            <p className="text-2xl font-bold text-green-900">
                                {iam.groups.length}
                            </p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                    <div className="flex items-center gap-3">
                        <Shield className="text-purple-600" />
                        <div>
                            <p className="text-sm text-purple-600 font-medium">Policies</p>
                            <p className="text-2xl font-bold text-purple-900">
                                {iam.policies.length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Users List */}
            <Card title="Users">
                {iam.users.length === 0 ? (
                    <div className="text-center py-12">
                        <Users size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">No users found. Create your first IAM user!</p>
                        <Button variant="primary" onClick={() => setIsUserModalOpen(true)}>
                            Add User
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">
                                        <Tooltip title="User Name" content="Unique identifier for the IAM user">
                                            User Name
                                        </Tooltip>
                                    </th>
                                    <th className="px-4 py-3">
                                        <Tooltip title="Groups" content="IAM groups this user belongs to">
                                            Groups
                                        </Tooltip>
                                    </th>
                                    <th className="px-4 py-3">
                                        <Tooltip title="Attached Policies" content="Permissions granted to this user">
                                            Attached Policies
                                        </Tooltip>
                                    </th>
                                    <th className="px-4 py-3">Access Key Age</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {iam.users.map((user) => (
                                    <tr key={user.userId} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-blue-600 flex items-center gap-2">
                                            <UserCheck size={16} />
                                            {user.userName}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.groups.length > 0 ? user.groups.join(', ') : <span className="text-gray-400">-</span>}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user.policies.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {user.policies.map(p => {
                                                        const policyName = iam.policies.find(pol => pol.policyArn === p)?.policyName || p;
                                                        return (
                                                            <span key={p} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                                                {policyName}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <span className="text-yellow-600 text-xs bg-yellow-50 px-2 py-1 rounded">No permissions</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">Today</td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                icon={Shield}
                                                onClick={() => openPolicyModal(user.userName)}
                                            >
                                                Add Permissions
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Create User Modal */}
            <Modal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                title="Add User"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsUserModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCreateUser}>
                            Create User
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="User name"
                        placeholder="jdoe"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        helperText="User names can contain alphanumeric characters and underscores."
                    />
                    <div className="bg-blue-50 p-3 rounded-lg flex gap-3">
                        <Key className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium">Access Type</p>
                            <p>Programmatic access (Access key ID and secret access key) will be generated automatically.</p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Create Group Modal */}
            <Modal
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                title="Create Group"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsGroupModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCreateGroup}>
                            Create Group
                        </Button>
                    </>
                }
            >
                <Input
                    label="Group name"
                    placeholder="Developers"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
            </Modal>

            {/* Attach Policy Modal */}
            <Modal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
                title={`Add Permissions to ${selectedUserForPolicy}`}
                size="lg"
                footer={
                    <Button variant="ghost" onClick={() => setIsPolicyModalOpen(false)}>
                        Cancel
                    </Button>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Attach an existing policy directly to this user.</p>
                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-2">Policy Name</th>
                                    <th className="px-4 py-2">Description</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {iam.policies.map(policy => (
                                    <tr key={policy.policyArn} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                                            <Lock size={14} className="text-gray-400" />
                                            {policy.policyName}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{policy.description}</td>
                                        <td className="px-4 py-3">
                                            <Button
                                                size="sm"
                                                onClick={() => handleAttachPolicy(policy.policyArn)}
                                                disabled={iam.users.find(u => u.userName === selectedUserForPolicy)?.policies.includes(policy.policyArn)}
                                            >
                                                {iam.users.find(u => u.userName === selectedUserForPolicy)?.policies.includes(policy.policyArn) ? 'Attached' : 'Attach'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
