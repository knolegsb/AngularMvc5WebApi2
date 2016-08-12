using AngularMvc5WebApi2.Abstract;
using AngularMvc5WebApi2.Concrete;
using AngularMvc5WebApi2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularMvc5WebApi2.Controllers
{  
    public class ProductController : ApiController
    {
        static readonly IProductRepository repository = new ProductRepository();

        public IEnumerable<Product> GetAllProducts()
        {
            return repository.GetAll();
        }

        public Product PostProduct(Product item)
        {
            return repository.Add(item);
        }

        public IEnumerable<Product> PutProduct(int id, Product product)
        {
            product.Id = id;
            if (repository.Update(product))
                return repository.GetAll();
            else
                return null;
        }

        public bool DeleteProduct(int id)
        {
            if (repository.Delete(id))
                return true;
            else
                return false;
        }
    }
}
