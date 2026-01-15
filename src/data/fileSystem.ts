import { projects } from './projects';

export interface FileNode {
    name: string;
    language: string;
    content: string;
}

export interface DirectoryNode {
    name: string;
    children: (FileNode | DirectoryNode)[];
    isOpen?: boolean;
}

export type FileSystemItem = FileNode | DirectoryNode;

const generateProjectFiles = (): DirectoryNode[] => {
    return projects.map(project => ({
        name: project.title.toLowerCase().replace(/\s+/g, '-'),
        isOpen: false,
        children: [
            {
                name: 'README.md',
                language: 'markdown',
                content: `# ${project.title}\n\n${project.description}\n\n## Tech Stack\n${project.techStack.map(t => `- ${t}`).join('\n')}\n\n[GitHub Repo](${project.githubUrl})`
            },
            {
                // Simple heuristic to name the main file based on the first tech stack item
                name: project.techStack[0]?.includes('Python') ? 'main.py' :
                    project.techStack[0]?.includes('C++') ? 'main.cpp' :
                        'index.ts',
                language: project.techStack[0]?.includes('Python') ? 'python' :
                    project.techStack[0]?.includes('C++') ? 'cpp' :
                        'typescript',
                content: project.codeSnippet
            }
        ]
    }));
};

export const explorerData: DirectoryNode[] = [
    {
        name: 'sachin-space',
        isOpen: true,
        children: [
            {
                name: 'projects',
                isOpen: true,
                children: generateProjectFiles() // Dynamically populated from projects.ts
            },
            {
                name: 'package.json',
                language: 'json',
                content: `{\n  "name": "sachin-space",\n  "version": "1.0.0",\n  "dependencies": {\n    "next": "14.0.0",\n    "react": "18.2.0"\n  }\n}`
            },
            {
                name: 'README.md',
                language: 'markdown',
                content: `# Sachin's Portfolio\n\nWelcome to my interactive macOS-style portfolio.\n\n## How to use VS Code\n1. **Explorer**: Use the items on the left to navigate my projects.\n2. **Tabs**: Click any file to open it in a new tab. You can have multiple files open.\n3. **Code**: Review the actual code snippets from my projects.`
            },
            {
                name: '.env.local',
                language: 'properties',
                content: `NEXT_PUBLIC_API_KEY=xxxxx\nNODE_ENV=development`
            }
        ]
    }
];
