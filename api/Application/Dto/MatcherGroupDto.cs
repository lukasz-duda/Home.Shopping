namespace Home.Shopping.Application.Dto;

public class MatcherGroupDto
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public int OrdinalNumber { get; set; }

    public MatchFragmentDto[] MatchFragments { get; set; } = [];
}

public class MatchFragmentDto
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required string MatchString { get; set; }

    public int Priority { get; set; }
}
