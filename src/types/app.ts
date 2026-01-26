import { LucideIcon } from 'lucide-react';
import { ComponentType } from 'react';

export type AppID = 'terminal' | 'finder' | 'safari' | 'photos' | 'calendar' | 'projects' | 'resume' | 'vscode' | 'mail' | 'messages' | 'github' | 'launchpad' | 'settings' | 'experience' | 'education';

export interface AppConfig {
    id: AppID;
    title: string;
    icon: LucideIcon;
    component: ComponentType;
    defaultWidth?: number;
    defaultHeight?: number;
}
