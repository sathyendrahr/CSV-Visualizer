_**CSV Visulalizer**_ is an online tool to upload and view CSV files. The app also features filtering data using search parameters, pagination for beter performance nad visulaization tool for plotting chart for column data. The app is based on MVC pattern and developed using express & ejs.

**How to use this repo?**

1. Clone the repo or download the source code and extract files
2. _**src**_ holds source code for models, views, controllers, & middlewares
3. Environment Variables used
     **DB_URL**: MongoDB server URI
     SERVER_PORT: Listening port for express server
     ROWS_PER_PAGE: For pagination
4. Open terminal and navigate to project root directory.
5. Make sure Node.js (v16.x and above) is installed. You can confirm by running **_node -version_**
6. Also mongoDB should be up and running
7. To install all dependency packages, run _**npm install**_
8. Start the server: _**node server.js**_
9. Open a web browser and access the application with application url: http://localhost:port/
10. Demo application can be viewed here: **_https://csv-visualizer-rqjh.onrender.com_**
