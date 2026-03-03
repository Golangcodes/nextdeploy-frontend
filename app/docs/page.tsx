import { Zap, Terminal, Server, Shield, Activity, Share2, Lock, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/copy-button";
import GitHubStarButton from "@/components/github-star-button";

export default function DocsIndex() {
  return (
    <div className="py-12 prose prose-invert max-w-none">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold text-white m-0">
          NextDeploy Documentation
        </h1>
        <GitHubStarButton />
      </div>

      <p className="text-gray-300 text-lg mb-8">
        Welcome to NextDeploy! This guide will help you understand the platform,
        install the necessary tools, and deploy your first Next.js application
        in minutes.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 flex gap-3">
        <div className="text-amber-400 mt-0.5">⚠️</div>
        <div>
          <h4 className="text-amber-400 font-semibold mb-1">
            Warning: Hobby Project
          </h4>
          <p className="text-amber-200/70 text-sm">
            NextDeploy is currently a hobby project and is not intended for
            production use as of now. Use it at your own risk for testing and
            personal projects.
          </p>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* --- Getting Started Section --- */}
      <h2 className="text-3xl font-bold text-white mb-6">
        What is NextDeploy?
      </h2>
      <p className="text-gray-300 mb-4">
        NextDeploy is a self-hosted deployment platform built exclusively for
        Next.js applications. Think of it as your own personal Vercel, but with:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8 text-gray-300">
        <ul className="space-y-2 list-none p-0 m-0">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Full control</strong> - Deploy to any VPS you own
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Native Execution</strong> - Run Next.js bare-metal, no overhead
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Zero lock-in</strong> - No vendor dependencies
            </span>
          </li>
        </ul>
        <ul className="space-y-2 list-none p-0 m-0">
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Production Hardened</strong> - Fail2Ban & DDoS protection included
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Serverless Ready</strong> - AWS Lambda/S3 support
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              <strong>Zero Downtime</strong> - Atomic port-swapping & rollbacks
            </span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-white mt-12 mb-4">
        Prerequisites
      </h3>
      <ul className="space-y-2 mb-8 text-gray-300 list-none p-0">
        <li className="flex gap-3">
          <span className="text-emerald-400 font-bold">•</span>
          <span>
            <strong>A Next.js project</strong> (any version)
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-emerald-400 font-bold">•</span>
          <span>
            <strong>A Linux VPS</strong> (Ubuntu/Debian) or an{" "}
            <strong>AWS Account</strong>
          </span>
        </li>
        <li className="flex gap-3">
          <span className="text-emerald-400 font-bold">•</span>
          <span>
            <strong>SSH access</strong> to your server
          </span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-white mt-12 mb-4">Installation</h3>
      <h4 className="text-xl font-semibold text-white mt-8 mb-3">
        CLI (All Platforms)
      </h4>
      <p className="text-gray-300 mb-4">
        Install the NextDeploy toolbelt using our global installer:
      </p>

      <Tabs defaultValue="linux" className="w-full mb-8">
        <TabsList className="bg-slate-900 border border-slate-700">
          <TabsTrigger value="linux">Linux / macOS</TabsTrigger>
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="go">Go (Source)</TabsTrigger>
        </TabsList>
        <TabsContent value="linux" className="mt-2">
          <CodeBlock code="curl -sSf https://nextdeploy.one/install.sh | sh" />
        </TabsContent>
        <TabsContent value="windows" className="mt-2">
          <CodeBlock
            code={`curl.exe -sSfO https://nextdeploy.one/install.bat && install.bat`}
          />
        </TabsContent>
        <TabsContent value="go" className="mt-2">
          <CodeBlock code="go install github.com/Golangcodes/nextdeploy/cli@latest" />
        </TabsContent>
      </Tabs>

      <h4 className="text-xl font-semibold text-white mt-8 mb-3">
        Daemon (Linux Servers Only)
      </h4>
      <p className="text-gray-300 mb-4">
        On your VPS, set up the production engine.{" "}
        <em>(Required for deployments)</em>
      </p>

      <Tabs defaultValue="script" className="w-full mb-8">
        <TabsList className="bg-slate-900 border border-slate-700">
          <TabsTrigger value="script">Install Script</TabsTrigger>
          <TabsTrigger value="go">Go (Source)</TabsTrigger>
        </TabsList>
        <TabsContent value="script" className="mt-2">
          <CodeBlock code="curl -sSf https://nextdeploy.one/daemon.sh | sh" />
        </TabsContent>
        <TabsContent value="go" className="mt-2">
          <CodeBlock code="go install github.com/Golangcodes/nextdeploy/daemon/cmd/nextdeployd@main" />
        </TabsContent>
      </Tabs>

      <hr className="border-slate-800 my-10" />

      {/* --- Your First Deployment Section --- */}
      <h2 className="text-3xl font-bold text-white mb-6">
        Your First Deployment
      </h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        1. Initialize Your Project
      </h3>
      <p className="text-gray-300 mb-4">
        Navigate to your Next.js project and run:
      </p>
      <CodeBlock code="nextdeploy init" className="mb-8" />
      <p className="text-gray-300 mb-8">
        This scaffolds your project and generates a{" "}
        <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">
          nextdeploy.yml
        </code>{" "}
        config file.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        2. Configure Your Deployment
      </h3>
      <p className="text-gray-300 mb-4">
        Edit{" "}
        <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">
          nextdeploy.yml
        </code>{" "}
        for your target environment:
      </p>

      <p className="text-gray-300 mb-2 font-semibold">For Linux VPS:</p>
      <CodeBlock
        code={`version: 1.0\ntarget_type: "vps"\nservers:\n  - host: 192.168.1.100\n    ssh_key: "~/.ssh/id_rsa"`}
        className="mb-8"
      />

      <p className="text-gray-300 mb-2 font-semibold">For AWS Serverless:</p>
      <CodeBlock
        code={`version: 1.0\ntarget_type: "serverless"\nserverless:\n  provider: "aws"\n  region: "us-east-1"\n  s3_bucket: "my-nextjs-assets"`}
        className="mb-8"
      />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        3. Server Preparation (VPS Only)
      </h3>
      <p className="text-gray-300 mb-4">
        Automatically install dependencies, configure the background daemon, and **harden your server** with Fail2Ban.
      </p>
      <CodeBlock code="nextdeploy prepare" className="mb-8" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        4. Build & Ship
      </h3>
      <p className="text-gray-300 mb-4">
        Build your project locally and ship it to the world:
      </p>
      <CodeBlock code={`nextdeploy build\nnextdeploy ship`} className="mb-8" />
      <p className="text-gray-300 mb-8">
        The CLI analyzes your code, performs an **Atomic Swap** (Zero-Downtime), and automatically configures **DDoS protection** and **Security Headers** in Caddy.
      </p>

      <hr className="border-slate-800 my-10" />

      {/* --- Architecture Section --- */}
      <h2 className="text-3xl font-bold text-white mb-6">
        Technical Architecture
      </h2>
      <p className="text-gray-300 text-lg mb-8">
        NextDeploy is coordinated between three core components: the CLI, the
        Daemon, and the Caddy reverse proxy.
      </p>

      <div className="my-12 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center overflow-x-auto">
        <h3 className="text-xl font-semibold mb-8 text-emerald-400">
          System Overview
        </h3>
        <svg viewBox="0 0 800 400" className="w-full min-w-[600px] max-w-3xl">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#10b981", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#059669", stopOpacity: 0.2 }}
              />
            </linearGradient>
          </defs>

          {/* Local Environment */}
          <rect
            x="50"
            y="100"
            width="200"
            height="200"
            rx="12"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text
            x="150"
            y="80"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="14"
            fontWeight="600"
          >
            Local Environment
          </text>

          <rect
            x="75"
            y="150"
            width="150"
            height="80"
            rx="8"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text
            x="150"
            y="195"
            textAnchor="middle"
            fill="#ecfdf5"
            fontSize="16"
            fontWeight="600"
          >
            nextdeploy CLI
          </text>

          {/* Connection */}
          <path
            d="M 225 190 L 375 190"
            stroke="#10b981"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text
            x="300"
            y="180"
            textAnchor="middle"
            fill="#10b981"
            fontSize="12"
            fontWeight="600"
          >
            Encrypted SFTP
          </text>

          {/* Production VPS */}
          <rect
            x="375"
            y="50"
            width="375"
            height="300"
            rx="12"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text
            x="562"
            y="30"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="14"
            fontWeight="600"
          >
            Production VPS (Hardened)
          </text>

          {/* Daemon */}
          <rect
            x="400"
            y="150"
            width="120"
            height="80"
            rx="8"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <text
            x="460"
            y="195"
            textAnchor="middle"
            fill="#f1f5f9"
            fontSize="16"
            fontWeight="600"
          >
            Daemon
          </text>

          {/* App */}
          <rect
            x="580"
            y="240"
            width="120"
            height="80"
            rx="8"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text
            x="640"
            y="285"
            textAnchor="middle"
            fill="#f1f5f9"
            fontSize="14"
            fontWeight="600"
          >
            Next.js App
          </text>

          {/* Caddy */}
          <rect
            x="580"
            y="70"
            width="120"
            height="80"
            rx="8"
            fill="#1e293b"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <text
            x="640"
            y="115"
            textAnchor="middle"
            fill="#f1f5f9"
            fontSize="16"
            fontWeight="600"
          >
            Caddy Proxy
          </text>

          {/* Internal Flows */}
          <path
            d="M 460 230 L 460 280 L 580 280"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="2 2"
            markerEnd="url(#arrowhead-small)"
          />
          <text x="470" y="260" textAnchor="start" fill="#94a3b8" fontSize="10">
            Supervises
          </text>

          <path
            d="M 460 150 L 460 110 L 580 110"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="2 2"
            markerEnd="url(#arrowhead-small)"
          />
          <text x="470" y="130" textAnchor="start" fill="#94a3b8" fontSize="10">
            Hardens
          </text>

          <path
            d="M 640 150 L 640 240"
            stroke="#8b5cf6"
            strokeWidth="2"
            markerEnd="url(#arrowhead-small)"
          />
          <text x="650" y="200" textAnchor="start" fill="#8b5cf6" fontSize="12">
            HTTPS Proxy
          </text>

          {/* Arrowheads */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orientation="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker
              id="arrowhead-small"
              markerWidth="6"
              markerHeight="4"
              refX="0"
              refY="2"
              orientation="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
            </marker>
          </defs>
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mt-12 mb-4">
        The Lifecycle of a Deployment
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Terminal,
            title: "Local Build",
            desc: "The CLI runs your custom build command natively for your target architecture.",
          },
          {
            icon: Zap,
            title: "Packaging",
            desc: "A production artifact is bundled with server-code, assets, and deployment metadata.",
          },
          {
            icon: Share2,
            title: "Transport",
            desc: "The payload is transmitted securely to your VPS via encrypted SFTP channels.",
          },
          {
            icon: Shield,
            title: "Production Hardening",
            desc: "Fail2Ban and global DDoS filters are automatically applied to protect your endpoint.",
          },
          {
            icon: Lock,
            title: "Secure Swap",
            desc: "A fresh port is allocated, secrets are injected, and a healthy port-swap occurs.",
          },
          {
            icon: FileText,
            title: "JSON Logging",
            desc: "Professional access logs are recorded for real-time traffic analysis and auditing.",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-5 bg-slate-900/30 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <step.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1 text-base">{step.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-white mt-12 mb-4">
        Component Responsibility
      </h3>
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Terminal className="w-5 h-5 text-emerald-400" />
            The CLI (Go)
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Local state management</li>
            <li>• Package manager discovery</li>
            <li>• Encrypted secret handling</li>
            <li>• SFTP Transport</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Server className="w-5 h-5 text-blue-400" />
            The Daemon (Go)
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Systemd task supervision</li>
            <li>• Unix socket control</li>
            <li>• Health monitoring</li>
            <li>• Release pruning</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl border-purple-500/20 shadow-lg shadow-purple-500/5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Lock className="w-5 h-5 text-purple-400" />
            The Shield
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Fail2Ban IP Jailing</li>
            <li>• Caddy security headers</li>
            <li>• Global DDoS connection limits</li>
            <li>• CSP & HSTS enforcement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
