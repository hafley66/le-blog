const fs = require("fs");
const crypto = require("crypto");
const puppeteer = require("puppeteer");
const path = require("path");

const HTML_FILE = "/var/www/html/index.html";
const CACHE_DIR = "/var/www/html/.cache/";

async function generatePDF() {
  // Read and hash the HTML file
  const htmlContent = fs.readFileSync(HTML_FILE, "utf-8");
  const hash = crypto
    .createHash("sha256")
    .update(htmlContent)
    .digest("hex")
    .slice(0, 16);
  const pdfFilename = `index.${hash}.pdf`;
  const pdfPath = path.join(CACHE_DIR, pdfFilename);

  // Check if PDF already exists
  if (fs.existsSync(pdfPath)) {
    console.log(pdfFilename);
    return;
  }

  // Generate PDF with Puppeteer
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`file://${HTML_FILE}`, { waitUntil: "networkidle2" });
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  console.log(pdfFilename);
}

generatePDF()
  .catch(err => {
    console.error("Error generating PDF:", err);
    process.exit(1);
  })
  .then(() => process.exit(0));
