using Microsoft.AspNetCore.Mvc;

namespace express.Controllers
{
	public class PedidoController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		public IActionResult Acompanha()
		{
			return View();
		}

		public IActionResult Pagamento()
		{
			return View();	
		}
	}
}
