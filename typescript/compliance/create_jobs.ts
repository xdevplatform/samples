import { Client } from '@xdevplatform/xdk';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// For User Compliance Job, replace type value with users instead of tweets
// Also replace the name value with your desired job name
const data = {
    type: 'tweets' as const,
    name: 'my_batch_compliance_job'
};

(async () => {
    try {
        // Make request
        const response = await client.compliance.createJobs(data);
        
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
