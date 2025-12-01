import type { SimulationState } from '../types/aws';

export interface ValidationResult {
    success: boolean;
    message: string;
}

export class LabValidator {
    // S3 Lab: Host a Static Website
    static validateS3Lab(state: SimulationState): ValidationResult {
        // 1. Check if any bucket exists
        if (state.s3.buckets.length === 0) {
            return { success: false, message: 'No S3 buckets found. Create a bucket first.' };
        }

        // 2. Check for public access
        const publicBucket = state.s3.buckets.find(b => b.publicAccess);
        if (!publicBucket) {
            return { success: false, message: 'No public bucket found. You need to enable public access for your website bucket.' };
        }

        // 3. Check for static website hosting
        if (!publicBucket.staticWebsiteHosting) {
            return { success: false, message: `Bucket '${publicBucket.name}' is public but Static Website Hosting is not enabled.` };
        }

        // 4. Check for index.html
        const hasIndex = publicBucket.objects.some(obj => obj.key === 'index.html');
        if (!hasIndex) {
            return { success: false, message: `Bucket '${publicBucket.name}' is configured correctly, but missing 'index.html'. Upload your website file.` };
        }

        return { success: true, message: 'Congratulations! You have successfully hosted a static website on S3.' };
    }

    // EC2 Lab: Launch Web Server
    static validateEC2Lab(state: SimulationState): ValidationResult {
        // 1. Check if any instance is running
        const runningInstance = state.ec2.instances.find(i => i.state === 'running');
        if (!runningInstance) {
            return { success: false, message: 'No running EC2 instances found. Launch an instance.' };
        }

        // 2. Check Security Group
        const sgIds = runningInstance.securityGroups;
        const securityGroups = state.ec2.securityGroups.filter(sg => sgIds.includes(sg.groupId));

        // Check for HTTP (80) access
        const hasHttpAccess = securityGroups.some(sg =>
            sg.inboundRules.some(rule =>
                (rule.port === 80 || rule.port === '80' || rule.port === 'all') &&
                (rule.source === '0.0.0.0/0')
            )
        );

        if (!hasHttpAccess) {
            return { success: false, message: `Instance '${runningInstance.instanceId}' is running, but its Security Group does not allow HTTP (port 80) traffic from anywhere (0.0.0.0/0).` };
        }

        return { success: true, message: 'Success! Your Web Server is running and accessible via HTTP.' };
    }

    // IAM Lab: Secure Your Account
    static validateIAMLab(state: SimulationState): ValidationResult {
        // 1. Check for created users
        if (state.iam.users.length === 0) {
            return { success: false, message: 'No IAM users found. Create a user for yourself.' };
        }

        // 2. Check for groups
        if (state.iam.groups.length === 0) {
            return { success: false, message: 'No IAM groups found. Best practice is to manage permissions via groups.' };
        }

        // 3. Check if user belongs to a group
        const userInGroup = state.iam.users.find(u => u.groups.length > 0);
        if (!userInGroup) {
            return { success: false, message: 'Users exist, but none are in a group. Add your user to a group.' };
        }

        // 4. Check for policies attached (either to user or group - simplified to user for MVP as we attach directly in store for now)
        // In our store, we attach policies to users directly or via group logic (but group logic in store just adds string name, doesn't propagate policies yet in MVP simple mode)
        // Let's check if any user has AdministratorAccess or ReadOnlyAccess
        const hasPolicy = state.iam.users.some(u => u.policies.length > 0);

        if (!hasPolicy) {
            return { success: false, message: 'User exists but has no permissions. Attach a policy (like AdministratorAccess) to the user.' };
        }

        return { success: true, message: 'Great job! You have set up IAM users and groups securely.' };
    }
    // Route 53 Lab: DNS Management
    static validateRoute53Lab(state: SimulationState): ValidationResult {
        // 1. Check for Hosted Zone
        if (state.route53.hostedZones.length === 0) {
            return { success: false, message: 'No Hosted Zone found. Create a Public Hosted Zone for your domain.' };
        }

        const zone = state.route53.hostedZones[0];

        // 2. Check for A Record
        const hasARecord = zone.records.some(r => r.type === 'A');
        if (!hasARecord) {
            return { success: false, message: `Hosted Zone '${zone.name}' exists, but has no 'A' record. Create an A record to point to an IP.` };
        }

        return { success: true, message: 'Excellent! You have configured Route 53 with a Hosted Zone and DNS records.' };
    }

    // ELB Lab: Load Balancing
    static validateELBLab(state: SimulationState): ValidationResult {
        // 1. Check for Load Balancer
        if (state.elb.loadBalancers.length === 0) {
            return { success: false, message: 'No Load Balancer found. Create an Application Load Balancer.' };
        }

        // 2. Check for Target Group
        if (state.elb.targetGroups.length === 0) {
            return { success: false, message: 'No Target Group found. You need a target group to route traffic.' };
        }

        // 3. Check for Registered Targets
        const activeTg = state.elb.targetGroups.find(tg => tg.targets.length > 0);
        if (!activeTg) {
            return { success: false, message: 'Target Group exists but has no registered targets. Register EC2 instances to your target group.' };
        }

        return { success: true, message: 'Great work! Your Load Balancer is set up and routing traffic to targets.' };
    }

    // RDS Lab: Database Setup
    static validateRDSLab(state: SimulationState): ValidationResult {
        // 1. Check for RDS Instance
        if (state.rds.instances.length === 0) {
            return { success: false, message: 'No RDS instance found. Create a database instance.' };
        }

        const instance = state.rds.instances[0];

        // 2. Check if instance is available
        if (instance.status !== 'available') {
            return { success: false, message: `Database instance '${instance.dbInstanceIdentifier}' is not available yet. Wait for it to become available.` };
        }

        return { success: true, message: 'Success! You have created and configured an RDS database instance.' };
    }
}
