import csv from "csvtojson";
import { getFileById, deleteFileById } from "../models/file.repository.js";
import url from "url";

export default class CSVController {
  /*
    
  */
  constructor() {
    this.file = null;
    this.rowsPerPage = parseInt(process.env.ROWS_PER_PAGE) || 100;
  }

  /*
    This function handles all view operations as below:
    - Parsing CSV file into Javascript object
    - Render view to display csv data
    - Filtering data based on search query
    - Pagination for raw as well as filtered data

    The function uses query parameters to serve above functionalities
  */
  async viewFile(req, res, next) {
    try {
      const fileObj = await getFileById(req.params.id);

      let results, filtered;

      // To efficiently load and use csv files, a file is parsed only once, unless a different file is
      // chosen to view
      if (!this.file || this.file.id != req.params.id) {
        results = await csv().fromFile(fileObj.url);
        this.file = {
          id: fileObj._id,
          name: fileObj.name,
          data: results,
          headers: Object.keys(results[0]),
        };
      } else if (req.query.searchCol && req.query.searchInput) {
        results = this.search(req);
        this.fileteredData = results;
        filtered = true;
      } else if (req.query.filtered == "true") {
        results = this.fileteredData;
      } else {
        results = this.file.data;
      }

      // Pagination Logic starts here
      const totalPages = Math.ceil(results.length / this.rowsPerPage);
      const currentPage = parseInt(req.query.page) || 1;

      const start = (currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      // Pagination logic ends here

      const file = {
        id: fileObj._id,
        name: fileObj.name,
        // Sending paginated data
        data: results.slice(start, end),
        headers: this.file.headers,
        currentPage: currentPage,
        totalPages: totalPages,
        filtered: filtered,
      };

      res.render("csv.ejs", { file });
    } catch (err) {
      console.log(err.message);
      if (err.message.includes("File does not exist")) {
        await deleteFileById(req.params.id);
        return res.redirect(
          url.format({
            pathname: "/",
            query: {
              fileError: true,
            },
          })
        );
      }
      next(err);
    }
  }

  // Function to filter data based on search parameters
  search(req) {
    let col = req.query.searchCol;
    let input = req.query.searchInput;

    let filteredRows;

    if (input.trim() == "" || col.trim() == "") {
      filteredRows = this.file.data;
    } else {
      input = input.toLowerCase();

      filteredRows = this.file.data.filter((row) =>
        row[col].toLowerCase().includes(input)
      );
    }

    return filteredRows;
  }
}
