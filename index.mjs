import express from 'express';
import fech from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
import 'dotenv/config'

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let apiKey = process.env.BGapiKey;
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })

});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    res.render('planet', { planetInfo, planetName });
});

app.get('/nasa', async (red, res) => {
    let apiKey = process.env.NASAapiKey;
    let url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${apiKey}&date=today`;
    let response = await fetch(url);
    let pod_data = await response.json();

    res.render("nasa", {
        "podImage": pod_data[0].hdurl,
        "podAlt": pod_data[0].alt,
        "podExplanation": pod_data[0].explanation,
        "podDate": pod_data[0].date
    })

});

app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', { planetEarth });
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    console.log(planetMars);
    res.render('mars', { planetMars });
});

app.listen(3000, () => {
    console.log('server started');
});
