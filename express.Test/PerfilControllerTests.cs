using express.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

public class PerfilControllerTests
{
    [Fact]
    public void Index_ReturnsViewResult()
    {
        // Arrange
        var controller = new PerfilController();

        // Act
        var result = controller.Index() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }
}
