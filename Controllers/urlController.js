const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');
const validUrl = require('valid-url');
const dotenv = require('dotenv');
dotenv.config();
const { BASE_URL } = process.env;

exports.createShortUrl = async (req, res) => {
  const { longUrl, customAlias } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ message: 'Invalid long URL' });
  }

  try {
    let shortCode;

    if (customAlias) {
      const existing = await Url.findOne({ customAlias });
      if (existing) return res.status(409).json({ message: 'Custom alias already taken' });

      shortCode = customAlias;
    } else {
      shortCode = generateCode();
    }

    const newUrl = new Url({
      shortCode,
      longUrl,
      customAlias: customAlias || null,
    });

    await newUrl.save();

    res.status(201).json({
      shortUrl: `${BASE_URL}/${shortCode}`,
      shortCode,
      longUrl,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.redirectShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) return res.status(404).json({ message: 'Short URL not found' });

    urlDoc.visitCount++;
    urlDoc.lastAccessed = new Date();
    await urlDoc.save();

    res.redirect(urlDoc.longUrl);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) return res.status(404).json({ message: 'Short URL not found' });

    res.json({
      shortCode,
      longUrl: urlDoc.longUrl,
      createdAt: urlDoc.createdAt,
      lastAccessed: urlDoc.lastAccessed,
      visitCount: urlDoc.visitCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
