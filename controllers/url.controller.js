var uniqid = require('uniqid');
const Url = require('../modals/url.modal');
const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');

async function createUrl(req, res) {
    const { mainUrl } = req.body;
    const user = req.user
    const shortID = uniqid.time()

    if (mainUrl && shortID && user) {
        try {
            await Url.create({
                shortID, mainUrl, createdBy: user._id
            })
            res.status(200).json({ msg: "success" })
        } catch (error) {
            console.log(error)
        }
    }

}

async function getUrl(req, res) {
    const { shortID } = req.params;
   

    if (shortID) {
        try {
            const urlEntry = await Url.findOne({ shortID })
            if(!urlEntry) return res.status(400).json({msg:"Url not found"})
                const ua = UAParser(req.headers['user-agent']);
            const geo = geoip.lookup(req.ip) || {};
        
            const clickData = {
                timestamp: new Date(),
                ip: req.ip,
                browser: `${ua.browser.name} ${ua.browser.version}`,
                os: `${ua.os.name} ${ua.os.version}`,
                device: ua.device.type || 'desktop',
                country: geo.country || '',
                region: geo.region || '',
                city: geo.city || '',
                userAgent: req.headers['user-agent'],
                language: req.headers['accept-language']?.split(',')[0],
                referrer: req.get('Referrer') || '',
            };

            urlEntry.clickInfo.push(clickData)
            await urlEntry.save();

            res.status(201).json({ url: urlEntry.mainUrl })
        } catch (error) {
            console.log(error)
            res.status(404).json({ msg: "Error fetching the url" })

        }
    }

}

async function getAllUrl(req, res) {
    const user = req.user
    try {
        const allUrls = await Url.find({ createdBy: user._id });
        res.json(allUrls)

    } catch (error) {
        res.status(400).json({ msg: "Error fetching urls" })
    }
}
async function deleteUrl(req, res) {
    const { urlID } = req.params;
    console.log(urlID)
    const user = req.user
    if (user && urlID) {
        try {
            await Url.findByIdAndDelete({ _id: urlID })
            res.json({ msg: "success" })
        } catch (error) {
            console.log(error)
        }
    }
}

async function getAllUsersUrl(req, res) {
    try {
        const allUrls = await Url.find()
        const shortIDs = allUrls.map((url) => { return url.shortID });
        res.status(200).json({ "allurls": shortIDs });

    } catch (error) {
        res.status(404).json({ msg: "Error fetching urls" })
    }
}

module.exports = { createUrl, getUrl, getAllUrl, deleteUrl, getAllUsersUrl }