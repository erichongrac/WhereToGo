var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000", // Next.js dev server
                "https://demo-frontend-app.azurewebsites.net" // deployed frontend
            )
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
