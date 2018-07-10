# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via the create-react-app server, and the back-end Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and back-end dependencies. You can do this with one command: `npm run setup` or `yarn setup`

After both installations are complete, run the following command in your terminal: `npm run dev` or `yarn dev`

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client thanks to the "proxy" setting defined in client/package.json.

## Deployment (Heroku)

The custom scripts defined in the main package.json file take care of this for you. Heroku already expects to see a "start" script, which we've defined as `node server.js`. We just need to make sure Heroku builds/transpiles your front-end React files.

Fortunately, there are other package.json scripts that Heroku will automatically look for. One of them is "heroku-postbuild," which will run after the initial installation. Again, we've already taken care of this and set it to the following command: `cd client && npm install && npm run build`

Verify that your server.js file is set up correctly to look for these files, as well as _not_ hard-coding the server port. For example:

```
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
```