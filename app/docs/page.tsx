import { Zap, Terminal, Server, Shield, Share2, Lock, FileText, Cloud, RefreshCw, AlertTriangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/copy-button";
import GitHubStarButton from "@/components/github-star-button";

export default function DocsIndex() {
  return (
    <div className="py-12 prose prose-invert max-w-none">

      {/* ─── HEADER ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold text-white m-0">NextDeploy Documentation</h1>
        <GitHubStarButton />
      </div>

      <p className="text-gray-300 text-lg mb-4">
        NextDeploy is a self-hosted deployment engine for Next.js. It builds a complete picture
        of your app at build time — routes, integrations, secrets, assets — and uses that
        intelligence to deploy correctly to your own VPS or AWS, without a platform in the middle.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        No monthly platform bill. No vendor lock-in. Your infrastructure, your AWS account, your server.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 flex gap-3">
        <div className="text-amber-400 mt-0.5">⚠️</div>
        <div>
          <h4 className="text-amber-400 font-semibold mb-1">Early Access — v0.1.x</h4>
          <p className="text-amber-200/70 text-sm">
            Works well for personal and small-team projects. APIs may change between minor versions.
            Back up secrets and read changelogs before upgrading. Use <code className="text-amber-300">nextdeploy update</code> to get the latest binary.
          </p>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── HOW IT ACTUALLY WORKS ─── */}
      <h2 className="text-3xl font-bold text-white mb-4">How it actually works</h2>
      <p className="text-gray-300 mb-6">
        Most deployment tools are transport layers — they move your build from A to B.
        NextDeploy is different. Every <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">nextdeploy build</code> produces
        a <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">metadata.json</code> that statically
        analyses your Next.js output before a single file is uploaded:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Route classification", desc: "Separates static, SSR, ISR, API, and middleware routes by parsing Next.js manifests. No config needed.", accent: "text-emerald-400", border: "hover:border-emerald-500/30" },
          { title: "Integration detection", desc: "Detects Stripe, Cloudinary, Google Analytics, YouTube, and other external origins from the build output — not source code.", accent: "text-blue-400", border: "hover:border-blue-500/30" },
          { title: "ISR awareness", desc: "Identifies ISR routes and revalidation intervals. Foundation for selective CDN invalidation instead of nuking the whole cache.", accent: "text-purple-400", border: "hover:border-purple-500/30" },
          { title: "Secret cross-referencing", desc: "Knows which integrations your app uses. Can warn before deploy if Stripe is detected but STRIPE_KEY is missing.", accent: "text-amber-400", border: "hover:border-amber-500/30" },
          { title: "Git provenance", desc: "Records commit hash and dirty state at build time. Every deploy is traceable. Warns if you're shipping uncommitted changes.", accent: "text-red-400", border: "hover:border-red-500/30" },
          { title: "Build fingerprint", desc: "Knows your package manager, entrypoint, output mode, Next.js version, and full asset inventory. Deploys exactly what your app needs.", accent: "text-gray-300", border: "hover:border-slate-600" },
        ].map(({ title, desc, accent, border }) => (
          <div key={title} className={`p-5 bg-slate-900/30 border border-slate-800 rounded-xl ${border} transition-colors`}>
            <h4 className={`${accent} font-semibold text-sm mb-2`}>{title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed m-0">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 mb-8">
        <p className="text-gray-300 text-sm leading-relaxed m-0">
          This intelligence layer is what separates NextDeploy from a glorified deploy script.
          The metadata drives pre-deploy validation, targeted cache invalidation, deployment provenance,
          and — on the roadmap — per-route CloudFront behavior configuration that eliminates unnecessary Lambda invocations entirely.
        </p>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── WHAT IT HANDLES TODAY ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">What it handles today</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8 text-gray-300">
        <ul className="space-y-3 list-none p-0 m-0">
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>VPS deployments</strong> — atomic port-swap, zero-downtime, Caddy reverse proxy, Fail2Ban, HSTS</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>AWS serverless</strong> — Lambda + S3 + CloudFront + ACM, fully provisioned on first deploy</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Build intelligence</strong> — static analysis of every Next.js build, route classification, integration detection</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Lambda bridge adapter</strong> — translates Lambda events to HTTP for the Next.js standalone server</span></li>
        </ul>
        <ul className="space-y-3 list-none p-0 m-0">
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Secret management</strong> — encrypted locally, pushed to AWS Secrets Manager, injected via Lambda Extension at cold-start</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Rollbacks</strong> — VPS ring buffer keeps last 5 releases, serverless restores from S3 deployment history</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Deployment provenance</strong> — git commit, dirty state, Next.js version, and build timestamp on every deploy</span></li>
          <li className="flex gap-3 items-start"><span className="text-emerald-400 font-bold mt-0.5">✓</span><span><strong>Self-updating CLI</strong> — single static binary, no runtime dependencies, updates via GitHub Releases</span></li>
        </ul>
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> Current limitations worth knowing
        </h4>
        <ul className="space-y-2 text-sm text-gray-400 list-none p-0 m-0">
          <li>• <strong className="text-gray-200">Lambda size limit:</strong> 250MB unzipped. Apps with heavy native binaries (sharp, Prisma) may exceed this.</li>
          <li>• <strong className="text-gray-200">No edge runtime:</strong> Next.js middleware runs at the edge. Everything currently routes to a single Lambda origin.</li>
          <li>• <strong className="text-gray-200">Single region:</strong> One Lambda per deploy. Multi-region requires manual configuration.</li>
          <li>• <strong className="text-gray-200">No ISR cache layer yet:</strong> ISR routes are detected and classified but selective revalidation isn't wired up yet — it's on the roadmap.</li>
          <li>• <strong className="text-gray-200">AWS only (for now):</strong> Cloudflare, GCP, and Azure providers are planned. The provider interface is already built for it.</li>
        </ul>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── INSTALLATION ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Installation</h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">CLI (your machine)</h3>
      <p className="text-gray-300 mb-4">A single static binary. No Node, no runtime dependencies.</p>
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

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Daemon (VPS only)</h3>
      <p className="text-gray-300 mb-4">
        Runs as a systemd service on your server. Handles health checks, atomic swaps, release management,
        and secret injection via a Unix socket control plane. <em>Not needed for serverless.</em>
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
      <p className="text-gray-400 mb-6 text-sm">Deploy to any Linux server you own or rent.</p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Initialize</h3>
      <CodeBlock code="nextdeploy init" className="mb-4" />
      <p className="text-gray-300 mb-6">Creates <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">nextdeploy.yml</code> in your project root with sensible defaults.</p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Configure</h3>
      <CodeBlock code={`version: "1.0"
target_type: vps

app:
  name: my-next-app
  domain: app.example.com
  port: 3000
  environment: production

servers:
  - name: prod
    host: 1.2.3.4
    port: 22
    username: deploy
    ssh_key: ~/.ssh/id_rsa`} className="mb-8" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Prepare the server (once)</h3>
      <p className="text-gray-300 mb-4">
        Runs an Ansible playbook that installs Node, Bun, Caddy, Fail2Ban, and the NextDeploy daemon.
        Configures systemd, Unix socket permissions, and Caddy HTTPS automatically.
      </p>
      <CodeBlock code="nextdeploy prepare" className="mb-8" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">4. Build and deploy</h3>
      <CodeBlock code={`nextdeploy build\nnextdeploy ship`} className="mb-4" />
      <p className="text-gray-300 mb-8">
        <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">build</code> analyses your Next.js output and produces the metadata and artifact.{" "}
        <code className="text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded">ship</code> uploads via SFTP and signals
        the daemon for an atomic port-swap — health checked before traffic cuts over.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Rollback</h3>
      <p className="text-gray-300 mb-4">The daemon keeps your last 5 releases. Revert instantly:</p>
      <CodeBlock code="nextdeploy rollback" className="mb-8" />

      <hr className="border-slate-800 my-10" />

      {/* ─── SERVERLESS DEPLOYMENT ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">Serverless Deployment (AWS)</h2>
      <p className="text-gray-400 mb-6 text-sm">No servers, no daemon — Lambda + S3 + CloudFront, provisioned automatically.</p>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 flex gap-3">
        <div className="text-blue-400 mt-0.5">ℹ️</div>
        <div>
          <h4 className="text-blue-400 font-semibold mb-1">What gets provisioned on first deploy</h4>
          <ul className="text-blue-200/80 text-sm space-y-1 list-none p-0 m-0 mt-2">
            <li>• S3 bucket with correct MIME types and cache headers per asset type</li>
            <li>• Lambda function + IAM execution role</li>
            <li>• Lambda Function URL with CloudFront OAC — Lambda is never publicly exposed</li>
            <li>• ACM certificate for your custom domain</li>
            <li>• CloudFront distribution wired to both S3 and Lambda</li>
            <li>• AWS Secrets Manager namespace for your app</li>
          </ul>
          <p className="text-blue-200/70 text-xs mt-3">
            <em>Prerequisite: AWS credentials in <code>~/.aws/credentials</code> with the permissions listed in the AWS Deployer Permissions section.</em>
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Configure</h3>
      <CodeBlock code={`version: "1.0"
target_type: serverless

app:
  name: my-next-app
  domain: app.example.com

serverless:
  provider: aws
  region: us-east-1      # ACM certificates must be us-east-1 for CloudFront`} className="mb-8" />

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Add <code className="text-emerald-400">output: 'standalone'</code></h3>
      <CodeBlock code={`// next.config.mjs
const nextConfig = {
  output: 'standalone',
}
export default nextConfig`} className="mb-4" />
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5 mb-8">
        <h4 className="text-white font-semibold mb-2">Why standalone?</h4>
        <p className="text-gray-400 text-sm leading-relaxed m-0">
          Default Next.js builds include the full <code>node_modules</code> — often 500MB+, over Lambda's 250MB unzipped limit.
          Standalone mode traces your actual imports and produces a self-contained <code>server.js</code>.
          NextDeploy then injects a bridge adapter that translates Lambda invocation events into
          HTTP requests the Next.js server understands.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Build and deploy</h3>
      <CodeBlock code={`nextdeploy build\nnextdeploy ship`} className="mb-4" />
      <p className="text-gray-300 mb-6">What <code className="bg-slate-900 px-2 py-1 rounded text-emerald-400 font-mono">ship</code> does:</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { step: "1", title: "Validate build", desc: "Reads metadata.json — route types, integrations, ISR config, git state. Validates before uploading anything." },
          { step: "2", title: "Push secrets", desc: "Syncs secrets to AWS Secrets Manager. They never touch the artifact or Lambda env vars directly." },
          { step: "3", title: "Upload static assets", desc: "Syncs public/ and _next/static/ to S3 with correct MIME types and cache headers per asset type." },
          { step: "4", title: "Deploy Lambda", desc: "Injects bridge adapter, zips .next/standalone/, updates Lambda via UpdateFunctionCode with retry logic for IAM propagation." },
          { step: "5", title: "SSL + DNS guide", desc: "ACM cert requested. Detailed DNS guide generated in report. Re-run ship after DNS propagates." },
          { step: "6", title: "Bust CDN cache", desc: "CloudFront /* invalidation triggered. Selective per-route invalidation using ISR metadata is on the roadmap." },
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

      {/* ─── SECRETS ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">Secret Management</h2>
      <p className="text-gray-400 mb-6 text-sm">Encrypted locally. Never in build artifacts. Never hardcoded in Lambda env vars.</p>

      <CodeBlock code={`nextdeploy secrets set DATABASE_URL "postgres://user:pass@host/db"
nextdeploy secrets set STRIPE_KEY "sk_live_..."
nextdeploy secrets list
nextdeploy secrets delete OLD_KEY`} className="mb-8" />

      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" /> How secrets are stored
        </h4>
        <ul className="space-y-3 text-sm text-gray-400 list-none p-0 m-0">
          <li className="flex gap-4 items-start">
            <span className="text-gray-500 flex-shrink-0 w-16">VPS</span>
            <span>Encrypted on-disk at <code className="text-emerald-400">/opt/nextdeploy/secrets/</code> with 0600 permissions. Decrypted and injected as environment variables at startup. Key is derived per-machine.</span>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-gray-500 flex-shrink-0 w-16">AWS</span>
            <span>Pushed to AWS Secrets Manager under <code className="text-emerald-400">nextdeploy/apps/&lt;name&gt;/production</code>. Lambda fetches them at cold-start via the AWS Secrets Extension — available as plain <code className="text-emerald-400">process.env</code>. Only the ARN is set in Lambda, not the values.</span>
          </li>
        </ul>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── DNS CONFIGURATION ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">DNS Configuration</h2>
      <p className="text-gray-400 mb-6 text-sm">How to point your domain to your new infrastructure correctly.</p>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5 mb-8">
        <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
          <Share2 className="w-4 h-4" /> The "Loud" DNS Guide
        </h4>
        <p className="text-emerald-200/70 text-sm leading-relaxed m-0">
          NextDeploy generates a <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">dns.md</code> file
          in your project root and a visual <strong>DNS Setup Guide</strong> in your deployment report.
          It explicitly tells you which records to add to your registrar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" /> VPS Target
          </h3>
          <p className="text-gray-400 text-sm mb-4">Point your domain directly to your server IP.</p>
          <ul className="space-y-2 text-sm text-gray-300 list-none p-0">
            <li>• <strong className="text-white">A Record:</strong> <code className="text-blue-400">@</code> &rarr; <code className="text-blue-400">Server IP</code></li>
            <li>• <strong className="text-white">CNAME:</strong> <code className="text-blue-400">www</code> &rarr; <code className="text-blue-400">@</code></li>
          </ul>
          <p className="text-gray-500 text-xs mt-4 italic">Caddy handles SSL automatically via Let's Encrypt once DNS propagates.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-purple-400" /> Serverless Target
          </h3>
          <p className="text-gray-400 text-sm mb-4">Requires two steps: verify ownership and route traffic.</p>
          <ul className="space-y-4 text-sm text-gray-300 list-none p-0">
            <li>
              <strong className="text-white block mb-1">1. SSL Validation (ACM)</strong>
              <span className="text-xs text-gray-500">Add the unique CNAME records provided in your report to prove ownership to AWS.</span>
            </li>
            <li>
              <strong className="text-white block mb-1">2. Traffic Routing</strong>
              <span className="text-xs text-gray-500">Point your domain to the CloudFront distribution:</span>
              <div className="mt-1"><code className="text-purple-400">@</code> &rarr; <code className="text-purple-400">xxxx.cloudfront.net</code></div>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── CLI REFERENCE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">CLI Reference</h2>
      <div className="space-y-3 mb-8">
        {[
          { cmd: "nextdeploy init", desc: "Scaffold nextdeploy.yml in your project" },
          { cmd: "nextdeploy build", desc: "Analyse Next.js output, classify routes, detect integrations, produce metadata.json and app.tar.gz" },
          { cmd: "nextdeploy build --force", desc: "Force a clean rebuild from scratch" },
          { cmd: "nextdeploy ship", desc: "Validate, upload, and deploy to configured target (VPS or serverless)" },
          { cmd: "nextdeploy prepare", desc: "Provision a VPS — Caddy, daemon, Fail2Ban, Node, Bun, systemd (VPS only)" },
          { cmd: "nextdeploy rollback", desc: "Revert to the previous release (VPS ring buffer or S3 history)" },
          { cmd: "nextdeploy status", desc: "Show health, active release, route summary, and resource usage" },
          { cmd: "nextdeploy logs", desc: "Tail live application logs from the server" },
          { cmd: "nextdeploy secrets set KEY VALUE", desc: "Encrypt and store — routed to daemon store or AWS Secrets Manager automatically" },
          { cmd: "nextdeploy secrets list", desc: "List secret names (values always hidden)" },
          { cmd: "nextdeploy secrets delete KEY", desc: "Remove a secret permanently" },
          { cmd: "nextdeploy update", desc: "Self-update the CLI binary from GitHub Releases" },
        ].map(({ cmd, desc }) => (
          <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
            <code className="text-emerald-400 font-mono text-sm flex-shrink-0 whitespace-nowrap">{cmd}</code>
            <span className="text-gray-400 text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── CONFIG REFERENCE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Configuration reference</h2>
      <Tabs defaultValue="vps" className="w-full mb-8">
        <TabsList className="bg-slate-900 border border-slate-700">
          <TabsTrigger value="vps">VPS</TabsTrigger>
          <TabsTrigger value="serverless">Serverless</TabsTrigger>
        </TabsList>
        <TabsContent value="vps" className="mt-2">
          <CodeBlock code={`version: "1.0"
target_type: vps

app:
  name: my-next-app         # Used for process naming and secret namespacing
  domain: app.example.com   # Caddy configures HTTPS automatically
  port: 3000
  environment: production

servers:
  - name: prod
    host: 1.2.3.4
    port: 22
    username: deploy
    ssh_key: ~/.ssh/id_rsa

secrets:
  provider: local           # "local" | "doppler" coming soon

logging:
  enabled: true`} />
        </TabsContent>
        <TabsContent value="serverless" className="mt-2">
          <CodeBlock code={`version: "1.0"
target_type: serverless

app:
  name: my-next-app
  domain: app.example.com

serverless:
  provider: aws             # "cloudflare" | "gcp" | "azure" coming soon
  region: us-east-1         # Must be us-east-1 for CloudFront + ACM
  # Optional — NextDeploy provisions these automatically on first ship:
  s3_bucket: my-nextjs-assets
  cloudfront_id: EXXXXXXXXXXXXXXXXX
  lambda_function_name: my-next-app-handler`} />
        </TabsContent>
      </Tabs>

      <hr className="border-slate-800 my-10" />

      {/* ─── ARCHITECTURE ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Architecture</h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">VPS</h3>
      <div className="my-6 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center overflow-x-auto">
        <svg viewBox="0 0 800 320" className="w-full min-w-[600px] max-w-3xl">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
            <marker id="arrowhead-small" markerWidth="6" markerHeight="4" refX="0" refY="2" orientation="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#94a3b8" />
            </marker>
          </defs>
          <rect x="30" y="80" width="170" height="160" rx="12" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <text x="115" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Local Machine</text>
          <rect x="50" y="110" width="130" height="60" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="115" y="145" textAnchor="middle" fill="#ecfdf5" fontSize="14" fontWeight="600">nextdeploy CLI</text>
          <path d="M 200 150 L 310 150" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="255" y="140" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">SFTP</text>
          <rect x="310" y="40" width="440" height="240" rx="12" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
          <text x="530" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Production VPS</text>
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

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">Serverless</h3>
      <div className="my-6 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center overflow-x-auto">
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
          <text x="330" y="111" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="600">Lambda</text>
          <text x="330" y="127" textAnchor="middle" fill="#94a3b8" fontSize="9">+ Bridge Adapter</text>
          <rect x="430" y="80" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="480" y="115" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">S3</text>
          <rect x="580" y="80" width="120" height="60" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="640" y="115" textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="600">CloudFront</text>
          <rect x="350" y="190" width="160" height="50" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="430" y="220" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="600">Secrets Manager</text>
          <path d="M 330 140 L 330 190" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow-gray-sl)" />
          <text x="338" y="170" fill="#94a3b8" fontSize="9">cold-start fetch</text>
          <path d="M 640 140 L 640 200 L 530 215" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrow-gray-sl)" />
          <path d="M 580 110 L 530 110" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── UNDER THE HOOD ─── */}
      <h2 className="text-3xl font-bold text-white mb-6">Under the hood</h2>
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Terminal className="w-5 h-5 text-emerald-400" /> CLI
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Next.js manifest parsing + route classification</li>
            <li>• Static integration detection from build output</li>
            <li>• Build metadata generation per deploy</li>
            <li>• Encrypted local secret storage</li>
            <li>• SFTP (VPS) or AWS SDK (serverless)</li>
            <li>• Self-update via GitHub Releases</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Server className="w-5 h-5 text-blue-400" /> Daemon (VPS)
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Systemd with socket isolation</li>
            <li>• Unix socket control plane</li>
            <li>• Health check + port arbitration</li>
            <li>• Atomic hot-swap with instant rollback</li>
            <li>• Release ring buffer (last 5 builds)</li>
            <li>• Secret hot-reload without restart</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 m-0 font-sans">
            <Cloud className="w-5 h-5 text-purple-400" /> Serverless engine
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 list-none p-0">
            <li>• Lambda bridge adapter (event → HTTP)</li>
            <li>• CloudFront OAC + Lambda URL auth</li>
            <li>• S3 deployment history for rollback</li>
            <li>• Lambda version publishing per deploy</li>
            <li>• Idempotent AWS resource provisioning</li>
            <li>• Provider interface (GCP, Cloudflare planned)</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-800 my-10" />

      {/* ─── ROADMAP ─── */}
      <h2 className="text-3xl font-bold text-white mb-2">Roadmap</h2>
      <p className="text-gray-400 text-sm mb-6">
        The build metadata layer already collects the data needed for most of these.
        Several are one function away from the information that enables them.
      </p>

      <div className="space-y-3 mb-8">
        {[
          { label: "✅ AWS — Lambda + S3 + CloudFront + ACM + Secrets Manager", status: "Live — v0.1.60", done: true },
          { label: "✅ Build intelligence — route classification, integration detection, ISR awareness, git provenance", status: "Live — v0.1.60", done: true },
          { label: "✅ VPS — atomic swap, Caddy, Fail2Ban, daemon, ring buffer rollback", status: "Live — v0.1.60", done: true },
          { label: "✅ Pre-deploy validation — secret cross-referencing, git dirty warnings, Lambda size checks", status: "Live — v0.1.110", done: true },
          { label: "🔜 Selective CDN invalidation — invalidate only changed routes using ISR metadata diff", status: "Planned", done: false },
          { label: "🔜 Smart CloudFront routing — static routes → S3, Lambda only for SSR/API routes", status: "Planned", done: false },
          { label: "🔜 Deployment dashboard — route map, build trends, history, provenance per deploy", status: "Planned", done: false },
          { label: "🔜 Cloudflare Workers + R2 + CDN provider", status: "Planned", done: false },
          { label: "🔜 GCP Cloud Run + GCS provider", status: "Planned", done: false },
          { label: "🔜 Doppler / 1Password secret provider integration", status: "Planned", done: false },
        ].map(({ label, status, done }) => (
          <div key={label} className={`flex justify-between items-center p-4 rounded-xl border ${done ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/30 border-slate-800'}`}>
            <span className={`text-sm ${done ? 'text-emerald-300/80' : 'text-gray-300'}`}>{label}</span>
            <span className={`text-xs flex-shrink-0 ml-4 ${done ? 'text-emerald-500' : 'text-gray-500'}`}>{status}</span>
          </div>
        ))}
      </div>

    </div>
  );
}