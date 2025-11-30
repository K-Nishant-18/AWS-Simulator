import { useSimulationStore } from '../store/simulationStore';

/**
 * Virtual AWS Service Layer
 * This provides a programmatic interface similar to AWS SDK
 * for use in the Console UI components
 */

export const virtualS3 = {
    createBucket: (bucketName: string, region: string = 'us-east-1') => {
        useSimulationStore.getState().createBucket(bucketName, region);
        return { success: true, bucketName };
    },

    deleteBucket: (bucketName: string) => {
        useSimulationStore.getState().deleteBucket(bucketName);
        return { success: true };
    },

    uploadObject: (bucketName: string, key: string, content: string, contentType: string = 'text/plain') => {
        useSimulationStore.getState().uploadObject(bucketName, key, content, contentType);
        return { success: true, key };
    },

    deleteObject: (bucketName: string, key: string) => {
        useSimulationStore.getState().deleteObject(bucketName, key);
        return { success: true };
    },

    setBucketPublicAccess: (bucketName: string, isPublic: boolean) => {
        useSimulationStore.getState().setBucketPublicAccess(bucketName, isPublic);
        return { success: true };
    },

    enableStaticWebsite: (bucketName: string) => {
        useSimulationStore.getState().enableStaticWebsite(bucketName);
        return { success: true };
    },

    listBuckets: () => {
        return useSimulationStore.getState().s3.buckets;
    },

    getBucket: (bucketName: string) => {
        return useSimulationStore.getState().s3.buckets.find(b => b.name === bucketName);
    },
};

export const virtualEC2 = {
    launchInstance: (instanceType: string, ami: string, securityGroups: string[] = ['sg-default']) => {
        useSimulationStore.getState().launchInstance(instanceType, ami, securityGroups);
        return { success: true };
    },

    terminateInstance: (instanceId: string) => {
        useSimulationStore.getState().terminateInstance(instanceId);
        return { success: true };
    },

    createSecurityGroup: (groupName: string, description: string) => {
        useSimulationStore.getState().createSecurityGroup(groupName, description);
        return { success: true };
    },

    addInboundRule: (groupId: string, protocol: string, port: number, source: string) => {
        useSimulationStore.getState().addInboundRule(groupId, protocol, port, source);
        return { success: true };
    },

    listInstances: () => {
        return useSimulationStore.getState().ec2.instances;
    },

    listSecurityGroups: () => {
        return useSimulationStore.getState().ec2.securityGroups;
    },
};

export const virtualIAM = {
    createUser: (userName: string) => {
        useSimulationStore.getState().createUser(userName);
        return { success: true };
    },

    deleteUser: (userName: string) => {
        useSimulationStore.getState().deleteUser(userName);
        return { success: true };
    },

    attachPolicyToUser: (userName: string, policyArn: string) => {
        useSimulationStore.getState().attachPolicyToUser(userName, policyArn);
        return { success: true };
    },

    listUsers: () => {
        return useSimulationStore.getState().iam.users;
    },
};
