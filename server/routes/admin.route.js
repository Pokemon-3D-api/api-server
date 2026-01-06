import express from 'express';

const router = express.Router();

let blacklist = [];

const checkAdminKey = (req, res, next) => {
    const adminKey = req.headers['x-api-key'];
    const secret = process.env.ADMIN_SECRET_KEY;

    if (!adminKey || adminKey !== secret) {
        return res.status(401).json({ error: 'Unauthorized: Invalid Admin Key' });
    }
    next();
};

router.get('/blacklist', checkAdminKey, (req, res) => {
    res.json({ blacklist });
});

router.post('/blacklist', checkAdminKey, express.json(), (req, res) => {
    const { ip, action } = req.body;

    if (!ip || !action || (action !== 'add' && action !== 'remove')) {
        return res.status(400).json({ error: 'Invalid request. Provide "ip" and "action".' });
    }

    if (action === 'add') {
        if (!blacklist.includes(ip)) blacklist.push(ip);
    } else if (action === 'remove') {
        blacklist = blacklist.filter((blacklistedIp) => blacklistedIp !== ip);
    }

    res.json({ 
        message: `IP ${ip} ${action}ed successfully.`, 
        currentBlacklist: blacklist 
    });
});

export { router as adminRouter, blacklist };