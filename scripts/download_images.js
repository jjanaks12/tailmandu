#!/usr/bin/env node
/**
 * Image Downloader Script (JavaScript/Node.js)
 * Downloads images from a list of URLs and saves them to a local directory.
 *
 * Usage:
 *   node download_images.js <url_file> [output_dir] [max_concurrent]
 *   node download_images.js --urls <url1> <url2> ... [output_dir]
 *
 * Examples:
 *   node download_images.js urls.txt downloads 10
 *   node download_images.js --urls https://example.com/image1.jpg https://example.com/image2.jpg downloads
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');


/**
 * Extract filename from URL or generate one
 */
function extractFilename(url, defaultName = null) {
    try {
        const parsed = new URL(url);
        let filename = path.basename(parsed.pathname);

        if (!filename || !filename.includes('.')) {
            // Generate a timestamp-based name if URL doesn't have a proper filename
            if (defaultName) {
                return `${defaultName}_${Date.now()}.jpg`;
            }
            return `image_${Date.now()}.jpg`;
        }

        return filename;
    } catch (error) {
        return defaultName ? `${defaultName}_${Date.now()}.jpg` : `image_${Date.now()}.jpg`;
    }
}


/**
 * Download a single image from URL
 */
async function downloadImage(url, outputDir, timeout = 30000) {
    return new Promise((resolve) => {
        try {
            const parsedUrl = new URL(url);
            const protocol = parsedUrl.protocol === 'https:' ? https : http;

            const req = protocol.get(url, { timeout }, (res) => {
                // Check if it's an image
                const contentType = res.headers['content-type'] || '';
                if (!contentType.includes('image')) {
                    resolve([null, `URL does not point to an image (content-type: ${contentType})`]);
                    return;
                }

                // Handle redirects
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    // Follow redirect (simple version - just one redirect)
                    protocol.get(res.headers.location, { timeout }, (redirectRes) => {
                        const chunks = [];
                        redirectRes.on('data', (chunk) => chunks.push(chunk));
                        redirectRes.on('end', () => saveImage(chunks, url, outputDir, resolve));
                    }).on('error', (err) => {
                        resolve([null, `Redirect error: ${err.message}`]);
                    });
                    return;
                }

                if (res.statusCode !== 200) {
                    resolve([null, `HTTP ${res.statusCode}: ${res.statusMessage}`]);
                    return;
                }

                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => saveImage(chunks, url, outputDir, resolve));
            });

            req.on('error', (err) => {
                resolve([null, `Request error: ${err.message}`]);
            });

            req.on('timeout', () => {
                req.destroy();
                resolve([null, `Request timeout after ${timeout}ms`]);
            });
        } catch (error) {
            resolve([null, `Invalid URL: ${error.message}`]);
        }
    });
}


/**
 * Save image data to file
 */
function saveImage(chunks, url, outputDir, resolve) {
    try {
        const filename = extractFilename(url);
        let outputPath = path.join(outputDir, filename);

        // Handle filename conflicts
        let counter = 1;
        while (fs.existsSync(outputPath)) {
            const name = path.parse(filename).name;
            const ext = path.parse(filename).ext;
            outputPath = path.join(outputDir, `${name}_${counter}${ext}`);
            counter++;
        }

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write file
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);

        resolve([outputPath, null]);
    } catch (error) {
        resolve([null, `Save error: ${error.message}`]);
    }
}


/**
 * Download images from an array of URLs with concurrency control
 */
async function downloadImages(urls, outputDir = 'downloads', maxConcurrent = 5) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!urls || urls.length === 0) {
        console.log('No URLs provided.');
        return;
    }

    console.log(`Found ${urls.length} URLs. Starting download...`);
    console.log(`Output directory: ${outputDir}`);
    console.log(`Max concurrent downloads: ${maxConcurrent}\n`);

    let successful = 0;
    let failed = 0;

    // Process URLs in batches to limit concurrency
    for (let i = 0; i < urls.length; i += maxConcurrent) {
        const batch = urls.slice(i, i + maxConcurrent);
        const promises = batch.map(url => downloadImage(url, outputDir));

        const results = await Promise.allSettled(promises);

        results.forEach((result, index) => {
            const url = batch[index];
            if (result.status === 'fulfilled') {
                const [outputPath, error] = result.value;
                if (outputPath) {
                    console.log(`✓ ${url} -> ${outputPath}`);
                    successful++;
                } else {
                    console.log(`✗ ${url} -> ${error}`);
                    failed++;
                }
            } else {
                console.log(`✗ ${url} -> Exception: ${result.reason}`);
                failed++;
            }
        });
    }

    console.log('\n' + '='.repeat(50));
    console.log('Download complete!');
    console.log(`Successfully downloaded: ${successful}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${urls.length}`);

    return { successful, failed, total: urls.length };
}


/**
 * Read URLs from a file (one per line, ignore empty lines and comments)
 */
function readUrlsFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File '${filePath}' not found.`);
        process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const urls = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'));

    return urls;
}


/**
 * Print usage information
 */
function printUsage() {
    console.log(`Usage:
  ${process.argv[1]} <url_file> [output_dir] [max_concurrent]
  ${process.argv[1]} --urls <url1> <url2> ... [output_dir]

Examples:
  ${process.argv[1]} urls.txt downloads 10
  ${process.argv[1]} --urls https://example.com/image1.jpg https://example.com/image2.jpg downloads

Or use as a module:
  const { downloadImages, readUrlsFromFile } = require('./${path.basename(process.argv[1])}');
  downloadImages(['url1', 'url2'], 'my_folder');`);
}


// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        printUsage();
        process.exit(1);
    }

    // Check if using --urls flag for direct URL list
    if (args[0] === '--urls') {
        const urls = args.slice(1, -1);
        const outputDir = args[args.length - 1] || 'downloads';
        const maxConcurrent = 5;

        downloadImages(urls, outputDir, maxConcurrent)
            .then(() => process.exit(0))
            .catch(err => {
                console.error('Error:', err);
                process.exit(1);
            });
    } else {
        const urlFile = args[0];
        const outputDir = args[1] || 'downloads';
        const maxConcurrent = parseInt(args[2]) || 5;

        const urls = readUrlsFromFile(urlFile);
        downloadImages(urls, outputDir, maxConcurrent)
            .then(() => process.exit(0))
            .catch(err => {
                console.error('Error:', err);
                process.exit(1);
            });
    }
}

// Export functions for module usage
module.exports = {
    downloadImages,
    readUrlsFromFile,
    extractFilename,
    downloadImage
};
