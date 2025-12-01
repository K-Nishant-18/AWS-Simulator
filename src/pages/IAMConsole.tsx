import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { Users, UserPlus, Shield, Key, Lock, UserCheck, UsersRound, FileText, Plus, AlertTriangle } from 'lucide-react';

export const IAMConsole: React.FC = () => {
    const { iam, createUser, createGroup, attachPolicyToUser, addUserToGroup, deleteUser } = useSimulationStore();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] = useState(false);

    const [newUserName, setNewUserName] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedUserForPolicy, setSelectedUserForPolicy] = useState<string | null>(null);
    const [selectedUserForGroup, setSelectedUserForGroup] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState('');

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

    const openAddToGroupModal = (userName: string) => {
        setSelectedUserForGroup(userName);
        setSelectedGroup('');
        setIsAddToGroupModalOpen(true);
    };

    const handleAddToGroup = () => {
        if (selectedUserForGroup && selectedGroup) {
            addUserToGroup(selectedUserForGroup, selectedGroup);
            setIsAddToGroupModalOpen(false);
            setSelectedUserForGroup(null);
            setSelectedGroup('');
        }
    };

    // Calculate security recommendations
    const usersWithoutPolicies = iam.users.filter(u => u.policies.length === 0).length;
    const totalUsers = iam.users.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">IAM Dashboard</h1>
                    <p className="text-gray-600 mt-1">Identity and Access Management</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" icon={UsersRound} onClick={() => setIsGroupModalOpen(true)}>
                        Create Group
                    </Button>
                    <Button variant="primary" icon={UserPlus} onClick={() => setIsUserModalOpen(true)}>
                        Add User
                    </Button>
                </div>
            </div>

            {/* IAM Resources Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-3">
                        <Users className="text-blue-600" />
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Users</p>
                            <p className="text-2xl font-bold text-blue-900">{iam.users.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="flex items-center gap-3">
                        <UsersRound className="text-green-600" />
                        <div>
                            <p className="text-sm text-green-600 font-medium">User Groups</p>
                            <p className="text-2xl font-bold text-green-900">{iam.groups.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                    <div className="flex items-center gap-3">
                        <Shield className="text-purple-600" />
                        <div>
                            <p className="text-sm text-purple-600 font-medium">Roles</p>
                            <p className="text-2xl font-bold text-purple-900">{iam.roles?.length || 0}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-orange-50 border-orange-100">
                    <div className="flex items-center gap-3">
                        <FileText className="text-orange-600" />
                        <div>
                            <p className="text-sm text-orange-600 font-medium">Policies</p>
                            <p className="text-2xl font-bold text-orange-900">{iam.policies.length}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Security Recommendations */}
            {usersWithoutPolicies > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
                        <div>
                            <h3 className="font-semibold text-yellow-900 mb-1">Security Recommendation</h3>
                            <p className="text-sm text-yellow-800">
                                {usersWithoutPolicies} user{usersWithoutPolicies > 1 ? 's' : ''} {usersWithoutPolicies > 1 ? 'have' : 'has'} no permissions attached.
                                Consider attaching policies to grant necessary access.
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
                                    <th className="px-4 py-3">Created</th>
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
                                            {user.groups.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {user.groups.map(g => (
                                                        <span key={g} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
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
                                        <td className="px-4 py-3 text-gray-500 text-xs">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    icon={Shield}
                                                    onClick={() => openPolicyModal(user.userName)}
                                                >
                                                    Add Permissions
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    icon={UsersRound}
                                                    onClick={() => openAddToGroupModal(user.userName)}
                                                >
                                                    Add to Group
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Groups List */}
            <Card title="User Groups">
                {iam.groups.length === 0 ? (
                    <div className="text-center py-12">
                        <UsersRound size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">No groups found. Create your first group!</p>
                        <Button variant="primary" onClick={() => setIsGroupModalOpen(true)}>
                            Create Group
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Group Name</th>
                                    <th className="px-4 py-3">Members</th>
                                    <th className="px-4 py-3">Member Count</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {iam.groups.map((group) => {
                                    const members = iam.users.filter(u => u.groups.includes(group));
                                    return (
                                        <tr key={group} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-blue-600 flex items-center gap-2">
                                                <UsersRound size={16} />
                                                {group}
                                            </td>
                                            <td className="px-4 py-3">
                                                {members.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {members.slice(0, 3).map(m => (
                                                            <span key={m.userName} className="text-xs text-gray-600">
                                                                {m.userName}
                                                            </span>
                                                        )).reduce((prev, curr, i) => [prev, <span key={`sep-${i}`} className="text-gray-400">, </span>, curr] as any)}
                                                        {members.length > 3 && <span className="text-xs text-gray-500">+{members.length - 3} more</span>}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">No members</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{members.length}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Policies List */}
            <Card title="Policies">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3">Policy Name</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {iam.policies.map(policy => (
                                <tr key={policy.policyArn} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium flex items-center gap-2">
                                        <Lock size={14} className="text-gray-400" />
                                        {policy.policyName}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{policy.description}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                            AWS Managed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

            {/* Add to Group Modal */}
            <Modal
                isOpen={isAddToGroupModalOpen}
                onClose={() => setIsAddToGroupModalOpen(false)}
                title={`Add ${selectedUserForGroup} to Group`}
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddToGroupModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddToGroup} disabled={!selectedGroup}>
                            Add to Group
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Select a group to add this user to:</p>
                    {iam.groups.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <p className="text-gray-600 mb-3">No groups available. Create a group first.</p>
                            <Button variant="secondary" size="sm" onClick={() => {
                                setIsAddToGroupModalOpen(false);
                                setIsGroupModalOpen(true);
                            }}>
                                Create Group
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {iam.groups.map((group) => {
                                const user = iam.users.find(u => u.userName === selectedUserForGroup);
                                const alreadyMember = user?.groups.includes(group);

                                return (
                                    <label
                                        key={group}
                                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedGroup === group
                                                ? 'border-aws-orange bg-orange-50'
                                                : alreadyMember
                                                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="group"
                                            value={group}
                                            checked={selectedGroup === group}
                                            onChange={(e) => setSelectedGroup(e.target.value)}
                                            disabled={alreadyMember}
                                            className="mr-3 text-aws-orange focus:ring-aws-orange"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{group}</div>
                                            {alreadyMember && (
                                                <div className="text-xs text-gray-500">Already a member</div>
                                            )}
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            </Modal>

            {/* Attach Policy Modal */}
            <Modal
                isOpen={isPolicyModalOpen}
                onClose={() => setIsPolicyModalOpen(false)}
                title={`Add Permissions to ${selectedUserForPolicy}`}
                size="lg"
                footer={
                    <Button variant="ghost" onClick={() => setIsPolicyModalOpen(false)}>
                        Close
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
