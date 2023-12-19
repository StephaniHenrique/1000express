using express.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

public class PedidoControllerTests
{
    [Fact]
    public void Index_ReturnsViewResult()
    {
        // Arrange
        var controller = new PedidoController();

        // Act
        var result = controller.Index() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Acompanha_ReturnsViewResult()
    {
        // Arrange
        var controller = new PedidoController();

        // Act
        var result = controller.Acompanha() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Pagamento_ReturnsViewResult()
    {
        // Arrange
        var controller = new PedidoController();

        // Act
        var result = controller.Pagamento() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }
}
