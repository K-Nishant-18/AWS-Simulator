import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cliParser } from '../services/cliParser';

interface TerminalProps {
    className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ className = '' }) => {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error'; content: string }>>([
        { type: 'output', content: 'AWS Simulator Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" for available commands' },
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentInput.trim()) return;

        // Add input to history
        setHistory((prev) => [...prev, { type: 'input', content: `$ ${currentInput}` }]);

        // Handle special commands
        if (currentInput.trim() === 'clear') {
            setHistory([]);
            setCurrentInput('');
            return;
        }

        if (currentInput.trim() === 'help') {
            setHistory((prev) => [
                ...prev,
                { type: 'output', content: 'Available commands:' },
                { type: 'output', content: '  aws s3 mb s3://bucket-name - Create a bucket' },
                { type: 'output', content: '  aws s3 ls - List buckets' },
                { type: 'output', content: '  aws s3 cp file s3://bucket/key - Upload file' },
                { type: 'output', content: '  aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro' },
                { type: 'output', content: '  aws ec2 describe-instances - List instances' },
                { type: 'output', content: '  aws iam create-user --user-name username' },
                { type: 'output', content: '  aws iam list-users' },
                { type: 'output', content: '  clear - Clear terminal' },
            ]);
            setCurrentInput('');
            return;
        }

        // Parse and execute AWS command
        const result = cliParser.parse(currentInput);

        if (result.success) {
            setHistory((prev) => [...prev, { type: 'output', content: result.output }]);
        } else {
            setHistory((prev) => [...prev, { type: 'error', content: result.error || 'Unknown error' }]);
        }

        setCurrentInput('');
    };

    return (
        <div className={`bg-gray-900 text-gray-100 rounded-lg overflow-hidden flex flex-col ${className}`}>
            {/* Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <TerminalIcon size={16} />
                <span className="text-sm font-medium">AWS CLI Simulator</span>
            </div>

            {/* Terminal Content */}
            <div
                className="flex-1 p-4 overflow-y-auto font-mono text-sm"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((line, index) => (
                    <div
                        key={index}
                        className={`mb-1 ${line.type === 'input'
                                ? 'text-green-400'
                                : line.type === 'error'
                                    ? 'text-red-400'
                                    : 'text-gray-300'
                            }`}
                    >
                        {line.content}
                    </div>
                ))}

                {/* Current Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-100"
                        autoFocus
                    />
                </form>

                <div ref={terminalEndRef} />
            </div>
        </div>
    );
};
