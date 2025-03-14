using LiteDB;
using Microsoft.AspNetCore.Mvc;
using MyWebStore.Models;
using MyWebStore.Services;
using Newtonsoft.Json;

namespace MyWebStore.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MyWebService _myWebService;

        public OrderController(MyWebService myWebService)
        {
            _myWebService = myWebService;
        }

        [HttpPost("add")]
        public IActionResult AddOrder([FromBody] OrderItems order)
        {
            return _myWebService.AddOrder(order);
        }

        [HttpGet("all")]
        public IActionResult GetAllOrders()
        {
            return _myWebService.GetAllOrders();
        }

        [HttpGet("{id}", Name = "findid")]
        public IActionResult FindId(int id)
        {
            var result = _myWebService.FindId(id);

            if (result == null) {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _myWebService.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            return _myWebService.Delete(id);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] OrderItems updatedOrder)
        {
            return _myWebService.Update(id, updatedOrder);
        }
    }

    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyWebService _myWebService;

        public ProductController(MyWebService myWebService)
        {
            _myWebService = myWebService;
        }

        [HttpPost("add")]
        public IActionResult AddProduct([FromBody] ProductItems product)
        {
            return _myWebService.AddProduct(product);
        }

        [HttpGet("all")]
        public IActionResult GetAllProducts()
        {
            return _myWebService.GetAllProducts();
        }
    }

}
