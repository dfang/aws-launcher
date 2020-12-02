const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const destDir = `${os.homedir()}/aws-launcher`;
// Console
const consoleDir = `${destDir}/console`;

function getHomeURL(namespace) {
  return urlsFixing[file] || `https://aws.amazon.com/${namespace}`;
}

function getConsoleURL(namespace) {
  return urlsFixing[file] || `https://console.aws.amazon.com/${namespace}`;
}

function AWSService(homeName, homeURL, consoleName, consoleURL, destFile, icon) {
  this.homeName = homeName;
  this.homeURL = homeURL;
  this.consoleName = consoleName;
  this.consoleURL = consoleURL;
  this.destFile = destFile;
  this.icon = icon;
}

function writeShortcutFile(file, icon, url) {
  fs.writeFileSync(file, `[InternetShortcut]\nURL=${url}`);
  // console.log(`write to ${file}`)
  // icon = file.replace(/-Console/g, "")
  exec(`fileicon set ${file} ${icon}`, function (error, stdout, stderr) {
    // console.log(error || stdout);
    if (!error) {
      exec(`SetFile -a E ${file}`, function (error, stdout, stderr) {
        // console.log(error || stdout);
      });
    }
  });
}

// icons/aws 文件夹下的，无console
var svcs1 = []
// icons 文件夹下的，有home有console
var svcs2 = []

urlsFixing = {
  "AWS-Management-Console": "https://console.aws.amazon.com",
  "Builders-Library": "https://aws.amazon.com/builders-library/",
  "Developer-Center": "https://aws.amazon.com/developer/",
  "Developer-Tools": "https://aws.amazon.com/products/developer-tools/",
  "Architecure-Center": "https://aws.amazon.com/architecture/",
  "Well-Architected": "https://aws.amazon.com/architecture/well-architected/",
  "Well-Architected-Tool": "https://aws.amazon.com/well-architected-tool/",
  "Event-Driven-Architecture": "https://aws.amazon.com/event-driven-architecture",

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
  "PrivateLink": "https://aws.amazon.com/privatelink/",
  "DirectConnect": "https://aws.amazon.com/directconnect/",
  "VPN": "https://aws.amazon.com/vpn/",
  
  "Tensorflow": "https://aws.amazon.com/tensorflow/",
  
  "CloudEndure-Disaster-Recovery": "https://aws.amazon.com/cloudendure-disaster-recovery",
  "CloudEndure-Migration": "https://aws.amazon.com/cloudendure-migration",
  "Migrate-To-AWS": "https://aws.amazon.com/cloud-migration/",
  
  "Global-Accelerator": "https://aws.amazon.com/global-accelerator/",
  "Global-Insfracture": "https://aws.amazon.com/about-aws/global-infrastructure",
  "Regions-And-Zones": "https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/",
  
  // "Security-Hub": "https://aws.amazon.com/security-hub/",
  // "DeepComposer": "https://aws.amazon.com/deepcomposer/",
  // "DeepRacer": "https://aws.amazon.com/deepracer/",
  
  "VMware": "https://aws.amazon.com/vmware/",

  "Lightsail": "https://lightsail.aws.amazon.com/",
  "QuickSight": "https://quicksight.aws.amazon.com",

  "Budgets": "https://console.aws.amazon.com/billing",
  "Cost-Explorer": "https://console.aws.amazon.com/billing",
  "Personal-Health-Dashboard": "https://phd.aws.amazon.com/phd/home",

  // "Macie": "https://aws.amazon.com/macie/",

  "AppStream": "https://aws.amazon.com/appstream2/",
  "Aurora": "https://aws.amazon.com/rds/aurora/",

  "Lambda@Edge": "https://aws.amazon.com/lambda/edge/",
  "Chime": "https://aws.amazon.com/chime",
}

homeNameFixings = {
  "SSO": "single-sign-on",
  "Resource-Access-Manager": "ram",
  "Service-Catalog": "servicecatalog",
  "Security-Hub": "securityhub",
  "Storage-Gateway": "storagegateway",
  "AppStream": "appstream2",
}

consoleNameFixings = {
  "SSO": "singlesignon",
  // "Service-Quotas": "servicequotas",
  // "Cost-Explorer": "billing",
  // "Budgets": "billing",
  // "License-Manager": "license-manager",
  "API-Gateway": "apigateway",
  "App-Mesh": "appmesh",
  "Device-Farm": "devicefarm",
  "Firewall-Manager": "waf",
  "Secrets-Manager": "secretsmanager",
  // Systems-Manager
  // License-Manager
  "Resource-Access-Manager": "ram",
  "Step-Functions": "states",
  "EventBridge": "events",
  "EMR": "elasticmapreduce",
  "Managed-Services": "managedservices",
  "Shield": "waf",
  "X-Ray": "xray",
  "Service-Catalog": "servicecatalog",
  "Security-Hub": "securityhub",
  "Snowball": "importexport",
  "WorkDocs": "zocalo",
  "AppStream": "appstream2",
  "Certificate-Manager": "acm",
  "Storage-Gateway": "storagegateway",
  "Image-Builder": "imagebuilder"
}

// Create destination folder
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  fs.mkdirSync(`${destDir}/aws`);
  fs.mkdirSync(`${destDir}/console`);
  // exec(`rm ${destDir}/icons/aws/.DS_Store`)
  // exec(`rm ${destDir}/icons/.DS_Store`)
}

// in icons/aws, only home page, no console page
files = fs.readdirSync('icons/aws/');
files.forEach((file, index) => {
  if (file == ".DS_Store") {
    return
  }
  file = file.replace(/\.[^/.]+$/, "");
  const namespace = homeNameFixings[file] || file.toLowerCase();
  const url = urlsFixing[file] || `https://aws.amazon.com/${namespace}`;
  var s = new AWSService(namespace, url, "", "", `${destDir}/aws/${file}.url`, `icons/aws/${file}.png`)
  svcs1.push(s)
})

console.table(svcs1.map(function(x){
  var obj = {}
  obj.homeName= x.homeName;
  obj.homeURL= x.homeURL;
  return obj
}));


// service in icons/, got home page and console page
files = fs.readdirSync('icons');
files.forEach(async (file, index) => {
  if (file == ".DS_Store" || file == "aws") {
    return
  }
  file = file.replace(/\.[^/.]+$/, "")
  const homeName = homeNameFixings[file] || file.toLowerCase();
  const homeUrl = urlsFixing[file] || `https://aws.amazon.com/${homeName}/`;
  const consoleName = consoleNameFixings[file] || file.toLowerCase();
  const consoleUrl = `https://console.aws.amazon.com/${consoleName}/`;
  const icon = file.replace(/-Console/g, "")
  var s = new AWSService(homeName, homeUrl, consoleName, consoleUrl, file, `icons/${icon}.png`)
  svcs2.push(s)
})

console.table(svcs2.map(function(x){
  var obj = {}
  obj.homeName= x.homeName;
  obj.homeURL= x.homeURL;
  obj.consoleName = x.consoleName;
  obj.consoleURL = x.consoleURL;
  // obj.destFile = x.destFile;
  // obj.icon = x.icon;
  return obj
}));

console.log("writing shortcuts, please wait ..........\n")

svcs2.forEach(svc => {
  writeShortcutFile(`${destDir}/${svc.destFile}.url`, svc.icon, svc.homeURL)
  writeShortcutFile(`${destDir}/console/${svc.destFile}.url`, svc.icon, svc.consoleURL)
})

exec(`open ${destDir}`);
