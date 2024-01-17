import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware to log all requests
app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/test", (req, res) => {
    res.send("Hello World! The server is up and working!");
});

app.post("/submit", (req, res) => {
    res.send("Hello World! The server is up and working!");
});

// app.post("/generate-shorturl", async (req, res) => {
//     let url = req.query.url as string;

//     if (url == undefined) {
//         res.json({ error: "Please include a url" }).status(404);
//         return;
//     }

//     let shortURL = await addToDB(url);

//     if (shortURL == -1) {
//         res.json({ error: "Try again in some time" }).status(500);
//     }

//     res.json({ shortlink: shortURL });
// });

// app.get("/s/:key", async (req: Request<{ key: string }>, res) => {
//     // get the id and figure out the actual url and redirect them(302)
//     let key = req.params.key;

//     try {
//         let link = await db.link.findUnique({
//             where: {
//                 key,
//             },
//             select: {
//                 url: true,
//             },
//         });
//         if (link == null || link.url == null) {
//             res.json({ error: "Not Found" }).status(404);
//             return;
//         }
//         res.redirect(link?.url);
//     } catch (error) {
//         console.log(error);
//         res.json({ error: "Not Found" }).status(404);
//     }
// });

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
