using express.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace express.Controllers
{
    public class DeliveryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Produtos()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}