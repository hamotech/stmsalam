const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'registry.npmjs.org',
  port: 443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false // We bypass to capture the certificate
};

const req = https.request(options, (res) => {
  const cert = res.socket.getPeerCertificate(true);
  
  if (!cert || Object.keys(cert).length === 0) {
    console.error("No certificate found.");
    process.exit(1);
  }

  // Walk up the certificate chain to find the Root CA
  let current = cert;
  let certs = [];
  
  while (current) {
    console.log(`Found Cert: ${current.subject.CN} (Issuer: ${current.issuer.CN})`);
    
    // PEM format formatting
    let b64 = current.raw.toString('base64');
    let pem = '-----BEGIN CERTIFICATE-----\n';
    for (let i = 0; i < b64.length; i += 64) {
      pem += b64.slice(i, i + 64) + '\n';
    }
    pem += '-----END CERTIFICATE-----\n';
    certs.push(pem);
    
    // Break if self-signed or no parent
    if (current.fingerprint === current.issuerCertificate?.fingerprint || !current.issuerCertificate) {
      break;
    }
    current = current.issuerCertificate;
  }
  
  // Write the root cert (last in the chain) to a file
  const rootCert = certs[certs.length - 1];
  fs.writeFileSync('proxy-ca.pem', rootCert);
  console.log("Root CA certificate exported to proxy-ca.pem");
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
