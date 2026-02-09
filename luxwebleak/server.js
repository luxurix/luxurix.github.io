const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(express.static('.'))

app.get('/info', async (req,res) => {
    const webhook = req.query.webhook
    if (!webhook) return res.status(400).json({error:'no webhook'})
    try {
        const r = await fetch(webhook)
        const data = await r.json()
        res.json(data)
    } catch (e) { res.json({error:'invalid webhook'}) }
})

app.post('/terminate', async (req,res) => {
    const {webhook} = req.body
    if (!webhook) return res.status(400).json({status:'no webhook'})
    try {
        await fetch(webhook, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: "luxwebleak",
                content: "@everyone",
                embeds: [{
                    title: "Webhook Leaked",
                    description: "Your webhook haws been leaked and has therefore been deleted. Contact `luxurix.` on discord for help.",
                    color: 14417920
                }]
            })
        })
        res.json({status:'terminated'})
    } catch(e) {
        res.json({status:'failed'})
    }
})

app.listen(3000,()=>console.log('running on http://localhost:3000'))
