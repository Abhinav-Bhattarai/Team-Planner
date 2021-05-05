import redis from 'async-redis';

const cache = redis.createClient();

export const TeamListCache = async (cache_id) => {
    const value = await cache.get(`${cache_id}/todo_list`);
    return value;
};

export const TeamDataCache = async (cache_id) => {
    const value = await cache.get(`${cache_id}/teamData`);
    return value;
}