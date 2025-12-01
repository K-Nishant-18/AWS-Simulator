import React, { useState } from 'react';
import { Database, Plus, Search, Trash2, RefreshCw } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';

export const RDSConsole: React.FC = () => {
    const { rds, createRDSInstance, deleteRDSInstance } = useSimulationStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [identifier, setIdentifier] = useState('');
    const [engine, setEngine] = useState<'mysql' | 'postgres'>('mysql');
    const [username, setUsername] = useState('admin');

    const handleCreate = () => {
        if (identifier && username) {
            createRDSInstance(identifier, engine, username);
            setIsCreateModalOpen(false);
            setIdentifier('');
            setUsername('admin');
        }
    };

    const filteredInstances = rds.instances.filter(instance =>
        instance.dbInstanceIdentifier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Databases</h1>
                    <p className="text-gray-600">Manage your relational database instances</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} icon={Plus}>
                    Create database
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Filter databases"
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

            {/* Instances Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">
                                    <Tooltip title="DB Identifier" content="The unique name for your database instance">DB identifier</Tooltip>
                                </th>
                                <th className="p-4">
                                    <Tooltip title="Status" content="The current status of the database (e.g., Available, Creating)">Status</Tooltip>
                                </th>
                                <th className="p-4">
                                    <Tooltip title="Engine" content="The database engine (MySQL, PostgreSQL, etc.)">Engine</Tooltip>
                                </th>
                                <th className="p-4">
                                    <Tooltip title="Instance Size" content="The compute and memory capacity of the instance">Size</Tooltip>
                                </th>
                                <th className="p-4">
                                    <Tooltip title="Endpoint" content="The connection endpoint for your application">Endpoint</Tooltip>
                                </th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredInstances.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Database size={48} className="text-gray-300 mb-4" />
                                            <p className="text-lg font-medium text-gray-900">No databases found</p>
                                            <p className="text-sm text-gray-500 mb-4">Launch a database instance to get started.</p>
                                            <Button onClick={() => setIsCreateModalOpen(true)} variant="secondary" size="sm">
                                                Create database
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredInstances.map((instance) => (
                                    <tr key={instance.dbInstanceIdentifier} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-aws-blue">
                                            <div className="flex items-center gap-2">
                                                <Database size={16} />
                                                {instance.dbInstanceIdentifier}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${instance.status === 'available' ? 'bg-green-100 text-green-800' :
                                                instance.status === 'creating' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {instance.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600">{instance.engine}</td>
                                        <td className="p-4 text-gray-600">{instance.instanceClass}</td>
                                        <td className="p-4 font-mono text-xs text-gray-600">
                                            {instance.endpoint}:{instance.port}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => deleteRDSInstance(instance.dbInstanceIdentifier)}
                                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                                                title="Delete Database"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create database"
                size="lg"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreate}>Create database</Button>
                    </div>
                }
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Database className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    You are creating a database in the <strong>US East (N. Virginia)</strong> region.
                                    This will be a <strong>Free Tier</strong> eligible instance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Engine Options</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 ${engine === 'mysql' ? 'border-aws-orange bg-orange-50 ring-1 ring-aws-orange' : 'hover:border-gray-400'}`}
                                onClick={() => setEngine('mysql')}
                            >
                                <img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" alt="MySQL" className="h-12 object-contain" />
                                <span className="font-medium">MySQL</span>
                            </div>
                            <div
                                className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 ${engine === 'postgres' ? 'border-aws-orange bg-orange-50 ring-1 ring-aws-orange' : 'hover:border-gray-400'}`}
                                onClick={() => setEngine('postgres')}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL" className="h-12 object-contain" />
                                <span className="font-medium">PostgreSQL</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Settings</h3>
                        <Input
                            label="DB Instance Identifier"
                            placeholder="database-1"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            helperText="Unique name for your database instance"
                        />
                        <Input
                            label="Master Username"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            helperText="Login name for the master user"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Master Password"
                                type="password"
                                placeholder="••••••••"
                                value="password"
                                disabled
                                helperText="Auto-generated for this lab"
                            />
                            <Input
                                label="Instance Class"
                                value="db.t3.micro"
                                disabled
                                helperText="Free tier eligible"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
