import { Zap, Terminal, Server, Shield, Activity, Share2, Lock, FileText, Cloud, Key, GitBranch, RefreshCw } from "lucide-react";
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
        NextDeploy is your self-hosted deployment engine for Next.js — deploy to
        your own VPS or to AWS serverless infrastructure with a single command.
        No vendor lock-in, no monthly platform fees.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 flex gap-3">
        <div className="text-amber-400 mt-0.5">⚠️</div>
        <div>
          <h4 className="text-amber-400 font-semibold mb-1">
            Early Access — v0.1.x
          </h4>
          <p className="text-amber-200/70 text-sm">
            NextDeploy is production-ready for personal and small-team projects.
            APIs may evolve between minor versions. Always back up secrets and review changelogs before upgrading.
          </p>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── WHAT IS NEXTDEPLOY ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">What is NextDeploy?</h2>
      <p className="text-gray-300 mb-4">
        NextDeploy gives you the full power of a Vercel-grade deployment engine
        on infrastructure you own and control:
      </p>
      <div className="grid md:grid-cols-2 gap-4 mb-8 text-gray-300">
        <ul className="space-y-2 list-none p-0 m-0">
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>VPS Deployments</strong> — atomic swap, zero-downtime, Caddy proxy</span></li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>AWS Serverless</strong> — S3 + Lambda + CloudFront, one command</span></li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>Secret Management</strong> — encrypted at-rest, AWS Secrets Manager in cloud</span></li>
        </ul>
        <ul className="space-y-2 list-none p-0 m-0">
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>Production-Hardened</strong> — Fail2Ban, DDoS limits, HSTS, CSP auto-generated</span></li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>Zero Lock-in</strong> — your infra, your config, open-source MIT license</span></li>
          <li className="flex gap-3"><span className="text-emerald-400 font-bold">✓</span><span><strong>Rollbacks</strong> — instant one-command rollback to any previous release</span></li>
        </ul>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── INSTALLATION ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Installation</h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">CLI (Your Local Machine)</h3>
      <p className="text-gray-300 mb-4">Install the NextDeploy toolbelt using our global installer:</p>
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
          <CodeBlock code={`curl.exe -sSfO https://nextdeploy.one/install.bat && install.bat`} />
        </TabsContent>
        <TabsContent value="go" className="mt-2">
          <CodeBlock code="go install github.com/Golangcodes/nextdeploy/cli@latest" />
        </TabsContent>
      </Tabs>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Daemon (VPS Only)</h3>
      <p className="text-gray-300 mb-4">
        The daemon runs on your Linux server and manages deployments, health checks, and process supervision.
        <em> Only needed for VPS target — not required for serverless.</em>
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

      {/* ─── VPS DEPLOYMENT ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">VPS Deployment</h2>
      <p className="text-gray-400 mb-6 text-sm">Deploy Next.js to any Linux server you own or rent.</p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Initialize Your Project</h3>
      <CodeBlock code="nextdeploy init" className="mb-4" />
      <p className="text-gray-300 mb-6">
        Generates a <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">nextdeploy.yml</code> file with sensible defaults for your project.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Configure for VPS</h3>
      <CodeBlock
        code={`version: "1.0"
target_type: vps

app:
  name: my-next-app
  domain: app.example.com
  port: 3000
  environment: production

servers:
  - name: production-01
    host: 192.168.1.100
    port: 22
    username: deploy
    ssh_key: ~/.ssh/id_rsa`}
        className="mb-8"
      />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Prepare the Server</h3>
      <p className="text-gray-300 mb-4">
        One-time setup: installs Bun, Caddy, Fail2Ban, and the NextDeploy daemon on your server.
      </p>
      <CodeBlock code="nextdeploy prepare" className="mb-8" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">4. Build &amp; Ship</h3>
      <CodeBlock code={`nextdeploy build\nnextdeploy ship`} className="mb-4" />
      <p className="text-gray-300 mb-8">
        The CLI builds locally, packages a <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">.nextdeploy/app.tar.gz</code> artifact,
        uploads it via SFTP, and signals the daemon to perform an atomic port-swap with health checking.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Rollback</h3>
      <p className="text-gray-300 mb-4">Instantly roll back to the previous release:</p>
      <CodeBlock code="nextdeploy rollback" className="mb-8" />

      <hr className="border-slate-800 my-10" />

      {/* ─── SERVERLESS DEPLOYMENT ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">Serverless Deployment (AWS)</h2>
      <p className="text-gray-400 mb-6 text-sm">
        No VPS, no daemon — deploy directly to AWS Lambda + S3 + CloudFront.
      </p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 flex gap-3">
        <div className="text-blue-400 mt-0.5">ℹ️</div>
        <div>
          <h4 className="text-blue-400 font-semibold mb-1">What NextDeploy Automates For You</h4>
          <p className="text-blue-200/70 text-sm mb-2">
            No need to create AWS resources manually! On your first <code className="text-blue-300 bg-blue-900/50 px-1 rounded">nextdeploy ship</code>, the engine will automatically:
          </p>
          <ul className="text-blue-200/80 text-sm space-y-1 list-none p-0 m-0">
            <li>• ✅ Provision an S3 bucket for your static assets</li>
            <li>• ✅ Create the Lambda function and IAM execution role</li>
            <li>• ✅ Request an ACM Certificate for your custom domain</li>
            <li>• ✅ Hook up a CloudFront distribution bridging S3 and Lambda securely</li>
          </ul>
          <p className="text-blue-200/70 text-xs mt-3">
            <em>Prerequisite: You just need valid AWS Credentials configured locally (e.g., <code>~/.aws/credentials</code>) with permissions outlined in the AWS Deployer Permissions section below.</em>
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Configure for Serverless</h3>
      <CodeBlock
        code={`version: "1.0"
target_type: serverless

app:
  name: my-next-app
  domain: app.example.com
  port: 3000

serverless:
  provider: aws
  region: us-east-1
  s3_bucket: my-nextjs-static-assets        # public/ and _next/static/ land here
  cloudfront_id: EXXXXXXXXXXXXXXXXX          # optional: triggers cache invalidation
  lambda_function_name: my-next-app-handler  # optional: defaults to app.name`}
        className="mb-8"
      />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Add <code className="text-emerald-400">output: &apos;standalone&apos;</code> to Next.js</h3>
      <CodeBlock
        code={`// next.config.mjs
const nextConfig = {
  output: 'standalone',
}
export default nextConfig`}
        className="mb-4"
      />

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 mb-8">
        <h4 className="text-white font-semibold mb-2">Why is standalone required for Serverless?</h4>
        <p className="text-gray-400 text-sm leading-relaxed m-0">
          Default Next.js builds rely heavily on your local <code>node_modules</code> folder, making the output way too massive (frequently 500MB+) to fit inside AWS Lambda's strict 250MB size limit.
          <br /><br />
          The <code>standalone</code> mode traces your code to find only the exact dependencies being used, creating a highly-compressed, completely independent <code>server.js</code> file. This allows NextDeploy to trivially zip it up into a tiny lightweight artifact and natively deploy it directly into the AWS Lambda runtime!
        </p>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Build &amp; Ship</h3>
      <CodeBlock code={`nextdeploy build\nnextdeploy ship`} className="mb-4" />
      <p className="text-gray-300 mb-6">Behind the scenes, <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">ship</code> performs these steps automatically:</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { step: "1", title: "Discover Artifact", desc: "Finds your .nextdeploy/app.tar.gz built by nextdeploy build" },
          { step: "2", title: "Push Secrets", desc: "Reads local SecretManager and pushes secrets to AWS Secrets Manager — never inside the artifact" },
          { step: "3", title: "Upload Static Assets", desc: "Uploads public/ and _next/static/ to S3 with correct MIME types and Cache-Control headers" },
          { step: "4", title: "Deploy Lambda", desc: "Zips .next/standalone/ and pushes it to your Lambda function via UpdateFunctionCode" },
          { step: "5", title: "Inject Secret ARN", desc: "Sets ND_SECRETS_ARN in Lambda env vars — your app fetches them at runtime via IAM" },
          { step: "6", title: "Invalidate CDN", desc: "Triggers a CloudFront /* invalidation so users instantly get fresh assets" },
        ].map(({ step, title, desc }) => (
          <div key={step} className="flex gap-4 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">{step}</span>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── SECRET MANAGEMENT ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">Secret Management</h2>
      <p className="text-gray-400 mb-6 text-sm">Encrypted at rest locally. Never packed into deployment artifacts.</p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Set a Secret</h3>
      <CodeBlock code={`nextdeploy secrets set DATABASE_URL "postgres://user:pass@host/db"\nnextdeploy secrets set STRIPE_KEY "sk_live_..."`} className="mb-4" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">List Secrets</h3>
      <CodeBlock code="nextdeploy secrets list" className="mb-4" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Delete a Secret</h3>
      <CodeBlock code="nextdeploy secrets delete DATABASE_URL" className="mb-8" />

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" /> How Secrets Are Stored
        </h4>
        <ul className="space-y-2 text-sm text-gray-400 list-none p-0 m-0">
          <li>• <strong className="text-gray-200">VPS deployments:</strong> Secrets are decrypted and injected as environment variables into the process environment at startup. The key is derived per-machine.</li>
          <li>• <strong className="text-gray-200">Serverless deployments:</strong> Secrets are pushed to <strong>AWS Secrets Manager</strong> under <code className="text-emerald-400">nextdeploy/apps/&lt;name&gt;/production</code>. Only <code className="text-emerald-400">ND_SECRETS_ARN</code> is set in Lambda — your app fetches the actual values via IAM at runtime.</li>
          <li>• Raw values are <strong>never written to disk</strong> unencrypted and <strong>never packed into tarballs</strong>.</li>
        </ul>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── CLI REFERENCE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">CLI Reference</h2>
      <div className="space-y-4 mb-8">
        {[
          { cmd: "nextdeploy init", desc: "Initialize a project and create nextdeploy.yml" },
          { cmd: "nextdeploy build", desc: "Build the Next.js app and create .nextdeploy/app.tar.gz" },
          { cmd: "nextdeploy build --force", desc: "Force a full rebuild, ignoring existing artifacts" },
          { cmd: "nextdeploy ship", desc: "Deploy to configured target (VPS or Serverless)" },
          { cmd: "nextdeploy prepare", desc: "Provision a fresh VPS with all dependencies (VPS only)" },
          { cmd: "nextdeploy rollback", desc: "Roll back to the previous release (VPS only)" },
          { cmd: "nextdeploy status", desc: "Show app health, active release, and resource usage" },
          { cmd: "nextdeploy logs", desc: "Tail live application logs from the remote server" },
          { cmd: "nextdeploy secrets set KEY VALUE", desc: "Encrypt and store a secret locally" },
          { cmd: "nextdeploy secrets list", desc: "List all stored secret names (values hidden)" },
          { cmd: "nextdeploy secrets delete KEY", desc: "Remove a stored secret" },
          { cmd: "nextdeploy update", desc: "Self-update the CLI to the latest release" },
        ].map(({ cmd, desc }) => (
          <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <code className="text-emerald-400 font-mono text-sm flex-shrink-0 whitespace-nowrap">{cmd}</code>
            <span className="text-gray-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── CONFIG REFERENCE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Configuration Reference (nextdeploy.yml)</h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Full VPS Config</h3>
      <CodeBlock
        code={`version: "1.0"
target_type: vps            # "vps" | "serverless"

app:
  name: my-next-app         # Unique identifier for this app
  domain: app.example.com   # Public domain (Caddy configures HTTPS automatically)
  port: 3000                # Internal port your Next.js server listens on
  environment: production   # "development" | "staging" | "production"

servers:
  - name: production-01
    host: 192.168.1.100
    port: 22
    username: deploy
    ssh_key: ~/.ssh/id_rsa

secrets:
  provider: local           # "local" | "doppler" (coming soon)

logging:
  enabled: true`}
        className="mb-8"
      />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Full Serverless Config</h3>
      <CodeBlock
        code={`version: "1.0"
target_type: serverless

app:
  name: my-next-app
  domain: app.example.com
  port: 3000

serverless:
  provider: aws                                  # Currently: "aws"  |  Coming: "cloudflare", "gcp", "azure"
  region: us-east-1                              # AWS region
  s3_bucket: my-nextjs-static-assets             # S3 bucket for public/ and _next/static/
  cloudfront_id: EXXXXXXXXXXXXXXXXX              # CloudFront distribution (optional but recommended)
  lambda_function_name: my-next-app-handler      # Lambda function name (defaults to app.name)`}
        className="mb-8"
      />

      <hr className="border-slate-800 my-10" />

      {/* ─── ARCHITECTURE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Technical Architecture</h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">VPS Architecture</h3>
      <div className="my-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center overflow-x-auto">
        <svg viewBox="0 0 800 320" className="w-full min-w-[600px] max-w-3xl">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker id="arrowhead-small" markerWidth="6" markerHeight="4" refX="0" refY="2" orientation="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Local Environment */}
          <rect x="30" y="80" width="170" height="160" rx="12" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <text x="115" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Local Machine</text>
          <rect x="50" y="110" width="130" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="115" y="145" textAnchor="middle" fill="#ecfdf5" fontSize="14" fontWeight="600">nextdeploy CLI</text>
          {/* Arrow */}
          <path d="M 200 150 L 310 150" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="255" y="140" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SFTP</text>
          {/* Production VPS */}
          <rect x="310" y="40" width="440" height="240" rx="12" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <text x="530" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Production VPS (Caddy + Fail2Ban)</text>
          <rect x="330" y="110" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="380" y="145" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">Daemon</text>
          <rect x="500" y="50" width="100" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="550" y="85" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">Caddy</text>
          <rect x="500" y="200" width="100" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="550" y="235" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">Next.js</text>
          <rect x="660" y="120" width="70" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="695" y="150" textAnchor="middle" fill="#f1f5f9" fontSize="11" fontWeight="600">Fail2Ban</text>
          <path d="M 380 170 L 380 230 L 500 230" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowhead-small)" />
          <text x="390" y="210" textAnchor="start" fill="#94a3b8" fontSize="10">Supervises</text>
          <path d="M 380 110 L 380 80 L 500 80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowhead-small)" />
          <text x="390" y="68" textAnchor="start" fill="#94a3b8" fontSize="10">Configures</text>
          <path d="M 550 110 L 550 200" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowhead-small)" />
          <text x="558" y="160" textAnchor="start" fill="#8b5cf6" fontSize="10">HTTPS Proxy</text>
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Serverless Architecture</h3>
      <div className="my-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center overflow-x-auto">
        <svg viewBox="0 0 800 280" className="w-full min-w-[600px] max-w-3xl">
          <defs>
            <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker id="arrow-gray-sl" markerWidth="6" markerHeight="4" refX="0" refY="2" orientation="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
            </marker>
          </defs>
          <text x="115" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Local</text>
          <rect x="30" y="80" width="170" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="115" y="115" textAnchor="middle" fill="#ecfdf5" fontSize="14" fontWeight="600">nextdeploy CLI</text>

          <path d="M 200 110 L 280 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <text x="240" y="100" textAnchor="middle" fill="#10b981" fontSize="10">Deploy</text>

          <text x="530" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">AWS Cloud</text>
          <rect x="240" y="40" width="540" height="220" rx="12" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

          <rect x="280" y="80" width="100" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="330" y="115" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">Lambda</text>

          <rect x="430" y="80" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="480" y="115" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">S3</text>

          <rect x="580" y="80" width="120" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="640" y="115" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">CloudFront</text>

          <rect x="350" y="190" width="160" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="430" y="220" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">Secrets Manager</text>

          <path d="M 330 140 L 330 190" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow-gray-sl)" />
          <text x="338" y="170" fill="#94a3b8" fontSize="10">Fetch Secrets</text>

          <path d="M 640 140 L 640 200 L 530 215" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow-gray-sl)" />
          <path d="M 580 110 L 530 110" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mt-12 mb-4">The Lifecycle of a VPS Deployment</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Terminal, title: "Local Build", desc: "The CLI runs your build command natively, producing a standalone Next.js output." },
          { icon: Zap, title: "Packaging", desc: "A production artifact (app.tar.gz) is bundled with server code, static assets, and deployment metadata." },
          { icon: Share2, title: "Secure Transport", desc: "The payload is transmitted to your VPS via encrypted SFTP." },
          { icon: Shield, title: "Production Hardening", desc: "Fail2Ban, DDoS rate limits, CSP, and HSTS headers are automatically applied by Caddy." },
          { icon: RefreshCw, title: "Atomic Swap", desc: "A fresh port is allocated, health-checked, then traffic is atomically swapped with zero downtime." },
          { icon: FileText, title: "Structured Logs", desc: "JSON access logs are recorded for traffic analysis, auditing, and incident response." },
        ].map((step, i) => (
          <div key={i} className="flex flex-col gap-3 p-5 bg-slate-900/30 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
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

      <hr className="border-slate-800 my-10" />

      {/* ─── COMPONENT OVERVIEW ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Component Overview</h2>
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Terminal className="w-5 h-5 text-emerald-400" /> The CLI
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Next.js config analysis (Bun/Node eval)</li>
            <li>• Build, package &amp; artifact management</li>
            <li>• Encrypted local secret storage</li>
            <li>• SFTP transport (VPS) or AWS SDK (serverless)</li>
            <li>• Self-update via GitHub Releases API</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Server className="w-5 h-5 text-blue-400" /> The Daemon (VPS)
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Systemd service supervision</li>
            <li>• Unix socket control plane</li>
            <li>• Health check &amp; port arbitration</li>
            <li>• Atomic hot-swap with rollback</li>
            <li>• Release pruning (keeps last 5)</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl border-purple-500/20 shadow-lg shadow-purple-500/5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Cloud className="w-5 h-5 text-purple-400" /> Serverless Engine
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• S3 upload with MIME + cache headers</li>
            <li>• Lambda code deployment (zip upload)</li>
            <li>• AWS Secrets Manager integration</li>
            <li>• CloudFront cache invalidation</li>
            <li>• Extensible Provider interface (GCP, Cloudflare planned)</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── FUTURE PROVIDERS ─── */}
      <h2 className="text-3xl font-bold text-white mb-4">Roadmap</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { label: "✅ AWS (Lambda + S3 + CloudFront)", status: "Available in v0.1.60" },
          { label: "🔜 Cloudflare Workers + R2 + CDN", status: "Coming soon" },
          { label: "🔜 GCP Cloud Run + GCS", status: "Coming soon" },
          { label: "🔜 Azure Functions + Blob Storage", status: "Coming soon" },
          { label: "🔜 Doppler Secret Provider", status: "Coming soon" },
          { label: "🔜 Deployment Dashboard UI", status: "Coming soon" },
        ].map(({ label, status }) => (
          <div key={label} className="flex justify-between items-center p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <span className="text-gray-300 text-sm">{label}</span>
            <span className="text-gray-500 text-xs">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
