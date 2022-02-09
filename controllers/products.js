const Product = require('../models/product')

const getAllProducts = async(req,res)=>{
    const {name,company,featured} = req.query
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true'?true:false;
    }
    if(company){
        queryObject.company = company
  }
  if(name){
      queryObject.name = name;
  }
  console.log(queryObject)
  const products = await Product.find(queryObject)
  res.status(200).json({products, nbHits: products.length})
   }

const getAllProductsStatic = async (req,res)=>{
    const name = req.query.name
    const products = await Product.find({name})
    console.log(req.query.name)
    res.status(200).json({products, nbHits: products.length})

}

module.exports = {getAllProducts,
                    getAllProductsStatic,
                }
