# Got A Spot
Cool Beans Team project CS161

There are currently no other existing applications that provide both a reservation system and transparency on safety protocols of different attractions. Got A Spot is a website that allows all travelers find new places to explore and see how busy the location is. Through our website, users can have a streamlined experience when it comes to exploring possibilities, viewing location information, checking other visitors’ reviews, and ensuring that their visit comes on a day where they are most comfortable and safe.

### To access website via Heroku:
Link: https://gotaspotcoolbeans.herokuapp.com/

### Getting started: Set up Developer/test environment

Run the web application. 

You must also have the Chrome Redux extension installed to resolve "type error" compile issues.
The extension can be downloaded at https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd.

To start on launching the application, users must first clone the repository. Users can also download the zip file for the software package and run the app from that downloaded zip file after extracting the contents.

To clone the git repo (using terminal), go to the green “code” button and copy the HTTPS URL link to the clipboard. Then open up the terminal (Mac/Linux) or command prompt (Windows), and enter the following command in any directory of your choosing:
`git clone https://github.com/nichui/CS-161.git`

Note: Windows users must have `git` installed in their system. Git should already be installed in Mac/Linux systems.

Navigate to the `Ecommerce/client` folder in the directory and launch the front-end application by running `npm start`. Then navigate to the `Ecommerce/server` folder in the directory and launch the back-end application by running `npm start`. If there is no `npm` present in the environment, users must install `npm` (https://www.npmjs.com/get-npm). There may be node module dependency errors where some modules have to be installed independently (due to compatibility issues across different machines). In this case, the user must `npm install` in the client and server folders to download all dependencies specified in `package.json`.

Example output:
FRONTEND
```
sarah_chi@Sarahs-MBP client % npm start

> client@0.1.0 start <current path>
> react-scripts start

Starting the development server...
```
BACKEND
```
sarah_chi@Sarahs-MBP server % npm start

> server@1.0.0 start <current path>
> nodemon server.js

[nodemon] 2.0.6
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Server is running on port 8000
(node:10182) DeprecationWarning: Listening to events on the Db class has been deprecated and will be removed in the next major version.
DB CONNECTED
```

### Database MongoDB Cluster setup

We use MongoDB Atlas for our database. We store the data in a cloud database using MongoDB Atlas so that the resources data can be linked for all team members.
You can link MongoDB Compass (the GUI) to the cluster. 
You can log in through this link: https://account.mongodb.com/account/login to view the cluster and data. 

MongoDB Compass can be downloaded at https://www.mongodb.com/products/compass.

Set up Connection Security and connect to MongoDB Compass with the connection string. 
To deploy a new cluster, check out this external link to the MongoDB Cloud documentation: https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/#procedure.

This includes all the set up for development environment, backend, and testing.

Other tools we use are Robo3t and Postman for backend testing, which can also be downloaded and setup by connecting to the MongoDB cluster.
