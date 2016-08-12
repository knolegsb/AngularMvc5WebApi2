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
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        public Product Add(Product item)
        {
            if(item == null)
            {
                throw new ArgumentNullException("item");
            }
            db.Products.Add(item);
            db.SaveChanges();
            return item;
        }

        public bool Delete(int id)
        {
            var product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
            return true;
        }

        public Product Get(int id)
        {
            return db.Products.Find(id);
        }

        public IEnumerable<Product> GetAll()
        {
            return db.Products;
        }

        public bool Update(Product item)
        {
            var product = db.Products.Single(p => p.Id == item.Id);
            product.Name = item.Name;
            product.Category = item.Category;
            product.Price = item.Price;
            db.SaveChanges();

            return true;
        }
    }
}