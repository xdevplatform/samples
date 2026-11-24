import * as fs from 'node:fs';

// Replace with your job download_url
const uploadUrl = '';

// Replace with your file path that contains the list of Post IDs or User IDs, one ID per line
const filePath = '/path/to/file';

async function getRequest() {
    const readStream = fs.createReadStream(filePath);
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        readStream.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        readStream.on('end', () => resolve(Buffer.concat(chunks)));
        readStream.on('error', reject);
    });

    const res = await fetch(uploadUrl, {
        method: 'PUT',
        body: new Uint8Array(fileBuffer),
        headers: {
            "Content-Type": "text/plain"
        }
    });

    if (res.ok) {
        return res.status;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {
    try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
