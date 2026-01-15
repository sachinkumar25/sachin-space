import { useWindowStore } from '@/store/useWindowStore';
import { useFileSystemStore } from '@/store/useFileSystemStore';
import { AppID } from '@/types/app';

export const parseCommand = (input: string): string | null => {
    const trimmed = input.trim();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    const windowStore = useWindowStore.getState();
    const fsStore = useFileSystemStore.getState();

    switch (command) {
        case 'help':
            return 'Try: ls, cd, cat, open, clear';

        case 'clear':
            return '__CLEAR__';

        case 'ls':
            const files = fsStore.ls();
            return files.join('  ');

        case 'cd':
            const path = args[0] || '~';
            const error = fsStore.cd(path);
            return error ? error : `Entered ${path} (mock)`; // update fsStore implementation to be real later

        case 'pwd':
            return fsStore.pwd();

        case 'open':
            const appName = args[0]?.toLowerCase();
            // Map common names to IDs
            const appMap: Record<string, AppID> = {
                'finder': 'finder',
                'terminal': 'terminal',
                'projects': 'projects',
                'resume': 'resume',
                'vscode': 'vscode',
                'code': 'vscode',
            };

            const id = appMap[appName];
            if (id) {
                windowStore.openWindow(id);
                return `Opening ${appName}...`;
            }
            return `App '${appName}' not found.`;

        default:
            return null; // Delegate to AI
    }
};
