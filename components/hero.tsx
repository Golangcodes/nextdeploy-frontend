"use client";

import { useState, Suspense } from "react";
import {
  Terminal,
  Github,
  Zap,
  ArrowRight,
  Server,
  Monitor,
  Copy,
  Check,
  Play,
  Clock,
  Eye,
  Calendar,
} from "lucide-react";
import GitHubStarButton from "@/components/github-star-button";

const installOptions = [
  {
    id: "cli-unix",
    name: "Mac/Linux CLI",
    icon: Terminal,
    cmd: "curl -sSf https://nextdeploy.one/install.sh | sh",
    desc: "Install CLI tool for developers",
  },
  {
    id: "cli-win",
    name: "Windows CLI",
    icon: Monitor,
    cmd: "curl -sSf https://nextdeploy.one/install.bat | sh",
    desc: "Install CLI tool on Windows",
  },
  {
    id: "daemon",
    name: "Ubuntu Server",
    icon: Server,
    cmd: "curl -sSf https://nextdeploy.one/daemon.sh | sh",
    desc: "Install NextDeploy Daemon",
  },
];

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(installOptions[0]);

  const copyCmd = () => {
    navigator.clipboard.writeText(activeTab.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Main headline - slightly smaller to accommodate larger video */}
        <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-100 via-green-200 to-emerald-100 bg-clip-text text-transparent leading-tight text-center">
          Next.js Deployment
          <br />
          Without the Black Box.
        </h1>

        {/* Tagline - more compact */}
        <p className="text-sm md:text-base text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed text-center">
          The high-performance, developer-first deployment engine. Transform any
          VPS into a premium hosting platform with
          <strong> total ownership</strong> and <strong>zero-downtime</strong>{" "}
          updates.
        </p>

        {/* Action Buttons - more compact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href="#install"
            className="px-6 py-3 w-full sm:w-auto rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20 text-sm"
          >
            Start Shipping Now
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/docs"
            className="px-6 py-3 w-full sm:w-auto rounded-xl bg-slate-800/50 hover:bg-slate-800 text-white font-medium border border-slate-700 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm text-sm"
          >
            Read Documentation
          </a>
        </div>

        {/* YouTube Video Embed - Much larger */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="relative group rounded-xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900">
            {/* YouTube Embed Container - Full width */}
            <div className="relative aspect-video bg-slate-900">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/MMtvGA1YhW4?si=2rC5CpxfZ9lK6ptF"
                title="NextDeploy Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video Features Grid - More compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              {
                label: "Zero-downtime",
                value: "Always online",
                desc: "No more 502 errors during deployment",
              },
              {
                label: "Setup time",
                value: "< 2 minutes",
                desc: "From VPS to production in minutes",
              },
              {
                label: "Preview URLs",
                value: "Every PR",
                desc: "Automatic staging environments",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-3 border border-slate-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="text-emerald-400 text-xs font-semibold mb-0.5">
                  {feature.label}
                </div>
                <div className="text-white text-base font-bold mb-1">
                  {feature.value}
                </div>
                <div className="text-gray-400 text-xs">{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Install command box - Slightly smaller to maintain balance */}
        <div id="install" className="max-w-2xl mx-auto group scroll-mt-24">
          <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl text-left">
            {/* Tabs header */}
            <div className="flex border-b border-slate-700/50 bg-slate-900/80 overflow-x-auto">
              {installOptions.map((option) => {
                const Icon = option.icon;
                const isActive = activeTab.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveTab(option)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-medium transition-colors border-b-2 whitespace-nowrap ${
                      isActive
                        ? "text-emerald-400 border-emerald-500 bg-slate-800/50"
                        : "text-gray-400 border-transparent hover:text-gray-200 hover:bg-slate-800/30"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {option.name}
                  </button>
                );
              })}
            </div>

            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-800/40 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-xs text-gray-500 font-mono">
                  {activeTab.id === "cli-win" ? "install.bat" : "install.sh"}
                </span>
              </div>
              <button
                onClick={copyCmd}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-gray-400 hover:text-emerald-300 hover:bg-slate-700/50 rounded-md transition-all duration-200 font-medium"
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Code Execution Block */}
            <div className="p-6 md:p-8 font-mono text-xs sm:text-sm">
              <div className="flex flex-col gap-3 group">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 select-none flex-shrink-0 mt-0.5">
                    $
                  </span>
                  <div className="flex-1">
                    <code className="text-emerald-300 break-all font-medium leading-relaxed">
                      {activeTab.cmd}
                    </code>
                    <div className="text-gray-500 mt-4 text-xs flex items-center gap-1.5 italic">
                      # {activeTab.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
