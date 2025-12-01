import React, { useState } from 'react';
import { Globe, Plus } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import type { DNSRecord } from '../types/aws';

interface Route53DashboardProps {
    onSelectZone?: (zoneId: string) => void;
}

export const Route53Dashboard: React.FC<Route53DashboardProps> = () => {
    const { route53, createHostedZone, createDNSRecord } = useSimulationStore();
    const [isCreateZoneModalOpen, setIsCreateZoneModalOpen] = useState(false);
    const [isCreateRecordModalOpen, setIsCreateRecordModalOpen] = useState(false);
    const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

    // Zone Form State
    const [domainName, setDomainName] = useState('');

    // Record Form State
    const [recordName, setRecordName] = useState('');
    const [recordType, setRecordType] = useState<DNSRecord['type']>('A');
    const [recordValue, setRecordValue] = useState('');

    const handleCreateZone = () => {
        if (domainName) {
            createHostedZone(domainName);
            setIsCreateZoneModalOpen(false);
            setDomainName('');
        }
    };

    const handleCreateRecord = () => {
        if (selectedZoneId && recordName && recordValue) {
            createDNSRecord(selectedZoneId, {
                name: recordName,
                type: recordType,
                value: recordValue
            });
            setIsCreateRecordModalOpen(false);
            setRecordName('');
            setRecordValue('');
        }
    };

    const filteredZones = route53.hostedZones;
    const selectedZone = route53.hostedZones.find(z => z.id === selectedZoneId);

    if (selectedZone) {
        // Zone Details View
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="secondary" onClick={() => setSelectedZoneId(null)}>← Back to Hosted Zones</Button>
                    <h2 className="text-xl font-bold">{selectedZone.name}</h2>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg">Records</h3>
                        <Button onClick={() => setIsCreateRecordModalOpen(true)} size="sm">Create record</Button>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Record Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Value/Route Traffic To</th>
                                <th className="p-4">TTL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {selectedZone.records.map((record, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{record.name}</td>
                                    <td className="p-4">{record.type}</td>
                                    <td className="p-4 font-mono text-sm">{record.value}</td>
                                    <td className="p-4">{record.ttl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Create Record Modal */}
                <Modal
                    isOpen={isCreateRecordModalOpen}
                    onClose={() => setIsCreateRecordModalOpen(false)}
                    title="Create Record"
                    footer={
                        <div className="flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setIsCreateRecordModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateRecord}>Create record</Button>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <Input
                            label="Record Name"
                            placeholder="www"
                            value={recordName}
                            onChange={(e) => setRecordName(e.target.value)}
                            helperText={`.${selectedZone?.name}`}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-aws-orange focus:border-aws-orange outline-none"
                                value={recordType}
                                onChange={(e) => setRecordType(e.target.value as DNSRecord['type'])}
                            >
                                <option value="A">A - Routes traffic to an IPv4 address</option>
                                <option value="CNAME">CNAME - Routes traffic to another domain name</option>
                                <option value="TXT">TXT - Text record</option>
                                <option value="MX">MX - Mail exchange record</option>
                            </select>
                        </div>
                        <Input
                            label="Value"
                            placeholder={recordType === 'A' ? '192.0.2.1' : 'example.com'}
                            value={recordValue}
                            onChange={(e) => setRecordValue(e.target.value)}
                            helperText="IP address or domain name depending on record type."
                        />
                    </div>
                </Modal>
            </div>
        );
    }

    // Hosted Zones List View
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Hosted Zones</h2>
                <Button onClick={() => setIsCreateZoneModalOpen(true)} variant="primary">
                    <Plus size={16} className="mr-2" />
                    Create Hosted Zone
                </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                <th className="p-4">Domain Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Record Count</th>
                                <th className="p-4">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredZones.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Globe size={48} className="text-gray-300 mb-4" />
                                            <p className="text-lg font-medium text-gray-900">No hosted zones</p>
                                            <Button onClick={() => setIsCreateZoneModalOpen(true)} variant="secondary" size="sm" className="mt-2">
                                                Create hosted zone
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredZones.map((zone) => (
                                    <tr
                                        key={zone.id}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => setSelectedZoneId(zone.id)}
                                    >
                                        <td className="p-4 font-medium text-aws-blue hover:underline">
                                            {zone.name}
                                        </td>
                                        <td className="p-4">Public</td>
                                        <td className="p-4">{zone.recordCount}</td>
                                        <td className="p-4 text-gray-500">-</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Zone Modal */}
            <Modal
                isOpen={isCreateZoneModalOpen}
                onClose={() => setIsCreateZoneModalOpen(false)}
                title="Create Hosted Zone"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsCreateZoneModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateZone}>Create hosted zone</Button>
                    </div>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        A hosted zone is a container for records, and records contain information about how you want to route traffic for a specific domain.
                    </p>
                    <Input
                        label="Domain Name"
                        placeholder="example.com"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                        helperText="The name of the domain you want to route traffic for."
                    />
                </div>
            </Modal>
        </div>
    );
};
