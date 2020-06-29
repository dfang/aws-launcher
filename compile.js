const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const destDir = `${os.homedir()}/aws-launcher`;
// Console
const consoleDir = `${destDir}/console`;

var request = require('request');
function urlExists(url, cb) {
  request({ url: url, method: 'GET' }, function (err, res) {
    
    console.log(err)
    if (err) return cb(null, false);
    console.log(`url is ${url}`)
    console.log(`statusCode of GET is ${res.statusCode}`)
    console.log("\n")
    cb(null, /404/.test(res.statusCode) === false);
  });
}

function gotConsolePage(name) {
  return !servicesWithoutConsole.includes(name)
}

// https://github.com/vercel/async-retry
const retry = require('async-retry')
const fetch = require('node-fetch')


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
  "Resource-Access-Manager": "ram",
  "Service-Catalog": "servicecatalog",
  "Security-Hub": "securityhub",
  "Storage-Gateway": "storagegateway",
  "AppStream": "appstream2",
}

consoleNameFixings = {
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

// 有home无console
servicesWithoutConsole = [
  // "snowball",
  "chime",
  "braket",
  "sso",
  "aurora",
  "quicksight",
  "single-sign-on",
  "mobileanalytics",
  "global-accelerator",
  "transit-gateway"
]

// Create destination folder
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
  fs.mkdirSync(`${destDir}/aws`);
  fs.mkdirSync(`${destDir}/console`);
}

// exec(`rm ${destDir}/icons/aws/.DS_Store`)
// exec(`rm ${destDir}/icons/.DS_Store`)

// Just test output
// files = fs.readdirSync('icons');
// files.forEach((file, index) => {
//   if (file == ".DS_Store" || file == "aws") {
//     return
//   }
//   console.log(file)
// })


files = fs.readdirSync('icons/aws/');
files.forEach((file, index) => {
  if (file == ".DS_Store") {
    return
  }

  console.log(`Found file ${file}`)
  file = file.replace(/\.[^/.]+$/, "");
  // console.log(`Compiling ${file}`);
  const namespace = homeNameFixings[file] || file.toLowerCase();
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

files = fs.readdirSync('icons');
files.forEach(async (file, index) => {
  if (file == ".DS_Store" || file == "aws") {
    return
  }

  console.log(`Found file ${file}`)
  file = file.replace(/\.[^/.]+$/, "")
  // console.log(`Compiling ${file}`);
  const homeName = homeNameFixings[file] || file.toLowerCase();
  const homeUrl = urlsFixing[file] || `https://aws.amazon.com/${homeName}/`;
  console.log(file)
  console.log(consoleNameFixings[file] )
  // const consoleName = consoleNameFixings[file] || file.toLowerCase().replace(/-+/g, "");
  const consoleName = consoleNameFixings[file] || file.toLowerCase();
  console.log(`consoleName is ${consoleName}`)
  const consoleUrl = `https://console.aws.amazon.com/${consoleName}/`;

  console.log(`homeUrl is ${homeUrl}`)
  console.log(`consoleUrl is ${consoleUrl}`)
  
  await retry(async bail => {
    // if anything throws, we retry
    console.log(`homeUrl is ${homeUrl}`)
    console.log(`checking ${homeUrl}`)
    const res = await fetch(homeUrl)
    if (404 === res.status) {
      // don't retry upon 404
      console.log(`${homeUrl} not exists`)
      bail(new Error('NOT FOUND'))
      return
    }
    
    writeShortcutFile(destDir, file, homeUrl)

  }, {
    retries: 10
  })

  if (gotConsolePage(consoleName)){
    await retry(async bail => {
      // if anything throws, we retry
      console.log(`consoleUrl is ${consoleUrl}`)
      console.log(`checking ${homeUrl}`)
      const res = await fetch(consoleUrl)
      
      if (404 === res.status) {
        // don't retry upon 404
        console.log(`${consoleUrl} not exists`)
        bail(new Error('NOT FOUND'))
        return
      }

      consoleFile = `${file}-Console`
      writeShortcutFile(consoleDir, consoleFile, consoleUrl)

    }, {
      retries: 5
    })


    // urlExists(consoleUrl, function (err, exists) {
    //   // console.log(consoleUrl);
    //   // console.log(exists)
    //   // console.log(err)
    //   if (!exists) {
    //     console.log(`${consoleUrl} not exists`)
    //     return
    //   }
    // })
  }
  // console.log("\n")
})



function writeShortcutFile(destDir, file, url) {
    // fs.writeFileSync(`${destDir}/${file}.url`, `[InternetShortcut]\nURL=${homeUrl}`);
    // console.log(`write to ${destDir}/${file}.url`)
    // console.log("\n")
    // exec(`fileicon set ${destDir}/${file}.url icons/${file}.png`, function (error, stdout, stderr) {
    //   console.log(error || stdout);
    //   if (!error) {
    //     exec(`SetFile -a E ${destDir}/${file}.url`, function (error, stdout, stderr) {
    //       if (!error && index === files.length - 1) {
    //         exec(`open ${destDir}`);
    //       }
    //     });
    //   }
    // });
  
    fs.writeFileSync(`${destDir}/${file}.url`, `[InternetShortcut]\nURL=${url}`);
    console.log(`write to ${destDir}/${file}.url`)
    console.log("\n")
    icon = file.replace(/-Console/g, "")
    exec(`fileicon set ${destDir}/${file}.url icons/${icon}.png`, function (error, stdout, stderr) {
      console.log(error || stdout);
      if (!error) {
        exec(`SetFile -a E ${destDir}/${file}.url`, function (error, stdout, stderr) { });
      }
    });
}



exec(`open ${destDir}`);
