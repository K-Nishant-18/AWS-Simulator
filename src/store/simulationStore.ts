import { create } from 'zustand';
import type { SimulationState, S3Bucket, EC2Instance, SecurityGroup, IAMUser } from '../types/aws';

interface SimulationStore extends SimulationState {
    // S3 Actions
    createBucket: (name: string, region: string) => void;
    deleteBucket: (name: string) => void;
    uploadObject: (bucketName: string, key: string, content: string, contentType: string) => void;
    deleteObject: (bucketName: string, key: string) => void;
    setBucketPublicAccess: (bucketName: string, isPublic: boolean) => void;
    enableStaticWebsite: (bucketName: string) => void;

    // EC2 Actions
    launchInstance: (instanceType: string, ami: string, securityGroups: string[]) => void;
    terminateInstance: (instanceId: string) => void;
    createSecurityGroup: (groupName: string, description: string) => void;
    addInboundRule: (groupId: string, protocol: string, port: number, source: string) => void;

    // IAM Actions
    createUser: (userName: string) => void;
    deleteUser: (userName: string) => void;
    createGroup: (groupName: string) => void;
    addUserToGroup: (userName: string, groupName: string) => void;
    attachPolicyToUser: (userName: string, policyArn: string) => void;

    // Utility
    reset: () => void;
    exportState: () => string;
}

const initialState: SimulationState = {
    s3: {
        buckets: [],
    },
    ec2: {
        instances: [],
        securityGroups: [
            {
                groupId: 'sg-default',
                groupName: 'default',
                description: 'Default security group',
                vpcId: 'vpc-default',
                inboundRules: [],
                outboundRules: [
                    { protocol: 'all', port: 'all', source: '0.0.0.0/0' }
                ],
            }
        ],
    },
    iam: {
        users: [],
        groups: [],
        policies: [
            {
                policyName: 'AdministratorAccess',
                policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
                description: 'Provides full access to AWS services and resources.',
                document: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: '*', Resource: '*' }] }
            },
            {
                policyName: 'ReadOnlyAccess',
                policyArn: 'arn:aws:iam::aws:policy/ReadOnlyAccess',
                description: 'Provides read-only access to AWS services and resources.',
                document: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: ["s3:Get*", "s3:List*", "ec2:Describe*"], Resource: '*' }] }
            }
        ],
    },
    vpc: {
        vpcs: [],
    },
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
    ...initialState,

    // S3 Actions
    createBucket: (name: string, region: string) => {
        const bucket: S3Bucket = {
            name,
            region,
            createdAt: new Date(),
            publicAccess: false,
            staticWebsiteHosting: false,
            objects: [],
        };
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: [...state.s3.buckets, bucket],
            },
        }));
    },

    deleteBucket: (name: string) => {
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: state.s3.buckets.filter((b) => b.name !== name),
            },
        }));
    },

    uploadObject: (bucketName: string, key: string, content: string, contentType: string) => {
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: state.s3.buckets.map((bucket) =>
                    bucket.name === bucketName
                        ? {
                            ...bucket,
                            objects: [
                                ...bucket.objects,
                                {
                                    key,
                                    size: content.length,
                                    lastModified: new Date(),
                                    contentType,
                                    content,
                                },
                            ],
                        }
                        : bucket
                ),
            },
        }));
    },

    deleteObject: (bucketName: string, key: string) => {
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: state.s3.buckets.map((bucket) =>
                    bucket.name === bucketName
                        ? {
                            ...bucket,
                            objects: bucket.objects.filter((obj) => obj.key !== key),
                        }
                        : bucket
                ),
            },
        }));
    },

    setBucketPublicAccess: (bucketName: string, isPublic: boolean) => {
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: state.s3.buckets.map((bucket) =>
                    bucket.name === bucketName ? { ...bucket, publicAccess: isPublic } : bucket
                ),
            },
        }));
    },

    enableStaticWebsite: (bucketName: string) => {
        set((state) => ({
            s3: {
                ...state.s3,
                buckets: state.s3.buckets.map((bucket) =>
                    bucket.name === bucketName ? { ...bucket, staticWebsiteHosting: true } : bucket
                ),
            },
        }));
    },

    // EC2 Actions
    launchInstance: (instanceType: string, ami: string, securityGroups: string[]) => {
        const instance: EC2Instance = {
            instanceId: `i-${Math.random().toString(36).substr(2, 9)}`,
            instanceType,
            state: 'running',
            ami,
            publicIp: `3.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            privateIp: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            securityGroups,
            launchedAt: new Date(),
            tags: {},
        };
        set((state) => ({
            ec2: {
                ...state.ec2,
                instances: [...state.ec2.instances, instance],
            },
        }));
    },

    terminateInstance: (instanceId: string) => {
        set((state) => ({
            ec2: {
                ...state.ec2,
                instances: state.ec2.instances.map((inst) =>
                    inst.instanceId === instanceId ? { ...inst, state: 'terminated' } : inst
                ),
            },
        }));
    },

    createSecurityGroup: (groupName: string, description: string) => {
        const sg: SecurityGroup = {
            groupId: `sg-${Math.random().toString(36).substr(2, 9)}`,
            groupName,
            description,
            vpcId: 'vpc-default',
            inboundRules: [],
            outboundRules: [{ protocol: 'all', port: 'all', source: '0.0.0.0/0' }],
        };
        set((state) => ({
            ec2: {
                ...state.ec2,
                securityGroups: [...state.ec2.securityGroups, sg],
            },
        }));
    },

    addInboundRule: (groupId: string, protocol: string, port: number, source: string) => {
        set((state) => ({
            ec2: {
                ...state.ec2,
                securityGroups: state.ec2.securityGroups.map((sg) =>
                    sg.groupId === groupId
                        ? {
                            ...sg,
                            inboundRules: [...sg.inboundRules, { protocol, port, source }],
                        }
                        : sg
                ),
            },
        }));
    },

    // IAM Actions
    createUser: (userName: string) => {
        const user: IAMUser = {
            userName,
            userId: `AIDA${Math.random().toString(36).substr(2, 16).toUpperCase()}`,
            arn: `arn:aws:iam::123456789012:user/${userName}`,
            createdAt: new Date(),
            policies: [],
            groups: [],
        };
        set((state) => ({
            iam: {
                ...state.iam,
                users: [...state.iam.users, user],
            },
        }));
    },

    deleteUser: (userName: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.filter((u) => u.userName !== userName),
            },
        }));
    },

    attachPolicyToUser: (userName: string, policyArn: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? { ...user, policies: [...user.policies, policyArn] }
                        : user
                ),
            },
        }));
    },

    createGroup: (groupName: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                groups: [...(state.iam.groups || []), groupName],
            },
        }));
    },

    addUserToGroup: (userName: string, groupName: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? { ...user, groups: [...user.groups, groupName] }
                        : user
                ),
            },
        }));
    },

    // Utility
    reset: () => set(initialState),

    exportState: () => {
        return JSON.stringify(get(), null, 2);
    },
}));
