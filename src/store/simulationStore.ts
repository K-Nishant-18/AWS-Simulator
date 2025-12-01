import { create } from 'zustand';
import type { SimulationState, S3Bucket, EC2Instance, SecurityGroup, IAMUser, IAMRole, RDSInstance, HostedZone, DNSRecord, LoadBalancer, TargetGroup, MFADevice, AccessKey, SecurityRecommendation } from '../types/aws';

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
    createSecurityGroup: (groupName: string, description: string) => string;
    addInboundRule: (groupId: string, protocol: string, port: number, source: string) => void;

    // IAM Actions
    createUser: (userName: string, enableMFA?: boolean) => void;
    deleteUser: (userName: string) => void;
    createGroup: (groupName: string) => void;
    addUserToGroup: (userName: string, groupName: string) => void;
    attachPolicyToUser: (userName: string, policyArn: string) => void;

    // MFA Management
    enableMFA: (userName: string, deviceType: 'virtual' | 'hardware') => void;
    disableMFA: (userName: string) => void;

    // Access Key Management
    createAccessKey: (userName: string) => { accessKeyId: string; secretKey: string };
    deleteAccessKey: (userName: string, accessKeyId: string) => void;

    // Role Management
    createRole: (roleName: string, trustPolicy: any, description: string) => void;
    attachPolicyToRole: (roleName: string, policyArn: string) => void;
    deleteRole: (roleName: string) => void;

    // Security
    calculateSecurityScore: () => number;
    getSecurityRecommendations: () => SecurityRecommendation[];

    // RDS Actions
    createRDSInstance: (identifier: string, engine: 'mysql' | 'postgres', username: string) => void;
    deleteRDSInstance: (identifier: string) => void;

    // Route 53 Actions
    createHostedZone: (domainName: string) => void;
    createDNSRecord: (zoneId: string, record: Omit<DNSRecord, 'ttl'>) => void;

    // ELB Actions
    createTargetGroup: (name: string, protocol: 'HTTP' | 'HTTPS', port: number) => string;
    registerTargets: (targetGroupArn: string, instanceIds: string[]) => void;
    createLoadBalancer: (name: string, targetGroupArn: string) => void;

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
        roles: [],
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
    rds: {
        instances: [],
        snapshots: [],
        parameterGroups: [
            { name: 'default.mysql8.0', family: 'mysql8.0', description: 'Default parameter group for MySQL 8.0' },
            { name: 'default.postgres15', family: 'postgres15', description: 'Default parameter group for PostgreSQL 15' },
            { name: 'default.mariadb10.6', family: 'mariadb10.6', description: 'Default parameter group for MariaDB 10.6' }
        ],
        subnetGroups: [
            {
                name: 'default',
                description: 'Default DB subnet group',
                vpcId: 'vpc-default',
                subnets: ['subnet-1a', 'subnet-1b', 'subnet-1c']
            }
        ]
    },
    route53: {
        hostedZones: [],
    },
    elb: {
        loadBalancers: [],
        targetGroups: [],
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
        const groupId = `sg-${Math.random().toString(36).substr(2, 9)}`;
        const sg: SecurityGroup = {
            groupId,
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
        return groupId;
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
    createUser: (userName: string, enableMFA: boolean = false) => {
        const user: IAMUser = {
            userName,
            userId: `AIDA${Math.random().toString(36).substr(2, 16).toUpperCase()}`,
            arn: `arn:aws:iam::123456789012:user/${userName}`,
            createdAt: new Date(),
            policies: [],
            groups: [],
            mfaEnabled: enableMFA,
            mfaDevices: enableMFA ? [{
                serialNumber: `arn:aws:iam::123456789012:mfa/${userName}`,
                type: 'virtual',
                enabledDate: new Date()
            }] : [],
            accessKeys: [],
            passwordLastChanged: new Date(),
            lastActivity: new Date(),
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

    // MFA Management
    enableMFA: (userName: string, deviceType: 'virtual' | 'hardware' = 'virtual') => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? {
                            ...user,
                            mfaEnabled: true,
                            mfaDevices: [...user.mfaDevices, {
                                serialNumber: `arn:aws:iam::123456789012:mfa/${userName}`,
                                type: deviceType,
                                enabledDate: new Date()
                            }]
                        }
                        : user
                ),
            },
        }));
    },

    disableMFA: (userName: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? { ...user, mfaEnabled: false, mfaDevices: [] }
                        : user
                ),
            },
        }));
    },

    // Access Key Management
    createAccessKey: (userName: string) => {
        const accessKeyId = `AKIA${Math.random().toString(36).substr(2, 16).toUpperCase()}`;
        const secretKey = `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;

        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? {
                            ...user,
                            accessKeys: [...user.accessKeys, {
                                accessKeyId,
                                status: 'Active',
                                createdDate: new Date(),
                                lastUsed: new Date()
                            }]
                        }
                        : user
                ),
            },
        }));

        return { accessKeyId, secretKey };
    },

    deleteAccessKey: (userName: string, accessKeyId: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                users: state.iam.users.map((user) =>
                    user.userName === userName
                        ? {
                            ...user,
                            accessKeys: user.accessKeys.filter(key => key.accessKeyId !== accessKeyId)
                        }
                        : user
                ),
            },
        }));
    },

    // Role Management
    createRole: (roleName: string, trustPolicy: any, description: string) => {
        const role: IAMRole = {
            roleName,
            roleId: `AROA${Math.random().toString(36).substr(2, 16).toUpperCase()}`,
            arn: `arn:aws:iam::123456789012:role/${roleName}`,
            trustPolicy,
            policies: [],
            description,
            createdDate: new Date()
        };

        set((state) => ({
            iam: {
                ...state.iam,
                roles: [...state.iam.roles, role],
            },
        }));
    },

    attachPolicyToRole: (roleName: string, policyArn: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                roles: state.iam.roles.map((role) =>
                    role.roleName === roleName
                        ? { ...role, policies: [...role.policies, policyArn] }
                        : role
                ),
            },
        }));
    },

    deleteRole: (roleName: string) => {
        set((state) => ({
            iam: {
                ...state.iam,
                roles: state.iam.roles.filter((r) => r.roleName !== roleName),
            },
        }));
    },

    // Security
    calculateSecurityScore: () => {
        const state = get();
        const users = state.iam.users;

        if (users.length === 0) return 100;

        let score = 0;
        const weights = {
            mfa: 40,
            policies: 30,
            accessKeys: 20,
            activity: 10
        };

        // MFA Score
        const mfaEnabled = users.filter(u => u.mfaEnabled).length;
        score += (mfaEnabled / users.length) * weights.mfa;

        // Policy Score (users with at least one policy)
        const usersWithPolicies = users.filter(u => u.policies.length > 0).length;
        score += (usersWithPolicies / users.length) * weights.policies;

        // Access Key Score (users with recent activity)
        const usersWithRecentKeys = users.filter(u => {
            if (u.accessKeys.length === 0) return true; // No keys is good
            return u.accessKeys.some(key => {
                const daysSinceCreation = (Date.now() - key.createdDate.getTime()) / (1000 * 60 * 60 * 24);
                return daysSinceCreation < 90; // Keys less than 90 days old
            });
        }).length;
        score += (usersWithRecentKeys / users.length) * weights.accessKeys;

        // Activity Score
        const activeUsers = users.filter(u => u.lastActivity).length;
        score += (activeUsers / users.length) * weights.activity;

        return Math.round(score);
    },

    getSecurityRecommendations: () => {
        const state = get();
        const recommendations: SecurityRecommendation[] = [];

        // Check for users without MFA
        const usersWithoutMFA = state.iam.users.filter(u => !u.mfaEnabled);
        if (usersWithoutMFA.length > 0) {
            recommendations.push({
                id: 'mfa-missing',
                severity: 'critical',
                title: 'Enable MFA for all users',
                description: `${usersWithoutMFA.length} user(s) do not have MFA enabled`,
                action: 'Enable multi-factor authentication to add an extra layer of security',
                affectedResource: usersWithoutMFA.map(u => u.userName).join(', ')
            });
        }

        // Check for users without policies
        const usersWithoutPolicies = state.iam.users.filter(u => u.policies.length === 0);
        if (usersWithoutPolicies.length > 0) {
            recommendations.push({
                id: 'no-permissions',
                severity: 'warning',
                title: 'Users without permissions',
                description: `${usersWithoutPolicies.length} user(s) have no policies attached`,
                action: 'Attach appropriate policies to grant necessary permissions',
                affectedResource: usersWithoutPolicies.map(u => u.userName).join(', ')
            });
        }

        // Check for old access keys
        const usersWithOldKeys = state.iam.users.filter(u =>
            u.accessKeys.some(key => {
                const daysSinceCreation = (Date.now() - key.createdDate.getTime()) / (1000 * 60 * 60 * 24);
                return daysSinceCreation > 90;
            })
        );
        if (usersWithOldKeys.length > 0) {
            recommendations.push({
                id: 'old-access-keys',
                severity: 'warning',
                title: 'Rotate old access keys',
                description: `${usersWithOldKeys.length} user(s) have access keys older than 90 days`,
                action: 'Rotate access keys regularly to maintain security',
                affectedResource: usersWithOldKeys.map(u => u.userName).join(', ')
            });
        }

        // Check for admin access
        const adminUsers = state.iam.users.filter(u =>
            u.policies.includes('arn:aws:iam::aws:policy/AdministratorAccess')
        );
        if (adminUsers.length > 0 && !adminUsers.every(u => u.mfaEnabled)) {
            recommendations.push({
                id: 'admin-no-mfa',
                severity: 'critical',
                title: 'Admin users must have MFA',
                description: 'Users with administrator access should always have MFA enabled',
                action: 'Enable MFA for all users with administrative privileges',
                affectedResource: adminUsers.filter(u => !u.mfaEnabled).map(u => u.userName).join(', ')
            });
        }

        return recommendations;
    },

    // RDS Actions
    createRDSInstance: (identifier: string, engine: 'mysql' | 'postgres', username: string) => {
        const newInstance: RDSInstance = {
            dbInstanceIdentifier: identifier,
            engine,
            instanceClass: 'db.t3.micro',
            status: 'available', // Simplified: instant creation
            masterUsername: username,
            endpoint: `${identifier}.${Math.random().toString(36).substr(2, 9)}.us-east-1.rds.amazonaws.com`,
            port: engine === 'mysql' ? 3306 : 5432,
            securityGroups: ['sg-default'],
            allocatedStorage: 20,
        };
        set((state) => ({
            rds: {
                ...state.rds,
                instances: [...state.rds.instances, newInstance],
            },
        }));
    },

    deleteRDSInstance: (identifier: string) => {
        set((state) => ({
            rds: {
                ...state.rds,
                instances: state.rds.instances.filter((i) => i.dbInstanceIdentifier !== identifier),
            },
        }));
    },

    // Route 53 Actions
    createHostedZone: (domainName: string) => {
        const newZone: HostedZone = {
            id: `Z${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            name: domainName,
            recordCount: 2, // NS and SOA by default
            records: [
                { name: domainName, type: 'NS', value: 'ns-1.awsdns.com', ttl: 172800 },
                { name: domainName, type: 'SOA', value: 'ns-1.awsdns.com', ttl: 900 }
            ]
        };
        set((state) => ({
            route53: {
                hostedZones: [...state.route53.hostedZones, newZone]
            }
        }));
    },

    createDNSRecord: (zoneId: string, record: Omit<DNSRecord, 'ttl'>) => {
        set((state) => ({
            route53: {
                hostedZones: state.route53.hostedZones.map(zone =>
                    zone.id === zoneId
                        ? {
                            ...zone,
                            records: [...zone.records, { ...record, ttl: 300 }],
                            recordCount: zone.recordCount + 1
                        }
                        : zone
                )
            }
        }));
    },

    // ELB Actions
    createTargetGroup: (name: string, protocol: 'HTTP' | 'HTTPS', port: number) => {
        const arn = `arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/${name}/${Math.random().toString(36).substr(2, 9)}`;
        const newGroup: TargetGroup = {
            arn,
            name,
            protocol,
            port,
            vpcId: 'vpc-main',
            targets: []
        };
        set((state) => ({
            elb: {
                ...state.elb,
                targetGroups: [...state.elb.targetGroups, newGroup]
            }
        }));
        return arn;
    },

    registerTargets: (targetGroupArn: string, instanceIds: string[]) => {
        set((state) => ({
            elb: {
                ...state.elb,
                targetGroups: state.elb.targetGroups.map(tg =>
                    tg.arn === targetGroupArn
                        ? { ...tg, targets: [...tg.targets, ...instanceIds] }
                        : tg
                )
            }
        }));
    },

    createLoadBalancer: (name: string, targetGroupArn: string) => {
        const newLB: LoadBalancer = {
            arn: `arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/${name}/${Math.random().toString(36).substr(2, 9)}`,
            name,
            dnsName: `${name}-${Math.random().toString(36).substr(2, 9)}.us-east-1.elb.amazonaws.com`,
            scheme: 'internet-facing',
            state: 'active', // Simplified
            vpcId: 'vpc-main',
            targetGroupArn
        };
        set((state) => ({
            elb: {
                ...state.elb,
                loadBalancers: [...state.elb.loadBalancers, newLB]
            }
        }));
    },

    // Utility
    reset: () => set(initialState),

    exportState: () => {
        return JSON.stringify(get(), null, 2);
    },
}));
