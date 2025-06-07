namespace Home.Shopping.Core.Entities;

public class MatcherGroup
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public int OrdinalNumber { get; set; }

    public List<MatchFragment> MatchFragments { get; set; } = [];
}

public class MatchFragment
{
    public Guid Id { get; set; }

    public required string MatchString { get; set; }

    public int Priority { get; set; }
}