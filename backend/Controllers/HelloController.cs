using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok("Hello from .NET!");
}
