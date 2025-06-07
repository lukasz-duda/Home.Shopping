using Home.Shopping.Application.Dto;
using Home.Shopping.Core.Entities;
using Home.Shopping.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Home.Shopping.Api;

public static class ShoppingApi
{
    public static void MapShoppingApi(this WebApplication app)
    {
        app.MapGet("/", () => "Home.Shopping")
            .WithName("GetName")
            .WithOpenApi();

        app.MapHub<ShoppingHub>("/shopping")
            .RequireAuthorization();

        app.MapPut("/groups", async (MatcherGroupDto[] groups, ShoppingDbContext db) =>
        {
            MatcherGroup[] existingGroups = db.MatcherGroups.ToArray();
            db.MatcherGroups.RemoveRange(existingGroups);

            foreach (MatcherGroupDto groupDto in groups)
            {
                MatcherGroup group = groupDto.ToMatcherGroup();
                db.MatcherGroups.Add(group);
            }

            await db.SaveChangesAsync();
            return Results.NoContent();
        })
            .WithName("AddMatcherGroups")
            .WithOpenApi()
            .RequireAuthorization();

        app.MapGet("/groups", async (ShoppingDbContext db) =>
        {
            MatcherGroupDto[] groups = await db.MatcherGroups
                .Include(g => g.MatchFragments)
                .Select(g => g.ToMatcherGroupDto())
                .ToArrayAsync();

            return Results.Ok(groups);
        })
            .WithName("GetMatcherGroups")
            .WithOpenApi()
            .RequireAuthorization();
    }
}