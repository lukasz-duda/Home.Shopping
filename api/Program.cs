using Home.Shopping;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetConnectionString();
builder.Services.AddDbContext<ShoppingDbContext>(options => options.UseMySQL(connectionString));

builder.Services.AddAuthentication()
    .AddCookie();
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

app.MapHub<ShoppingHub>("/shopping");

app.UseCors();

await app.UpdateDatabaseAsync();

app.Run();