const Product = require('../models/product')

const getAllProducts = async(req,res)=>{
    const {name,company,featured,sort,fields} = req.query
    //empty queryObject
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true'?true:false;
    }
    if(company){
        queryObject.company = company
  }
  if(name){
      //regex
      queryObject.name = { $regex: name, $options: 'i'}
  }

  console.log(queryObject)

  let result = Product.find(queryObject)
  //sort
  if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
  }else{
        result = result.sort('createdAt')
  }
  //select fields to display
  if(fields){
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  //skip to passed page
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1)*limit
  result = result.skip(skip).limit(limit)

  const products = await result

  res.status(200).json({nbHits: products.length,products})
  
}

const getAllProductsStatic = async (req,res)=>{
   
    const products = await Product.find({})
    .sort('-name price')
    .select('name price')
    .skip(5)
    .limit(10)
    
    res.status(200).json({ nbHits: products.length,products})

}

module.exports = {getAllProducts,
                    getAllProductsStatic,
                }
