using Home.Shopping;
using Home.Shopping.Api;
using Home.Shopping.Infrastructure;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString();
builder.Services.AddDbContext<ShoppingDbContext>(options => options.UseMySQL(connectionString));

builder.Services.AddAuthentication()
    .AddCookie(IdentityConstants.ApplicationScheme, options =>
    {
        options.Cookie.Name = "Home.Identity";
    });
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy
        .WithOrigins(builder.Configuration.GetCorsOrigin())
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

builder.Services.AddProblemDetails();

var keysPath = new DirectoryInfo(builder.Configuration.GetDataProtectionKeysPath());
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(keysPath)
    .SetApplicationName("Home");

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.UseExceptionHandler();

app.MapShoppingApi();
app.MapUserApi();

app.MapHub<ShoppingHub>("/shopping")
    .RequireAuthorization();


await app.UpdateDatabaseAsync();

app.Run();