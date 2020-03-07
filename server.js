const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: 'https://avatars1.githubusercontent.com/u/46997650?s=460&v=4 alt="Gerberson Dias"',
        name: "Gerberson Dias",
        role: "Analista de Sistemas",
        description: 'Foco em desenvolvimento em sistemas web, desktop e mobile. Sistemas com design responsivo e elegante',
        links: [
            {name: "Github", url: "https://www.github.com/gerberson/"},
            {name: "LinkedIn", url: "https://www.linkedin.com/in/gerberson"},
            {name: "(12) 99221-9391", url: "tel:+5512992219391"}
        ]
    }
    return res.render('about', { about })
})

server.get("/portifolio", function(req, res) {
    return res.render('portifolio', {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if(!video) {
        return res.send("Video not found!")
    }

    return res.render('video', { item: video })
    
    //return res.send(id)
})

server.listen(5000, function(){
    console.log('server is running')
})