using Microsoft.AspNetCore.Mvc;

namespace express.Controllers
{
    public class PerfilController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
