class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },

          // isDeleted: false,
        }
      : {
          // isDeleted: false
        };

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // console.log(queryCopy);

    // removing fields

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);

    // console.log(queryStr);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // console.log(queryStr);

    queryStr = JSON.parse(queryStr);

    // console.log(queryStr);

    this.query = this.query.find(queryStr);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = Number((currentPage - 1) * resultPerPage);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
