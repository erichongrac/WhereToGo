using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests
{
    public class HelloControllerTests
    {
        [Fact]
        public void Get_ReturnsHelloMessage()
        {
            // Arrange
            var controller = new HelloController();

            // Act
            var result = controller.Get() as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Hello from .NET!", result.Value);
        }
    }
}
