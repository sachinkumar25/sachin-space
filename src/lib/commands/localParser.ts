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
            return '\r\nAvailable Commands:\r\n  help       : Show this help message\r\n  tutorial   : A guide to using SachinOS Terminal\r\n  ls         : List files and directories\r\n  cd <dir>   : Change directory\r\n  cat <file> : Read file content\r\n  open <app> : Launch an application\r\n  clear      : Clear the screen';

        case 'tutorial':
            return '\r\n🎓 SachinOS Terminal Tutorial\r\n--------------------------------\r\nThis terminal allows you to interact with the portfolio using text commands.\r\n\r\n1. Navigation:\r\n   - Type "ls" to see what is in the current folder.\r\n   - Type "cd <folder>" to go into a folder (e.g. "cd projects").\r\n   - Type "cd .." to go back up.\r\n\r\n2. Opening Apps:\r\n   - You can launch any app by typing "open <appname>".\r\n   - Try: "open vscode" or "open mail".\r\n\r\n3. AI Assistant:\r\n   - If a command is not recognized, it is sent to the AI!\r\n   - You can ask natural questions like:\r\n     "Who is Sachin?"\r\n     "Show me your react projects"\r\n     "Contact info"\r\n\r\nType "help" at any time for a refresher.';

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
