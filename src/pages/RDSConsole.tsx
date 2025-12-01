import React, { useState } from 'react';
import { Database, Plus, Search, Trash2, RefreshCw, Camera, Settings, Network, Copy, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';

import { Card } from '../components/Card';

export const RDSConsole: React.FC = () => {
    const { rds } = useSimulationStore();
    const [activeTab, setActiveTab] = useState<'databases' | 'snapshots' | 'parameter-groups' | 'subnet-groups'>('databases');
    const [isCreateDBModalOpen, setIsCreateDBModalOpen] = useState(false);
    const [isCreateSnapshotModalOpen, setIsCreateSnapshotModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDB, setSelectedDB] = useState<string | null>(null);

    // Form State for Database Creation
    const [dbIdentifier, setDbIdentifier] = useState('');
    const [engine, setEngine] = useState<'mysql' | 'postgres' | 'mariadb' | 'oracle' | 'sqlserver'>('mysql');
    const [instanceClass, setInstanceClass] = useState('db.t3.micro');
    const [username, setUsername] = useState('admin');
    const [allocatedStorage, setAllocatedStorage] = useState(20);
    const [multiAZ, setMultiAZ] = useState(false);
    const [publicAccess, setPublicAccess] = useState(false);

    // Form State for Snapshot
    const [snapshotIdentifier, setSnapshotIdentifier] = useState('');

    const handleCreateDatabase = () => {
        if (dbIdentifier && username) {
            // Call store action to create database
            const newDB = {
                dbInstanceIdentifier: dbIdentifier,
                engine,
                engineVersion: engine === 'mysql' ? '8.0.35' : engine === 'postgres' ? '15.4' : '10.6.14',
                instanceClass,
                status: 'creating' as const,
                masterUsername: username,
                endpoint: `${dbIdentifier}.${Math.random().toString(36).substr(2, 9)}.us-east-1.rds.amazonaws.com`,
                port: engine === 'mysql' || engine === 'mariadb' ? 3306 : engine === 'postgres' ? 5432 : engine === 'oracle' ? 1521 : 1433,
                securityGroups: ['sg-default'],
                allocatedStorage,
                multiAZ,
                publiclyAccessible: publicAccess,
                backupRetentionPeriod: 7,
                createdAt: new Date(),
                parameterGroup: `default.${engine}8.0`,
                subnetGroup: 'default'
            };

            // Simulate creating database
            useSimulationStore.setState((state) => ({
                rds: {
                    ...state.rds,
                    instances: [...state.rds.instances, newDB]
                }
            }));

            // Reset form
            setDbIdentifier('');
            setUsername('admin');
            setIsCreateDBModalOpen(false);

            // Simulate status change to available after 3 seconds
            setTimeout(() => {
                useSimulationStore.setState((state) => ({
                    rds: {
                        ...state.rds,
                        instances: state.rds.instances.map(db =>
                            db.dbInstanceIdentifier === newDB.dbInstanceIdentifier
                                ? { ...db, status: 'available' as const }
                                : db
                        )
                    }
                }));
            }, 3000);
        }
    };

    const handleCreateSnapshot = () => {
        if (snapshotIdentifier && selectedDB) {
            const sourceDB = rds.instances.find(db => db.dbInstanceIdentifier === selectedDB);
            if (sourceDB) {
                const newSnapshot = {
                    snapshotId: snapshotIdentifier,
                    dbInstanceIdentifier: selectedDB,
                    engine: sourceDB.engine,
                    status: 'creating' as const,
                    snapshotType: 'manual' as const,
                    createdAt: new Date(),
                    allocatedStorage: sourceDB.allocatedStorage
                };

                useSimulationStore.setState((state) => ({
                    rds: {
                        ...state.rds,
                        snapshots: [...state.rds.snapshots, newSnapshot]
                    }
                }));

                setSnapshotIdentifier('');
                setSelectedDB(null);
                setIsCreateSnapshotModalOpen(false);

                // Simulate completion
                setTimeout(() => {
                    useSimulationStore.setState((state) => ({
                        rds: {
                            ...state.rds,
                            snapshots: state.rds.snapshots.map(snap =>
                                snap.snapshotId === newSnapshot.snapshotId
                                    ? { ...snap, status: 'available' as const }
                                    : snap
                            )
                        }
                    }));
                }, 2000);
            }
        }
    };

    const handleDeleteDatabase = (identifier: string) => {
        useSimulationStore.setState((state) => ({
            rds: {
                ...state.rds,
                instances: state.rds.instances.filter(db => db.dbInstanceIdentifier !== identifier)
            }
        }));
    };

    const handleDeleteSnapshot = (snapshotId: string) => {
        useSimulationStore.setState((state) => ({
            rds: {
                ...state.rds,
                snapshots: state.rds.snapshots.filter(snap => snap.snapshotId !== snapshotId)
            }
        }));
    };

    const filteredDatabases = rds.instances.filter(db =>
        db.dbInstanceIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSnapshots = rds.snapshots.filter(snap =>
        snap.snapshotId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEngineIcon = (engine: string) => {
        const icons: Record<string, string> = {
            mysql: '🐬',
            postgres: '🐘',
            mariadb: '🦭',
            oracle: '🔶',
            sqlserver: '🪟'
        };
        return icons[engine] || '💾';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Amazon RDS</h1>
                    <p className="text-gray-600 mt-1">Managed Relational Database Service</p>
                </div>
                <Button onClick={() => setIsCreateDBModalOpen(true)} icon={Plus} variant="primary">
                    Create database
                </Button>
            </div>

            {/* Resource Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 border-blue-100">
                    <div className="flex items-center gap-3">
                        <Database className="text-blue-600" size={32} />
                        <div>
                            <p className="text-sm text-blue-600 font-medium">DB Instances</p>
                            <p className="text-2xl font-bold text-blue-900">{rds.instances.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-green-50 border-green-100">
                    <div className="flex items-center gap-3">
                        <Camera className="text-green-600" size={32} />
                        <div>
                            <p className="text-sm text-green-600 font-medium">Snapshots</p>
                            <p className="text-2xl font-bold text-green-900">{rds.snapshots.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-purple-50 border-purple-100">
                    <div className="flex items-center gap-3">
                        <Settings className="text-purple-600" size={32} />
                        <div>
                            <p className="text-sm text-purple-600 font-medium">Parameter Groups</p>
                            <p className="text-2xl font-bold text-purple-900">{rds.parameterGroups.length}</p>
                        </div>
                    </div>
                </Card>
                <Card className="bg-orange-50 border-orange-100">
                    <div className="flex items-center gap-3">
                        <Network className="text-orange-600" size={32} />
                        <div>
                            <p className="text-sm text-orange-600 font-medium">Subnet Groups</p>
                            <p className="text-2xl font-bold text-orange-900">{rds.subnetGroups.length}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-white rounded-t-lg">
                <nav className="flex overflow-x-auto no-scrollbar">
                    {[
                        { id: 'databases', label: 'Databases', icon: Database },
                        { id: 'snapshots', label: 'Snapshots', icon: Camera },
                        { id: 'parameter-groups', label: 'Parameter groups', icon: Settings },
                        { id: 'subnet-groups', label: 'Subnet groups', icon: Network }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all duration-200 flex items-center gap-2 ${isActive
                                    ? 'border-aws-orange text-aws-orange bg-orange-50/50'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-aws-orange' : 'text-gray-500'} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={`Filter ${activeTab.replace('-', ' ')}...`}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-aws-orange focus:border-transparent outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Button variant="secondary" icon={RefreshCw}>
                    Refresh
                </Button>
            </div>

            {/* Tab Content */}
            {activeTab === 'databases' && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {filteredDatabases.length === 0 ? (
                        <div className="p-12 text-center">
                            <Database size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No databases</h3>
                            <p className="text-gray-600 mb-6">Create a database instance to get started with Amazon RDS.</p>
                            <Button onClick={() => setIsCreateDBModalOpen(true)} variant="primary">
                                Create database
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                        <th className="p-4">DB identifier</th>
                                        <th className="p-4">Engine</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Size</th>
                                        <th className="p-4">Multi-AZ</th>
                                        <th className="p-4">Endpoint</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredDatabases.map((db) => (
                                        <tr key={db.dbInstanceIdentifier} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">{getEngineIcon(db.engine)}</span>
                                                    <span className="font-medium text-blue-600">{db.dbInstanceIdentifier}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600">
                                                <div>
                                                    <div className="font-medium">{db.engine}</div>
                                                    <div className="text-xs text-gray-500">{db.engineVersion}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${db.status === 'available' ? 'bg-green-100 text-green-800' :
                                                    db.status === 'creating' ? 'bg-blue-100 text-blue-800' :
                                                        db.status === 'backing-up' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {db.status === 'available' && <CheckCircle2 size={12} />}
                                                    {db.status === 'creating' && <Clock size={12} className="animate-spin" />}
                                                    {db.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{db.instanceClass}</td>
                                            <td className="p-4">
                                                {db.multiAZ ? (
                                                    <span className="text-green-600 font-medium">Yes</span>
                                                ) : (
                                                    <span className="text-gray-400">No</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                        {db.endpoint}:{db.port}
                                                    </code>
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(`${db.endpoint}:${db.port}`)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title="Copy endpoint"
                                                    >
                                                        <Copy size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        icon={Camera}
                                                        onClick={() => {
                                                            setSelectedDB(db.dbInstanceIdentifier);
                                                            setIsCreateSnapshotModalOpen(true);
                                                        }}
                                                    >
                                                        Snapshot
                                                    </Button>
                                                    <button
                                                        onClick={() => handleDeleteDatabase(db.dbInstanceIdentifier)}
                                                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'snapshots' && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {filteredSnapshots.length === 0 ? (
                        <div className="p-12 text-center">
                            <Camera size={64} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No snapshots</h3>
                            <p className="text-gray-600 mb-6">Create a snapshot of your database to backup your data.</p>
                            {rds.instances.length > 0 && (
                                <Button onClick={() => setIsCreateSnapshotModalOpen(true)} variant="secondary">
                                    Create snapshot
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                        <th className="p-4">Snapshot ID</th>
                                        <th className="p-4">DB Instance</th>
                                        <th className="p-4">Engine</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Created</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredSnapshots.map((snapshot) => (
                                        <tr key={snapshot.snapshotId} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-blue-600">{snapshot.snapshotId}</td>
                                            <td className="p-4 text-gray-600">{snapshot.dbInstanceIdentifier}</td>
                                            <td className="p-4 text-gray-600">{snapshot.engine}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${snapshot.snapshotType === 'manual' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {snapshot.snapshotType}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${snapshot.status === 'available' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {snapshot.status === 'available' && <CheckCircle2 size={12} />}
                                                    {snapshot.status === 'creating' && <Clock size={12} className="animate-spin" />}
                                                    {snapshot.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600 text-sm">
                                                {new Date(snapshot.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteSnapshot(snapshot.snapshotId)}
                                                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'parameter-groups' && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <Settings size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Parameter Groups</h3>
                        <p className="text-gray-600 mb-4">
                            Parameter groups contain engine configuration values that can be applied to one or more DB instances.
                        </p>
                        <div className="overflow-x-auto mt-6">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr className="text-xs uppercase text-gray-500 font-semibold">
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Family</th>
                                        <th className="p-4">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {rds.parameterGroups.map((group) => (
                                        <tr key={group.name} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-blue-600">{group.name}</td>
                                            <td className="p-4 text-gray-600">{group.family}</td>
                                            <td className="p-4 text-gray-600">{group.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'subnet-groups' && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-12 text-center">
                        <Network size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">DB Subnet Groups</h3>
                        <p className="text-gray-600 mb-4">
                            A DB subnet group is a collection of subnets that you create in a VPC and designate for your DB instances.
                        </p>
                        <div className="overflow-x-auto mt-6">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr className="text-xs uppercase text-gray-500 font-semibold">
                                        <th className="p-4">Name</th>
                                        <th className="p-4">VPC</th>
                                        <th className="p-4">Subnets</th>
                                        <th className="p-4">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {rds.subnetGroups.map((group) => (
                                        <tr key={group.name} className="hover:bg-gray-50">
                                            <td className="p-4 font-medium text-blue-600">{group.name}</td>
                                            <td className="p-4 text-gray-600">{group.vpcId}</td>
                                            <td className="p-4 text-gray-600">{group.subnets.length} subnets</td>
                                            <td className="p-4 text-gray-600">{group.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Database Modal */}
            <Modal
                isOpen={isCreateDBModalOpen}
                onClose={() => setIsCreateDBModalOpen(false)}
                title="Create database"
                size="lg"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreateDBModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateDatabase} disabled={!dbIdentifier || !username}>Create database</Button>
                    </div>
                }
            >
                <div className="space-y-6">
                    {/* Info Banner */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex">
                            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
                            <div className="ml-3 text-sm text-blue-700">
                                <p>Creating a database in <strong>US East (N. Virginia)</strong> region.</p>
                                <p className="mt-1">This configuration is <strong>Free Tier</strong> eligible.</p>
                            </div>
                        </div>
                    </div>

                    {/* Engine Selection */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Engine options</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'mysql', label: 'MySQL', icon: '🐬' },
                                { value: 'postgres', label: 'PostgreSQL', icon: '🐘' },
                                { value: 'mariadb', label: 'MariaDB', icon: '🦭' }
                            ].map((eng) => (
                                <button
                                    key={eng.value}
                                    onClick={() => setEngine(eng.value as any)}
                                    className={`border rounded-lg p-4 text-center transition-all ${engine === eng.value
                                        ? 'border-aws-orange bg-orange-50 ring-2 ring-aws-orange'
                                        : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{eng.icon}</div>
                                    <div className="font-medium text-sm">{eng.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Settings</h3>
                        <Input
                            label="DB instance identifier"
                            placeholder="database-1"
                            value={dbIdentifier}
                            onChange={(e) => setDbIdentifier(e.target.value)}
                            helperText="Must be unique across all DB instances in your AWS account"
                        />
                        <Input
                            label="Master username"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Instance Configuration */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Instance configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">DB instance class</label>
                                <select
                                    value={instanceClass}
                                    onChange={(e) => setInstanceClass(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                                >
                                    <option value="db.t3.micro">db.t3.micro (Free tier)</option>
                                    <option value="db.t3.small">db.t3.small</option>
                                    <option value="db.t3.medium">db.t3.medium</option>
                                </select>
                            </div>
                            <Input
                                label="Allocated storage (GB)"
                                type="number"
                                value={allocatedStorage.toString()}
                                onChange={(e) => setAllocatedStorage(parseInt(e.target.value) || 20)}
                                helperText="20 GB minimum"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Availability & durability</h3>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="checkbox"
                                checked={multiAZ}
                                onChange={(e) => setMultiAZ(e.target.checked)}
                                className="rounded text-aws-orange focus:ring-aws-orange"
                            />
                            <div>
                                <div className="font-medium text-sm">Multi-AZ deployment</div>
                                <div className="text-xs text-gray-500">Creates a standby in a different Availability Zone</div>
                            </div>
                        </label>
                    </div>

                    {/* Connectivity */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Connectivity</h3>
                        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="checkbox"
                                checked={publicAccess}
                                onChange={(e) => setPublicAccess(e.target.checked)}
                                className="rounded text-aws-orange focus:ring-aws-orange"
                            />
                            <div>
                                <div className="font-medium text-sm">Public access</div>
                                <div className="text-xs text-gray-500">Allow connections from outside the VPC</div>
                            </div>
                        </label>
                    </div>
                </div>
            </Modal>

            {/* Create Snapshot Modal */}
            <Modal
                isOpen={isCreateSnapshotModalOpen}
                onClose={() => setIsCreateSnapshotModalOpen(false)}
                title="Create DB snapshot"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreateSnapshotModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateSnapshot} disabled={!snapshotIdentifier || !selectedDB}>
                            Create snapshot
                        </Button>
                    </div>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">DB instance</label>
                        <select
                            value={selectedDB || ''}
                            onChange={(e) => setSelectedDB(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                        >
                            <option value="">Select a database...</option>
                            {rds.instances.filter(db => db.status === 'available').map((db) => (
                                <option key={db.dbInstanceIdentifier} value={db.dbInstanceIdentifier}>
                                    {db.dbInstanceIdentifier} ({db.engine})
                                </option>
                            ))}
                        </select>
                    </div>
                    <Input
                        label="Snapshot identifier"
                        placeholder="my-snapshot-1"
                        value={snapshotIdentifier}
                        onChange={(e) => setSnapshotIdentifier(e.target.value)}
                        helperText="Must be unique across all snapshots"
                    />
                </div>
            </Modal>
        </div>
    );
};
