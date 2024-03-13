const redis = require('redis');

// Class definition
class RedisClient {
    constructor() {
        this.client = redis.createClient(); // Create the Redis client

        // Error handler
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    // Check if the connection is alive
    async isAlive() {
        return new Promise((resolve) => {
            this.client.ping((err, result) => {
                resolve(err === null && result === 'PONG');
            });
        });
    }

    // Retrieve a value from Redis
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    // Set a value in Redis with optional expiration
    async set(key, value, durationInSeconds) {
        return new Promise((resolve, reject) => {
            if (durationInSeconds) {
                this.client.set(key, value, 'EX', durationInSeconds, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } else {
                this.client.set(key, value, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    }

    // Delete a key from Redis
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient; 
