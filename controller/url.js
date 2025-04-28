const { Url } = require("../model/url");
const shortid = require('shortid');

exports.postUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'URL required' });

    try {
        let url = await Url.findOne({ longUrl });
        if (url) {
            return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortCode}` });
        }

        const shortCode = shortid.generate();
        url = new Url({ longUrl, shortCode });
        await url.save();

        res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

exports.getUrl = async (req, res) => {
    const { shortCode } = req.params;
    try {
        const url = await Url.findOne({ shortCode });
        if (url) {
            // return res.status(200).json({ longUrl: url.longUrl });
            // Or if you want to redirect:
            return res.redirect(301, url.longUrl);
        }
        res.status(404).json({ error: 'URL not found' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};