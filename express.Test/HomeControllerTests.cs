using express.Controllers;
using express.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Xunit;

public class HomeControllerTests
{
    [Fact]
    public void Index_ReturnsViewResult()
    {
        // Arrange
        var controller = new HomeController();

        // Act
        var result = controller.Index() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Privacy_ReturnsViewResult()
    {
        // Arrange
        var controller = new HomeController();

        // Act
        var result = controller.Privacy() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Error_ReturnsViewResult()
    {
        // Arrange
        var controller = new HomeController();

        // Act
        var result = controller.Error() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Error_ReturnsErrorViewWithModel()
    {
        // Arrange
        var controller = new HomeController();

        // Act
        var result = controller.Error() as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.Null(result.ViewName);
        Assert.NotNull(result.Model);
        Assert.IsType<ErrorViewModel>(result.Model);
    }
}
