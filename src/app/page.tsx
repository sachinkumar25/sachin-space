"use client";

import Desktop from "@/components/desktop/Desktop";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import HeroBar from "@/components/desktop/HeroBar";
import { useWindowStore } from "@/store/useWindowStore";
import { UserCircle, Folder, Terminal, Briefcase, Code2, Mail, FileText, Github, MessageSquare, Globe, Image, Calendar, Rocket, Settings, GraduationCap } from "lucide-react";

export default function Home() {
  const { toggleAbout, openWindow } = useWindowStore();

  return (
    <Desktop>
      <HeroBar />
      <div className="p-4 flex flex-col gap-2 items-start flex-wrap h-[calc(100vh-140px)] content-start w-fit">
        <DesktopIcon
          label="About Me"
          icon={UserCircle}
          imageSrc="/profile.jpg"
          onClick={() => toggleAbout(true)}
        />

        <DesktopIcon
          label="Finder"
          icon={Folder}
          imageSrc="/icons/finder.png"
          onClick={() => openWindow('finder')}
        />

        <DesktopIcon
          label="Launchpad"
          icon={Rocket}
          imageSrc="/icons/launchpad.png"
          onClick={() => openWindow('launchpad')}
        />

        <DesktopIcon
          label="Settings"
          icon={Settings}
          imageSrc="/icons/settings.png"
          onClick={() => openWindow('settings')}
        />

        <DesktopIcon
          label="Safari"
          icon={Globe}
          imageSrc="/icons/safari.png"
          onClick={() => openWindow('safari')}
        />

        <DesktopIcon
          label="Photos"
          icon={Image}
          imageSrc="/icons/photos.png"
          onClick={() => openWindow('photos')}
        />

        <DesktopIcon
          label="Calendar"
          icon={Calendar}
          imageSrc="/icons/calendar.png"
          onClick={() => openWindow('calendar')}
        />

        <DesktopIcon
          label="Education"
          icon={GraduationCap}
          imageSrc="/icons/education.png"
          onClick={() => openWindow('education')}
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
          label="Messages"
          icon={MessageSquare}
          imageSrc="/icons/messages.png"
          onClick={() => openWindow('messages')}
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
