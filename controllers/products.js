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
  //select
  if(fields){
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const products = await result

  res.status(200).json({nbHits: products.length,products})
  
}

const getAllProductsStatic = async (req,res)=>{
   
    const products = await Product.find({})
    .sort('-name price')
    .select('name price')
    res.status(200).json({ nbHits: products.length,products})

}

module.exports = {getAllProducts,
                    getAllProductsStatic,
                }
