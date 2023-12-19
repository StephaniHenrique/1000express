using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using Xunit;

public class EndToEndTests : IDisposable
{
    private readonly IWebDriver _driver;
    private readonly string _baseUrl;

    public EndToEndTests()
    {
        // Set the path to your ChromeDriver executable
        _driver = new ChromeDriver();
        _baseUrl = "https://localhost:7239"; // Update with your actual application URL
    }

    [Fact]
    public void CanNavigateToCestaIndexPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Cesta/Index");

        // Assert
        Assert.Equal("Cesta - Index", _driver.Title);
    }

    [Fact]
    public void CanNavigateToDeliveryProdutosPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Delivery/Produtos");

        // Assert
        Assert.Equal("Delivery - Produtos", _driver.Title);
    }

    [Fact]
    public void CanNavigateToHomePrivacyPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Home/Privacy");

        // Assert
        Assert.Equal("Privacy Policy", _driver.Title);
    }

    [Fact]
    public void CanNavigateToLoginErrorPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Login/Error");

        // Assert
        Assert.Equal("Login - Error", _driver.Title);
    }

    [Fact]
    public void CanNavigateToPedidoPagamentoPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Pedido/Pagamento");

        // Assert
        Assert.Equal("Pedido - Pagamento", _driver.Title);
    }

    [Fact]
    public void CanNavigateToPerfilIndexPage()
    {
        // Arrange & Act
        _driver.Navigate().GoToUrl(_baseUrl + "/Perfil/Index");

        // Assert
        Assert.Equal("Perfil - Index", _driver.Title);
    }

    public void Dispose()
    {
        _driver.Quit();
        _driver.Dispose();
    }
}
