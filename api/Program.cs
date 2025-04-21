using Home.Shopping;
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

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseExceptionHandler();

app.MapGet("/", () => "Home.Shopping")
    .WithName("GetName")
    .WithOpenApi();

app.MapGet("/user", (HttpContext context) =>
{
    var user = new User
    {
        Authenticated = context.User.Identity?.IsAuthenticated ?? false,
        Name = context.User.Identity?.Name ?? ""
    };
    return TypedResults.Ok(user);
})
    .WithName("GetUser")
    .WithOpenApi();

app.MapHub<ShoppingHub>("/shopping")
    .RequireAuthorization();

app.UseCors();

await app.UpdateDatabaseAsync();

app.Run();