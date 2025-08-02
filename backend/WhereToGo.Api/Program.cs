using backend.WhereToGo.Api.Data;
using backend.WhereToGo.Api.Services;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddDbContext<WhereToGoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddScoped<IPlaceService, PlaceService>();
//builder.Services.AddHttpClient<IPlaceService, SupabasePlaceService>();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
