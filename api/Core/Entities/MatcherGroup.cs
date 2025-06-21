namespace Home.Shopping.Core.Entities;

public class MatcherGroup
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public int OrdinalNumber { get; set; }

    public List<MatchFragment> MatchFragments { get; set; } = [];
}

public class MatchFragment
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required string MatchString { get; set; }

    public int Priority { get; set; }
}