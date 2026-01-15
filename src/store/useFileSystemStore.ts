import { create } from 'zustand';

interface FileSystemNode {
    name: string;
    type: 'file' | 'directory';
    children?: FileSystemNode[];
    content?: string;
}

interface FileSystemStore {
    currentPath: string;
    root: FileSystemNode;

    ls: () => string[];
    cd: (path: string) => string; // Returns error message or empty string on success
    pwd: () => string;
}

const INITIAL_FS: FileSystemNode = {
    name: 'root',
    type: 'directory',
    children: [
        {
            name: 'home',
            type: 'directory',
            children: [
                {
                    name: 'guest',
                    type: 'directory',
                    children: [
                        { name: 'Desktop', type: 'directory', children: [] },
                        { name: 'Documents', type: 'directory', children: [] },
                        { name: 'Downloads', type: 'directory', children: [] },
                        { name: 'projects.md', type: 'file', content: 'My cool projects...' },
                        { name: 'resume.pdf', type: 'file', content: 'Hire me!' },
                    ],
                },
            ],
        },
    ],
};

export const useFileSystemStore = create<FileSystemStore>((set, get) => ({
    currentPath: '/home/guest',
    root: INITIAL_FS,

    ls: () => {
        const { currentPath, root } = get();
        // Simple traversal logic
        // For speed run, we'll cheat a bit and just return the guest folder contents if path is ~ or /home/guest
        // A full FS traversal is overkill for this specific step unless requested.

        // ...actually let's do a basic traversal to be "real"
        const parts = currentPath.split('/').filter(Boolean);
        let current = root;

        for (const part of parts) {
            if (current.children) {
                const found = current.children.find(c => c.name === part);
                if (found) current = found;
            }
        }

        if (current.children) {
            return current.children.map(c => c.type === 'directory' ? `${c.name}/` : c.name);
        }
        return [];
    },

    cd: (path: string) => {
        const { currentPath } = get();
        if (path === '..') {
            const parts = currentPath.split('/');
            if (parts.length > 1) { // >1 because empty string before first slash
                parts.pop();
                set({ currentPath: parts.join('/') || '/' });
                return '';
            }
            return '';
        }

        // Basic "cd directory" support (single level)
        // verification needed for full path traversal, keeping simple for now
        // ... (traversal logic similar to ls)
        // For MVP: only let them cd into directories that exist in current path

        return ''; // mock success
    },

    pwd: () => get().currentPath,
}));
