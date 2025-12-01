import React, { useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Tooltip } from '../components/Tooltip';
import { FolderPlus, Upload, Trash2, Globe } from 'lucide-react';

export const S3Console: React.FC = () => {
    const { s3, createBucket, deleteBucket, uploadObject, setBucketPublicAccess, enableStaticWebsite } = useSimulationStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
    const [newBucketName, setNewBucketName] = useState('');
    const [uploadKey, setUploadKey] = useState('');
    const [uploadContent, setUploadContent] = useState('');

    const handleCreateBucket = () => {
        if (newBucketName.trim()) {
            createBucket(newBucketName, 'us-east-1');
            setNewBucketName('');
            setIsCreateModalOpen(false);
        }
    };

    const handleUploadObject = () => {
        if (selectedBucket && uploadKey.trim() && uploadContent.trim()) {
            uploadObject(selectedBucket, uploadKey, uploadContent, 'text/html');
            setUploadKey('');
            setUploadContent('');
            setIsUploadModalOpen(false);
        }
    };

    const bucket = selectedBucket ? s3.buckets.find(b => b.name === selectedBucket) : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Amazon S3</h1>
                    <p className="text-gray-600 mt-1">Scalable storage in the cloud</p>
                </div>
                <Button variant="primary" icon={FolderPlus} onClick={() => setIsCreateModalOpen(true)}>
                    Create Bucket
                </Button>
            </div>

            {/* Buckets List */}
            {!selectedBucket ? (
                <Card title="Buckets">
                    {s3.buckets.length === 0 ? (
                        <div className="text-center py-12">
                            <FolderPlus size={48} className="mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-4">No buckets yet. Create your first bucket to get started!</p>
                            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                                Create Bucket
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2 overflow-x-auto">
                            {s3.buckets.map((bucket) => (
                                <div
                                    key={bucket.name}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer min-w-[500px]"
                                    onClick={() => setSelectedBucket(bucket.name)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <Tooltip
                                                title="S3 Bucket"
                                                content="A container for objects stored in Amazon S3. You can store any number of objects in a bucket."
                                                cliExample="aws s3 mb s3://my-bucket"
                                            >
                                                <h3 className="font-semibold text-gray-900">{bucket.name}</h3>
                                            </Tooltip>
                                            {bucket.publicAccess && (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Public</span>
                                            )}
                                            {bucket.staticWebsiteHosting && (
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded flex items-center gap-1">
                                                    <Globe size={12} /> Website
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {bucket.region} • {bucket.objects.length} objects • Created {bucket.createdAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        icon={Trash2}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteBucket(bucket.name);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            ) : (
                <>
                    {/* Bucket Detail View */}
                    <div className="flex items-center gap-4 mb-4">
                        <Button variant="ghost" onClick={() => setSelectedBucket(null)}>
                            ← Back to Buckets
                        </Button>
                        <h2 className="text-xl font-semibold">{bucket?.name}</h2>
                    </div>

                    {/* Bucket Actions */}
                    <Card title="Bucket Settings">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Tooltip
                                        title="Public Access"
                                        content="Allow public read access to all objects in this bucket. Required for static website hosting."
                                        cliExample="aws s3api put-bucket-acl --bucket my-bucket --acl public-read"
                                    >
                                        <h4 className="font-medium">Public Access</h4>
                                    </Tooltip>
                                    <p className="text-sm text-gray-600">Allow public read access</p>
                                </div>
                                <Button
                                    variant={bucket?.publicAccess ? 'danger' : 'primary'}
                                    size="sm"
                                    onClick={() => setBucketPublicAccess(selectedBucket, !bucket?.publicAccess)}
                                >
                                    {bucket?.publicAccess ? 'Disable' : 'Enable'}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <Tooltip
                                        title="Static Website Hosting"
                                        content="Host a static website directly from your S3 bucket. Perfect for HTML, CSS, and JavaScript files."
                                        cliExample="aws s3 website s3://my-bucket/ --index-document index.html"
                                    >
                                        <h4 className="font-medium">Static Website Hosting</h4>
                                    </Tooltip>
                                    <p className="text-sm text-gray-600">Serve static web content</p>
                                </div>
                                <Button
                                    variant={bucket?.staticWebsiteHosting ? 'secondary' : 'primary'}
                                    size="sm"
                                    onClick={() => enableStaticWebsite(selectedBucket)}
                                    disabled={bucket?.staticWebsiteHosting}
                                >
                                    {bucket?.staticWebsiteHosting ? 'Enabled' : 'Enable'}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Objects */}
                    <Card
                        title="Objects"
                        actions={
                            <Button variant="primary" size="sm" icon={Upload} onClick={() => setIsUploadModalOpen(true)}>
                                Upload
                            </Button>
                        }
                    >
                        {bucket?.objects.length === 0 ? (
                            <div className="text-center py-8">
                                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-4">No objects in this bucket</p>
                                <Button variant="primary" onClick={() => setIsUploadModalOpen(true)}>
                                    Upload Object
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {bucket?.objects.map((obj) => (
                                    <div key={obj.key} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                                        <div>
                                            <p className="font-medium">{obj.key}</p>
                                            <p className="text-sm text-gray-500">
                                                {obj.size} bytes • {obj.contentType} • {obj.lastModified.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>

                    {bucket?.staticWebsiteHosting && bucket?.publicAccess && (
                        <Card title="Website Endpoint">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-gray-700 mb-2">Your website is now live at:</p>
                                <code className="block bg-white px-3 py-2 rounded border border-blue-300 text-blue-700">
                                    http://{bucket.name}.s3-website-{bucket.region}.amazonaws.com
                                </code>
                            </div>
                        </Card>
                    )}
                </>
            )}

            {/* Create Bucket Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Bucket"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCreateBucket}>
                            Create
                        </Button>
                    </>
                }
            >
                <Input
                    label="Bucket Name"
                    placeholder="my-unique-bucket-name"
                    value={newBucketName}
                    onChange={(e) => setNewBucketName(e.target.value)}
                    helperText="Bucket names must be globally unique and lowercase"
                />
            </Modal>

            {/* Upload Object Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="Upload Object"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsUploadModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUploadObject}>
                            Upload
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label="Object Key (filename)"
                        placeholder="index.html"
                        value={uploadKey}
                        onChange={(e) => setUploadKey(e.target.value)}
                        helperText="The name/path of the object in the bucket"
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aws-orange"
                            rows={10}
                            placeholder="<html>...</html>"
                            value={uploadContent}
                            onChange={(e) => setUploadContent(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
