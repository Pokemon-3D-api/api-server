import express from 'express';
import NodeCache from 'node-cache';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const projectRoot = path.resolve();

const cache = new NodeCache({
    stdTTL: 600,
    checkperiod: 120,
    useClones: false, 
});

const FILE_PATH = path.join(projectRoot, 'json', 'MergedOpt.json');
const CACHE_KEY = 'pokemon-all';

let refreshPromise = null;

async function refreshCache() {
    try {
        const fileData = await fs.readFile(FILE_PATH, 'utf8');
        const jsonData = JSON.parse(fileData);
        const data = jsonData.pokemon || jsonData;

        cache.set(CACHE_KEY, data);
        console.log('[CACHE] Refresh success');

        return data;
    } catch (error) {
        console.error('[CACHE] Refresh failed:', error.message);
        throw error;
    }
}

async function getPokemonData() {
    const cachedData = cache.get(CACHE_KEY);

    if (cachedData) {
        if (!refreshPromise) {
            refreshPromise = refreshCache()
                .finally(() => {
                    refreshPromise = null;
                });
        }

        console.log('[CACHE] Hit — serving cached data');
        return cachedData;
    }

    console.log('[CACHE] Miss — loading data');

    if (!refreshPromise) {
        refreshPromise = refreshCache()
            .finally(() => {
                refreshPromise = null;
            });
    }

    return await refreshPromise;
}

router.get('/ping', (_req, res) => {
    res.status(200).send('pong');
});

router.get('/pokemon', async (_req, res) => {
    try {
        const data = await getPokemonData();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to load Pokémon data',
        });
    }
});

export default router;
