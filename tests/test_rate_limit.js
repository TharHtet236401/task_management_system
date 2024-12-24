import fetch from 'node-fetch';

const testRateLimit = async () => {
        const url = 'http://127.0.0.1:3000/api/user/dummy-rate-limit';
        const requests = Array(150).fill(null); // Create 150 requests (more than our limit of 100)
    
    console.log('Starting rate limit test...');
    
    for (let i = 0; i < requests.length; i++) {
        try {
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            console.log(`Request ${i + 1}: Status ${response.status}`);
        } catch (error) {
            console.log(`Request ${i + 1}: Failed - ${error.message}`);
        }
        // Small delay to make output readable
        await new Promise(resolve => setTimeout(resolve, 100));
    }
};

testRateLimit();