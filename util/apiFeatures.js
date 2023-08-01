class ApiFeatures {

    constructor(mongossequry, querystring) {
        this.mongossequry = mongossequry;
        this.querystring = querystring;
    }



    filter() {
        console.log('filter passed')
        const querystringobj = {...this.querystring };
        const exculdesfilds = ['page', 'sort', 'limit', 'fildes']
            // eslint-disable-next-line no-delete-var
        exculdesfilds.forEach((fildes) => delete querystringobj[fildes])
            //aplly filtration on[gte|gt|lt|lte]
        let querystr = JSON.stringify(querystringobj);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
        this.mongossequry = this.mongossequry.find(JSON.parse(querystr))

        return this

    }

    sort() {
        console.log('sort passed')
        if (this.querystring.sort) {
            const sortby = this.querystring.sort.split(',').join(' ') //to remove ,
            this.mongossequry = this.mongossequry.sort(sortby)
        } else {
            this.mongossequry = this.mongossequry.sort('-createAt')
        }
        return this

    }

    limitFiled() {
        console.log('passed')
        if (this.querystring.fields) {
            const fildes = this.querystring.fields.split(',').join(' ') //to remove ,
            this.mongossequry = this.mongossequry.select(fildes)
        } else {
            this.mongossequry = this.mongossequry.select('-__v')
        }

        return this
    }

    search(modelName, queryArgs) {
        //console.log(this.querystring)
        console.log('search passed')
        if (queryArgs.keyword) {
            let query = {};
            if (modelName === 'Products') {
                query.$or = [
                    { title: { $regex: queryArgs.keyword, $options: 'i' } },
                    { description: { $regex: queryArgs.keyword, $options: 'i' } },
                ];
            } else {
                query = { name: { $regex: queryArgs.keyword, $options: 'i' } }
            }

            this.mongossequry = this.mongossequry.find(query);
        }


        return this
    }



    paginate(countDocument) {
        console.log('paginate passed')
        const page = this.querystring.page * 1 || 1
        const limit = this.querystring.limit * 1 || 50
        const skip = (page - 1) * limit //(2-1)*5=5=>max length of doc in every page
        const endIndex = page * limit;
        //pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPage = Math.ceil(countDocument / limit);

        //next page
        if (endIndex < countDocument) {
            pagination.next = page + 1;
        }
        if (skip > 0) {
            pagination.prev = page - 1
        }
        this.mongossequry = this.mongossequry.skip(skip).limit(limit)
        this.paginationResult = pagination;
        return this
    }
}

module.exports = ApiFeatures;