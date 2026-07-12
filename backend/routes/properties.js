const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

const COLUMNS = {
  city:     'L_City',
  zipcode:  'L_Zip',
  price:    'L_SystemPrice',
  beds:     'L_Keyword2',   
  baths:    'LM_Dec_3'  
};

router.get('/', async (req, res) => {
  const {
    city, zipcode, minPrice, maxPrice,
    beds, baths,
    limit = 20,
    offset = 0
  } = req.query;

  const errors = [];

  const limitNum = Number(limit);
  const offsetNum = Number(offset);

  if (!Number.isInteger(limitNum) || limitNum <= 0 || limitNum > 100) {
    errors.push('limit must be an integer between 1 and 100');
  }
  if (!Number.isInteger(offsetNum) || offsetNum < 0) {
    errors.push('offset must be a non-negative integer');
  }
  if (minPrice !== undefined && isNaN(Number(minPrice))) {
    errors.push('minPrice must be a number');
  }
  if (maxPrice !== undefined && isNaN(Number(maxPrice))) {
    errors.push('maxPrice must be a number');
  }
  if (beds !== undefined && (!Number.isInteger(Number(beds)) || Number(beds) <= 0)) {
    errors.push('beds must be a positive integer');
  }
  if (baths !== undefined && (!Number.isInteger(Number(baths)) || Number(baths) <= 0)) {
    errors.push('baths must be a positive integer');
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors });
  }

  const conditions = [];
  const values = [];

  if (city) {
    conditions.push(`LOWER(TRIM(${COLUMNS.city})) = LOWER(TRIM(?))`);
    values.push(city);
  }
  if (zipcode) {
    conditions.push(`${COLUMNS.zipcode} = ?`);
    values.push(zipcode);
  }
  if (minPrice) {
    conditions.push(`${COLUMNS.price} >= ?`);
    values.push(Number(minPrice));
  }
  if (maxPrice) {
    conditions.push(`${COLUMNS.price} <= ?`);
    values.push(Number(maxPrice));
  }
  if (beds) {
    conditions.push(`${COLUMNS.beds} = ?`);
    values.push(Number(beds));
  }
  if (baths) {
    conditions.push(`${COLUMNS.baths} = ?`);
    values.push(Number(baths));
  }

  const whereClause = conditions.length > 0
    ? 'WHERE ' + conditions.join(' AND ')
    : '';

  try {
    const countQuery = `SELECT COUNT(*) as total FROM rets_property ${whereClause}`;
    const [countResult] = await pool.query(countQuery, values);
    const total = countResult[0].total;
	
    const dataQuery = `SELECT * FROM rets_property ${whereClause} LIMIT ? OFFSET ?`;
    const [rows] = await pool.query(dataQuery, [...values, limitNum, offsetNum]);

    res.json({
      total,
      limit: limitNum,
      offset: offsetNum,
      results: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Database error' });
  }
});

module.exports = router;

