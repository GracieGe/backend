const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Obtain all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM "Categories"');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;