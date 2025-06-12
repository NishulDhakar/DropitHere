import React from 'react';
import { SideBarItem } from './SidebarItem';
import { TwitterIcon } from '../icons/twitter';
import { YutubeIcon } from '../icons/YoutubeIcon';
import { AllIcon } from '../icons/AllIcon';
import { NotesIcon } from '../icons/NotesIcon';
import { GithubIcon } from '../icons/GithubIcon';

export function SideBar({
  setFilterType,
  collapsed,
  setCollapsed,
}: {
  setFilterType: (type: "all" | "twitter" | "youtube" | "notes") => void,
  collapsed: boolean,
  setCollapsed: (v: boolean) => void
}) {
  return (
    <div
      className={`
        hidden md:flex md:h-screen
        fixed left-0 top-0 z-40 flex-col
        transition-all duration-500
        ${collapsed ? "w-20" : "w-72"}
        bg-white/60 dark:bg-zinc-900/70 border-r border-slate-200/60 dark:border-zinc-700/60
        backdrop-blur-2xl shadow-2xl
        overflow-hidden
      `}
      style={{ minWidth: collapsed ? "5rem" : "18rem" }}
    >
      <div className="flex items-center pt-8 px-2">
        <button
          className={`
            focus:outline-none relative transition-all duration-300
            ${collapsed ? "mx-auto" : ""}
            group
          `}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className={`
            absolute inset-0 rounded-full
            ${collapsed ? "animate-pulse bg-gradient-to-tr from-purple-400/40 to-blue-400/40 blur-sm" : ""}
            transition-all duration-300
          `}></span>
          <img
            src="/logo.png"
            alt="Logo"
            className={`
              w-12 h-12 cursor-pointer relative z-10
              ${collapsed ? "drop-shadow-lg" : ""}
              transition-all duration-300
            `}
          />
        </button>
        {!collapsed && (
          <span className="ml-3 text-2xl font-extrabold bg-blue-300 hover:bg-blue-400 bg-clip-text text-transparent transition-all tracking-wide select-none">
            DropItHere
          </span>
        )}
      </div>

      <div className={`flex-1 flex flex-col justify-between ${collapsed ? "items-center" : ""}`}>
        {!collapsed && (
          <div className="pt-8 pl-2 pr-2">
            <div className="space-y-2">
              <AnimatedSidebarItem>
                <SideBarItem text="All" icon={<AllIcon />} onClick={() => setFilterType("all")} />
              </AnimatedSidebarItem>
              <AnimatedSidebarItem delay={0.05}>
                <SideBarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilterType("twitter")} />
              </AnimatedSidebarItem>
              <AnimatedSidebarItem delay={0.1}>
                <SideBarItem text="Youtube" icon={<YutubeIcon />} onClick={() => setFilterType("youtube")} />
              </AnimatedSidebarItem>
              <AnimatedSidebarItem delay={0.15}>
                <SideBarItem text="Notes" icon={<NotesIcon />} onClick={() => setFilterType("notes")} />
              </AnimatedSidebarItem>
            </div>
          </div>
        )}

        <div className={`absolute bottom-8 left-0 right-0 px-4 ${collapsed ? "flex justify-center" : ""}`}>
          <div className={`
            bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 dark:border-zinc-700/50 shadow-xl
            flex flex-col items-center
            transition-all duration-300
            ${collapsed ? "w-14 p-2" : ""}
          `}>
            {!collapsed && (
              <h3 className='text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center'>
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3 animate-pulse"></span>
                Connect Here
              </h3>
            )}
            <div className={`flex gap-4 items-center justify-center ${collapsed ? "flex-col gap-2" : ""}`}>
              <SidebarSocialIcon
                href="https://github.com/nishuldhakar"
                label="GitHub"
                gradient="from-slate-500/20 to-slate-700/20"
                icon={
                  <GithubIcon />
                }
              />
              <SidebarSocialIcon
                href="https://twitter.com/nishuldhakar"
                label="Twitter"
                gradient="from-blue-500/20 to-cyan-500/20"
                icon={
                  <TwitterIcon />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function AnimatedSidebarItem({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <div
      className="animate-fade-in-left"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "0.5s",
        animationFillMode: "backwards"
      }}
    >
      {children}
    </div>
  );
}
function SidebarSocialIcon({ href, label, icon, gradient }: { href: string, label: string, icon: React.ReactNode, gradient: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        group relative p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
        text-slate-600 dark:text-slate-200 hover:text-blue-500 transition-all duration-300
        hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2
        overflow-hidden
      `}
    >
      <span className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
        bg-gradient-to-r ${gradient}
        transition-opacity duration-300
      `}></span>
      <span className="relative z-10">{icon}</span>
    </a>
  );
}