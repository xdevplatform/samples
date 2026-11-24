// Replace with your job download_url
const downloadUrl = '';

async function getRequest() {
    const res = await fetch(downloadUrl, {
        headers: {
            'Accept-Encoding': 'gzip, deflate, br'
        }
    })

    if (res.ok) {
        return await res.text();
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