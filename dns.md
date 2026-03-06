#  NextDeploy DNS Setup Guide (Serverless)

Target Domain: **nextdeploy.one**
Generated: `Thu, 05 Mar 2026 08:16:26 EAT`

> [!IMPORTANT]
> You need to add **TWO** sets of DNS records to your registrar to go live.
> Need help? Check the [Full Documentation](https://nextdeploy.one/docs)

Log into your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare) and navigate to the **DNS Management** or **Advanced DNS** settings for `nextdeploy.one`.

## Step 1: Point your domain at CloudFront

⚠️ **CloudFront Domain: [Pending]**
Run `nextdeploy ship` again after SSL validation (Step 2) to get this value.

## Step 2: SSL Certificate Validation (AWS ACM)

AWS needs to verify you own this domain before issuing the SSL certificate.

### Validation Record 1
1. Click **Add New Record**.
2. Select **CNAME Record** as the type.
3. For **Host** (or Name), copy exactly: `_5f2eb772e3877df83fae3182c9e00665.nextdeploy.one.`
4. For **Value** (or Target), copy exactly: `_9a11848523ccbd75913d4e3ffb43c959.jkddzztszm.acm-validations.aws.`
5. Save the record.

### Validation Record 2
1. Click **Add New Record**.
2. Select **CNAME Record** as the type.
3. For **Host** (or Name), copy exactly: `_5ab8c33b39a34cd316fbac301cc758bf.www.nextdeploy.one.`
4. For **Value** (or Target), copy exactly: `_35cfebb04ef56b961624fbbff26e28d6.jkddzztszm.acm-validations.aws.`
5. Save the record.

> [!WARNING]
> **NAMECHEAP & GODADDY USERS**: Your registrar automatically adds your domain to the Host field.
> **DO NOT** include `nextdeploy.one` in the Name/Host field or it will fail.
> 
> ✅ **Correct Host**: `_5f2eb7...` or `@` 
> ❌ **Wrong Host**: `_5f2eb7....nextdeploy.one`

## 🚀 Final Steps
1. Ensure all records from above are saved in your DNS panel.
2. Wait 2-5 minutes for the DNS changes to propagate globally.
3. Run `nextdeploy ship` in your terminal again to finish the deployment.
