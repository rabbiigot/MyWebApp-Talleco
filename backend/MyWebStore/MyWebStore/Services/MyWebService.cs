using LiteDB;
using Microsoft.AspNetCore.Mvc;
using MyWebStore.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MyWebStore.Services
{
    public class MyWebService
    {
        private readonly string _localDB;

        public MyWebService(IConfiguration configuration)
        {
            _localDB = configuration.GetValue<string>("ConnectionStrings:LocalDbPath");
        }

        public IActionResult AddOrder(OrderItems order)
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var orders = db.GetCollection<OrderItems>("orders");
                orders.Insert(order);
            }
            return new OkObjectResult(new { message = "Order added succesfully!" });
        }

        public IActionResult GetAllOrders()
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var orders = db.GetCollection<OrderItems>("orders");
                var allOrders = orders.FindAll().ToList();
                return new OkObjectResult(allOrders);
            }
        }

        public IActionResult FindId(int id)
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var orders = db.GetCollection<OrderItems>("orders");
                var order = orders.Find(x => x.Id == id).FirstOrDefault();
                return new OkObjectResult(order);
            }
        }

        public IActionResult Delete(int id)
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var orders = db.GetCollection<OrderItems>("orders");
                var order = orders.Delete(id);
            }
            return new OkObjectResult(new { message = "Order deleted succesfully!" });
        }

        public IActionResult Update(int id, OrderItems updatedOrder)
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var orders = db.GetCollection<OrderItems>("orders");
                var dataId = orders.FindById(id);

                dataId.Status = updatedOrder.Status;
                dataId.PaymentMethod = updatedOrder.PaymentMethod;
                dataId.RecruiterId = updatedOrder.RecruiterId;
                dataId.DivisionId = updatedOrder.DivisionId;
                dataId.CompanyId = updatedOrder.CompanyId;
                dataId.Validated = updatedOrder.Validated;
                dataId.Created = updatedOrder.Created;
                dataId.Completed = updatedOrder.Completed;

                bool updatedData = orders.Update(dataId);

                if (!updatedData) {
                    return new BadRequestObjectResult(new { message = "Order update failed." });
                }

                return new OkObjectResult(new { message = "Order updated succesfully!" });
            }
        }


        public IActionResult AddProduct(ProductItems product)
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var products = db.GetCollection<ProductItems>("products");
                products.Insert(product);
            }
            return new OkObjectResult(new { message = "Product added succesfully!" });
        }

        public IActionResult GetAllProducts()
        {
            using (var db = new LiteDatabase(_localDB))
            {
                var products = db.GetCollection<ProductItems>("products");
                var allProducts = products.FindAll().ToList();
                return new OkObjectResult(allProducts);
            }
        }
    }
}
