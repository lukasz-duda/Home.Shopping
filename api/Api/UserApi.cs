using Home.Shopping.Application.Dto;

namespace Home.Shopping.Api;

public static class UserApi
{
    public static void MapUserApi(this IEndpointRouteBuilder app)
    {
        app.MapGet("/user", (HttpContext context) =>
        {
            var user = new UserDto
            {
                Name = context.User.Identity?.Name ?? ""
            };
            return TypedResults.Ok(user);
        })
        .WithName("GetUser")
        .WithOpenApi();
    }
}
