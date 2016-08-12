using AngularMvc5WebApi2.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AngularMvc5WebApi2.Models;

namespace AngularMvc5WebApi2.Concrete
{
    public class ProductRepository : IProductRepository
    {
        public Product Add(Product item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Product Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Product> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool Update(Product item)
        {
            throw new NotImplementedException();
        }
    }
}