import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// Replace with your job ID
const jobId = '';

(async () => {
    try {
        // Make request
        const response = await client.compliance.getJobsById(jobId);
        
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
