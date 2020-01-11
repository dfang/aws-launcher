const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const destDir = `${os.homedir()}/aws-launcher`;

urlsFixing = {
  "AWS-Management-Console": "https://console.aws.amazon.com",
  "Builders-Library": "https://aws.amazon.com/builders-library",
  "Developer-Center": "https://aws.amazon.com/developer/",
  "Developer-Tools": "https://aws.amazon.com/products/developer-tools/",
  "Architecure-Center": "https://aws.amazon.com/architecture/",
  "Well-Architected": "https://aws.amazon.com/architecture/well-architected/",
  "Well-Architected-Tool": "https://aws.amazon.com/well-architected-tool/",

  "DevOps": "https://aws.amazon.com/devops",
  "Security": "https://aws.amazon.com/security",
  "Compliance": "https://aws.amazon.com/compliance",
  "Big-Data": "https://aws.amazon.com/big-data",
  "Fargate": "https://aws.amazon.com/fargate",
  "Serverless": "https://aws.amazon.com/serverless",
  "Auto-Scaling": "https://aws.amazon.com/autoscaling/",
  "Load-Balancing": "https://aws.amazon.com/loadbalancing/",
  "Single-Sign-On": "https://aws.amazon.com/single-sign-on/",
  "SSO": "https://aws.amazon.com/single-sign-on/",
  "Security-Identity-and-Compliance": "https://aws.amazon.com/products/security/",
  "Security-Hub": "https://aws.amazon.com/security-hub/",
  "PrivateLink": "https://aws.amazon.com/privatelink/",
  "DirectConnect": "https://aws.amazon.com/directconnect/",
  "VPN": "https://aws.amazon.com/vpn/",

  "CloudEndure-Disaster-Recovery": "https://aws.amazon.com/cloudendure-disaster-recovery",
  "CloudEndure-Migration": "https://aws.amazon.com/cloudendure-migration",
  "Migrate-To-AWS": "https://aws.amazon.com/cloud-migration/",

  "Global-Accelerator": "https://aws.amazon.com/global-accelerator/",
  "Global-Insfracture": "https://aws.amazon.com/about-aws/global-infrastructure",
  "Regions-And-Zones": "https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/",

  "DeepComposer": "https://aws.amazon.com/deepcomposer/",
  "DeepRacer": "https://aws.amazon.com/deepracer/",

  "Lightsail": "https://lightsail.aws.amazon.com/ls/webapp/create/instance",
  "QuickSight": "https://quicksight.aws.amazon.com",

  "Budgets": "https://console.aws.amazon.com/billing",
  "Cost-Explorer": "https://console.aws.amazon.com/billing",
  "Personal-Health-Dashboard": "https://phd.aws.amazon.com/phd/home",

  "Macie": "https://aws.amazon.com/macie/",
  "AppStream": "https://aws.amazon.com/appstream2/",
  "Aurora": "https://aws.amazon.com/rds/aurora/",

  "StorageGateway": "https://aws.amazon.com/storagegateway/",
  "ImageBuilder": "https://aws.amazon.com/imagebuilder/",

  "Lambda@Edge": "https://aws.amazon.com/lambda/edge/",
  "Chime": "https://aws.amazon.com/chime",
}

namespacesFixing = {
  "Certificate-Manager": "acm",
  "Service-Quotas": "servicequotas",
  "Service-Catalog": "servicecatalog",
  "Managed-Services": "managedservices",
  "API-Gateway": "apigateway",
  "Storage-Gateway": "storagegateway",
  "ElasticCache": "elasticache",
  "EMR": "elasticmapreduce",
  "Shield": "waf",
  "Snowball": "importexport",
  "StepFunctions": "states",
  "WorkDocs": "zocalo",
  "X-Ray": "xray",
  "Cost-Explorer": "billing",
  "Budgets": "billing",
  "Secrets-Manager": "secretsmanager",
  "License-Manager": "license-manager",
  "Firewall-Manager": "waf",
  "Resource-Access-Manager": "ram",
  "EventBridge": "events"
}

// Create destination folder
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  fs.mkdirSync(`${destDir}/aws`);
}

// exec(`rm ${destDir}/icons/aws/.DS_Store`)
// exec(`rm ${destDir}/icons/.DS_Store`)

files = fs.readdirSync('icons/aws/');
files.forEach((file, index) => {
  if (file == ".DS_Store") {
    return
  }

  console.log(`Found file ${file}`)
  file = file.replace(/\.[^/.]+$/, "");
  // console.log(`Compiling ${file}`);
  const namespace = namespacesFixing[file] || file.toLowerCase();
  // console.log(`${namespace}`)
  const url = urlsFixing[file] || `https://aws.amazon.com/${namespace}`;
  console.log(`url is ${url}`)
  fs.writeFileSync(`${destDir}/aws/${file}.url`, `[InternetShortcut]\nURL=${url}`);
  exec(`fileicon set ${destDir}/aws/${file}.url icons/aws/${file}.png`, function (error, stdout, stderr) {
    console.log(error || stdout);
    if (!error) {
      exec(`SetFile -a E ${destDir}/aws/${file}.url`, function (error, stdout, stderr) {
        if (!error && index === files.length - 1) {
          exec(`open ${destDir}`);
        }
      });
    }
  });
  console.log("\n")
})

// Create shortcuts
files = fs.readdirSync('icons');
files.forEach((file, index) => {
  if (file == ".DS_Store" || file == "aws") {
    return
  }

  console.log(`Found file ${file}`)
  file = file.replace(/\.[^/.]+$/, "");
  // console.log(`Compiling ${file}`);
  const namespace = namespacesFixing[file] || file.toLowerCase();
  const url = urlsFixing[file] || `https://console.aws.amazon.com/${namespace}`;
  console.log(`url is ${url}`)
  fs.writeFileSync(`${destDir}/${file}.url`, `[InternetShortcut]\nURL=${url}`);
  exec(`fileicon set ${destDir}/${file}.url icons/${file}.png`, function (error, stdout, stderr) {
    console.log(error || stdout);
    if (!error) {
      exec(`SetFile -a E ${destDir}/${file}.url`, function (error, stdout, stderr) {
        if (!error && index === files.length - 1) {
          exec(`open ${destDir}`);
        }
      });
    }
  });
  console.log("\n")
})
