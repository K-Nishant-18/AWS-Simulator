import { useSimulationStore } from '../store/simulationStore';

export interface CommandResult {
    success: boolean;
    output: string;
    error?: string;
}

export class CLIParser {
    private store = useSimulationStore.getState();

    parse(command: string): CommandResult {
        const trimmed = command.trim();

        if (!trimmed.startsWith('aws ')) {
            return {
                success: false,
                output: '',
                error: 'Command must start with "aws"',
            };
        }

        const parts = trimmed.split(/\s+/);
        const service = parts[1];

        try {
            switch (service) {
                case 's3':
                    return this.parseS3Command(parts.slice(2));
                case 'ec2':
                    return this.parseEC2Command(parts.slice(2));
                case 'iam':
                    return this.parseIAMCommand(parts.slice(2));
                default:
                    return {
                        success: false,
                        output: '',
                        error: `Unknown service: ${service}`,
                    };
            }
        } catch (error) {
            return {
                success: false,
                output: '',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }

    private parseS3Command(args: string[]): CommandResult {
        const action = args[0];

        switch (action) {
            case 'mb': {
                // aws s3 mb s3://bucket-name
                const bucketArg = args[1];
                if (!bucketArg || !bucketArg.startsWith('s3://')) {
                    throw new Error('Invalid bucket name. Use format: s3://bucket-name');
                }
                const bucketName = bucketArg.replace('s3://', '');
                this.store.createBucket(bucketName, 'us-east-1');
                return {
                    success: true,
                    output: `make_bucket: ${bucketName}`,
                };
            }

            case 'rb': {
                // aws s3 rb s3://bucket-name
                const bucketArg = args[1];
                if (!bucketArg || !bucketArg.startsWith('s3://')) {
                    throw new Error('Invalid bucket name. Use format: s3://bucket-name');
                }
                const bucketName = bucketArg.replace('s3://', '');
                this.store.deleteBucket(bucketName);
                return {
                    success: true,
                    output: `remove_bucket: ${bucketName}`,
                };
            }

            case 'cp': {
                // aws s3 cp localfile s3://bucket-name/key
                const source = args[1];
                const destArg = args[2];
                if (!destArg || !destArg.startsWith('s3://')) {
                    throw new Error('Invalid destination. Use format: s3://bucket-name/key');
                }
                const [bucketName, ...keyParts] = destArg.replace('s3://', '').split('/');
                const key = keyParts.join('/');
                this.store.uploadObject(bucketName, key, `Content of ${source}`, 'text/plain');
                return {
                    success: true,
                    output: `upload: ${source} to s3://${bucketName}/${key}`,
                };
            }

            case 'ls': {
                // aws s3 ls [s3://bucket-name]
                if (args.length === 1) {
                    // List all buckets
                    const buckets = useSimulationStore.getState().s3.buckets;
                    const output = buckets.map(b => `${b.createdAt.toISOString().split('T')[0]} ${b.name}`).join('\n');
                    return {
                        success: true,
                        output: output || 'No buckets found',
                    };
                } else {
                    // List objects in bucket
                    const bucketArg = args[1];
                    const bucketName = bucketArg.replace('s3://', '').replace('/', '');
                    const bucket = useSimulationStore.getState().s3.buckets.find(b => b.name === bucketName);
                    if (!bucket) {
                        throw new Error(`Bucket not found: ${bucketName}`);
                    }
                    const output = bucket.objects.map(obj =>
                        `${obj.lastModified.toISOString()} ${obj.size} ${obj.key}`
                    ).join('\n');
                    return {
                        success: true,
                        output: output || 'No objects found',
                    };
                }
            }

            default:
                throw new Error(`Unknown S3 command: ${action}`);
        }
    }

    private parseEC2Command(args: string[]): CommandResult {
        const action = args[0];

        switch (action) {
            case 'run-instances': {
                // aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro
                const imageIdIndex = args.indexOf('--image-id');
                const instanceTypeIndex = args.indexOf('--instance-type');

                if (imageIdIndex === -1 || instanceTypeIndex === -1) {
                    throw new Error('Missing required parameters: --image-id and --instance-type');
                }

                const ami = args[imageIdIndex + 1];
                const instanceType = args[instanceTypeIndex + 1];

                this.store.launchInstance(instanceType, ami, ['sg-default']);

                return {
                    success: true,
                    output: `Launching instance with AMI ${ami} and type ${instanceType}`,
                };
            }

            case 'describe-instances': {
                const instances = useSimulationStore.getState().ec2.instances;
                const output = instances.map(inst =>
                    `${inst.instanceId}\t${inst.state}\t${inst.instanceType}\t${inst.publicIp || 'N/A'}`
                ).join('\n');
                return {
                    success: true,
                    output: output || 'No instances found',
                };
            }

            default:
                throw new Error(`Unknown EC2 command: ${action}`);
        }
    }

    private parseIAMCommand(args: string[]): CommandResult {
        const action = args[0];

        switch (action) {
            case 'create-user': {
                // aws iam create-user --user-name username
                const userNameIndex = args.indexOf('--user-name');
                if (userNameIndex === -1) {
                    throw new Error('Missing required parameter: --user-name');
                }
                const userName = args[userNameIndex + 1];
                this.store.createUser(userName);
                return {
                    success: true,
                    output: `Created user: ${userName}`,
                };
            }

            case 'list-users': {
                const users = useSimulationStore.getState().iam.users;
                const output = users.map(user =>
                    `${user.userName}\t${user.userId}\t${user.createdAt.toISOString()}`
                ).join('\n');
                return {
                    success: true,
                    output: output || 'No users found',
                };
            }

            default:
                throw new Error(`Unknown IAM command: ${action}`);
        }
    }
}

export const cliParser = new CLIParser();
