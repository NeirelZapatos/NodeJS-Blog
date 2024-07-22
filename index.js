import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const blog = [
    {
        title: "Lorem Ipsum",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, eros aliquam rhoncus sollicitudin, urna nisl rutrum justo, a rhoncus neque sapien at ligula. Ut magna orci, efficitur vitae porttitor eget, sagittis et risus. Phasellus vel dictum mi. Sed in fringilla magna. Nulla pulvinar malesuada metus porta auctor. Aliquam in sem aliquam, tempor massa eu, varius nisl. Ut feugiat lacinia est a semper. In tortor elit, cursus fermentum tincidunt vitae, facilisis in nulla. Nullam consectetur ex sit amet volutpat feugiat. Pellentesque non finibus tellus. Mauris luctus ipsum orci, eget luctus nisl dictum sed. Mauris vitae massa a augue ornare venenatis eu eu urna. Sed interdum, nunc vel lacinia suscipit, lorem libero consectetur quam, ac commodo nisi ante eget turpis. Proin ultricies augue sit amet tortor maximus aliquet. Duis ullamcorper, lorem eget luctus fermentum, tellus magna laoreet leo, non luctus urna orci et ligula.",
        date: "11-23-2023"
    },
    {
        title: "The Evolution of Web Development",
        message: "Web development has come a long way from static HTML pages to dynamic, interactive websites and web applications. The rise of frameworks like React, Angular, and Vue.js has revolutionized front-end development, while Node.js has empowered developers to use JavaScript for server-side programming. As we move towards more complex applications, the focus on performance, user experience, and accessibility continues to grow. The future promises even more exciting developments with the advent of WebAssembly and the increasing adoption of progressive web apps.",
        date: "12-15-2023"
    },
    {
        title: "Understanding JavaScript Closures",
        message: "JavaScript closures are a fundamental concept that can be initially confusing but are crucial for mastering the language. A closure occurs when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope. This powerful feature allows for the creation of private variables and methods, enhancing modularity and security in JavaScript applications. By harnessing closures, developers can write more efficient and maintainable code.",
        date: "01-01-2024"
    },
    {
        title: "The Importance of Responsive Design",
        message: "In today's multi-device world, responsive design has become a necessity rather than a luxury. A responsive website adjusts seamlessly to different screen sizes, providing an optimal viewing experience across devices from desktops to smartphones. This approach not only improves usability but also boosts SEO rankings as search engines favor mobile-friendly websites. Embracing responsive design principles ensures that your site remains accessible and appealing to a wider audience, regardless of the device they use.",
        date: "02-14-2024"
    },
    {
        title: "The Power of Node.js in Backend Development",
        message: "Node.js has transformed backend development by enabling developers to use JavaScript for server-side programming. Its non-blocking, event-driven architecture allows for handling numerous simultaneous connections with high performance, making it ideal for real-time applications like chat apps and online gaming. With a rich ecosystem of libraries and a strong community, Node.js continues to be a popular choice for building scalable and efficient server-side applications.",
        date: "03-12-2024"
    },
    {
        title: "Exploring Machine Learning with Python",
        message: "Python has become the go-to language for machine learning due to its simplicity and the abundance of libraries and frameworks available. Libraries like TensorFlow, Keras, and Scikit-learn provide robust tools for developing and deploying machine learning models. Python's readability and extensive community support make it accessible for beginners and powerful for experts. As machine learning continues to evolve, Python remains at the forefront, driving innovations in various fields such as healthcare, finance, and autonomous systems.",
        date: "04-01-2024"
    }
];


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// home page
app.get("/", (req, res) => {
    console.log(`Connecting to port ${port}`);
    res.render(__dirname + "/views/index.ejs", {
        posts: blog
    });
});

// creating new posts
app.post("/submit", (req, res) => {
    console.log("Submitting new post");

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;

    blog.push({
        title: req.body["title"],
        message: req.body["message"],
        date: today
    });
    
    console.log(blog);
    res.redirect("/");
});

// page to update posts
app.get("/update-page/:index", (req, res) => {
    res.render(__dirname + "/views/update-page.ejs", {
        posts: blog,
        postIndex: req.params.index
    });
});

// page to view post
app.get("/view-page/:index", (req, res) => {
    res.render(__dirname + "/views/view-page.ejs", {
        posts: blog,
        postIndex: req.params.index
    });    
});

// updates posts
app.post("/update/:index", (req, res) => {
    blog[req.params.index]["title"] = req.body["newTitle"];
    blog[req.params.index]["message"] = req.body["newMessage"];
    res.redirect("/");
});

// deletes a post
app.get("/delete/:index", (req, res) => {
    blog.splice(req.params.index, 1);
    console.log(blog);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});