import { LucideIcon } from 'lucide-react';
import { ComponentType } from 'react';

export type AppID = 'terminal' | 'finder' | 'projects' | 'resume' | 'vscode';

export interface AppConfig {
    id: AppID;
    title: string;
    icon: LucideIcon;
    component: ComponentType;
    defaultWidth?: number;
    defaultHeight?: number;
}
