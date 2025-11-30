// Core AWS Resource Types
export const AWS_TYPES_VERSION = '1.0';

export interface S3Bucket {
    name: string;
    region: string;
    createdAt: Date;
    publicAccess: boolean;
    staticWebsiteHosting: boolean;
    objects: S3Object[];
}

export interface S3Object {
    key: string;
    size: number;
    lastModified: Date;
    contentType: string;
    content?: string; // For text files
}

export interface EC2Instance {
    instanceId: string;
    instanceType: string;
    state: 'pending' | 'running' | 'stopping' | 'stopped' | 'terminated';
    ami: string;
    publicIp?: string;
    privateIp: string;
    securityGroups: string[];
    launchedAt: Date;
    tags: Record<string, string>;
}

export interface SecurityGroup {
    groupId: string;
    groupName: string;
    description: string;
    vpcId: string;
    inboundRules: SecurityGroupRule[];
    outboundRules: SecurityGroupRule[];
}

export interface SecurityGroupRule {
    protocol: string;
    port: number | string;
    source: string;
    description?: string;
}

export interface IAMUser {
    userName: string;
    userId: string;
    arn: string;
    createdAt: Date;
    policies: string[];
    groups: string[];
}

export interface IAMPolicy {
    policyName: string;
    policyArn: string;
    description: string;
    document: any; // Policy JSON
}

export interface VPC {
    vpcId: string;
    cidrBlock: string;
    subnets: Subnet[];
    routeTables: RouteTable[];
}

export interface Subnet {
    subnetId: string;
    cidrBlock: string;
    availabilityZone: string;
    public: boolean;
}

export interface RouteTable {
    routeTableId: string;
    routes: Route[];
}

export interface Route {
    destination: string;
    target: string;
}

// Simulation State
export interface SimulationState {
    s3: {
        buckets: S3Bucket[];
    };
    ec2: {
        instances: EC2Instance[];
        securityGroups: SecurityGroup[];
    };
    iam: {
        users: IAMUser[];
        groups: string[];
        policies: IAMPolicy[];
    };
    vpc: {
        vpcs: VPC[];
    };
}
