using express.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Xunit;

public class CestaControllerTests
{
    [Fact]
    public void Index_ReturnsViewResult()
    {
        // Arrange
        var controller = new CestaController();

        // Act
        var result = controller.Index() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Index", result.ViewName);
        // Add more assertions if needed
    }

    [Fact]
    public void Error_ReturnsViewResultWithModel()
    {
        // Arrange
        var controller = new CestaController();

        // Act
        var result = controller.Error() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Error", result.ViewName);
        Assert.IsType<ErrorViewModel>(result.Model);
        // Add more assertions if needed
    }
}
