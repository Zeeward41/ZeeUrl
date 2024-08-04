const advancedResults = (model) => async (req, res, next) => {
  let query

  const reqQuery = {...req.query}

  const removeFields = ['select', 'sort', 'page', 'limit']

  removeFields.forEach((param) => {delete reqQuery[param]})

  let queryStr = JSON.stringify(reqQuery)

  queryStr = queryStr.replace(/\b(gt|gte|let|lte|in)\b/g, match => `$${match}`)

  const parsedQuery = JSON.parse(queryStr)

  // Pagination
  const page = parseInt(req.query.page, 10) || 1 
  const limit = parseInt(req.query.limit, 10) || 10 


    req.advancedQuery = {
        filters: parsedQuery,
        select: req.query.select ? req.query.select.split(',').join(' ') : null,
        sort: req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt',
        page,
        limit
    }

  next()

}


const applyQueryOptions = (query, advancedQuery) => {

    const {select, sort, page, limit} = advancedQuery

    if (select) {
        query = query.select(select)
    }

    if (sort) {
        query = query.sort(sort)
    }

    const startIndex = (page - 1) * limit // 0 
    query = query.skip(startIndex).limit(limit)
    
    return query
}

const pagination = (query, advancedQuery, total) => {
    const {page, limit} = advancedQuery

    const startIndex = (page - 1) * limit // 0 
    const endIndex = page * limit //100
    const pagination = {}

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0) {
        pagination.prev = {
            page : page - 1,
            limit
        }
    }
    return pagination
}

export {advancedResults, applyQueryOptions, pagination}
