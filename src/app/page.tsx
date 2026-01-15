"use client";

import Desktop from "@/components/desktop/Desktop";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import { useWindowStore } from "@/store/useWindowStore";
import { UserCircle, Folder, Terminal, Briefcase, Code2, Mail, FileText, Github } from "lucide-react";

export default function Home() {
  const { toggleAbout, openWindow } = useWindowStore();

  return (
    <Desktop>
      <div className="p-4 flex flex-col gap-6 items-start flex-wrap h-[calc(100vh-100px)] content-start w-full">
        <DesktopIcon
          label="About Me"
          icon={UserCircle}
          imageSrc="/profile.jpg"
          className="w-32"
          onClick={() => toggleAbout(true)}
        />

        <DesktopIcon
          label="Finder"
          icon={Folder}
          imageSrc="/icons/finder.png"
          onClick={() => openWindow('finder')}
        />

        <DesktopIcon
          label="Terminal"
          icon={Terminal}
          imageSrc="/icons/terminal.png"
          onClick={() => openWindow('terminal')}
        />

        <DesktopIcon
          label="Projects"
          icon={Briefcase}
          imageSrc="/icons/projects.png"
          onClick={() => openWindow('projects')}
        />

        <DesktopIcon
          label="VS Code"
          icon={Code2}
          imageSrc="/icons/vscode.png"
          onClick={() => openWindow('vscode')}
        />

        <DesktopIcon
          label="Mail"
          icon={Mail}
          imageSrc="/icons/mail.png"
          onClick={() => openWindow('mail')}
        />

        <DesktopIcon
          label="Resume"
          icon={FileText}
          imageSrc="/icons/resume.png"
          onClick={() => openWindow('resume')}
        />

        <DesktopIcon
          label="GitHub"
          icon={Github}
          imageSrc="/icons/github.png"
          onClick={() => window.open('https://github.com/sachinkumar25', '_blank')}
        />
      </div>
    </Desktop>
  );
}
