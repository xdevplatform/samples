const { Client } = require('@xdevplatform/xdk');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;
const client = new Client({ bearerToken: token });

// For User Compliance job, replace "tweets" with "users"
const jobType = "tweets";

(async () => {
    try {
        // Make request
        const response = await client.compliance.getJobs(jobType);
        
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
