export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface WindowState {
    id: string; // AppID
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    position: Position;
    size: Size;
    zIndex: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    launchArgs?: any;
}
