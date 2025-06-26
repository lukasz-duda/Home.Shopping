using Home.Shopping.Core.Entities;

namespace Home.Shopping.Application.Dto;

public static class MatcherGroupMapping
{
    public static MatcherGroup ToMatcherGroup(this MatcherGroupDto groupDto)
    {
        return new MatcherGroup
        {
            Id = groupDto.Id,
            Name = groupDto.Name,
            OrdinalNumber = groupDto.OrdinalNumber,
            MatchFragments = [.. groupDto.MatchFragments
                .Select(matchFragmentDto => new MatchFragment
                {
                    Id = matchFragmentDto.Id,
                    Name = matchFragmentDto.Name,
                    MatchString = matchFragmentDto.MatchString,
                    Priority = matchFragmentDto.Priority
                })]
        };
    }

    public static MatcherGroupDto ToMatcherGroupDto(this MatcherGroup group)
    {
        return new MatcherGroupDto
        {
            Id = group.Id,
            Name = group.Name,
            OrdinalNumber = group.OrdinalNumber,
            MatchFragments = [.. group.MatchFragments
                .Select(matchFragment => new MatchFragmentDto
                {
                    Id = matchFragment.Id,
                    Name = matchFragment.Name,
                    MatchString = matchFragment.MatchString,
                    Priority = matchFragment.Priority
                })
                .ToArray()
                .OrderBy(matchFragmentDto => matchFragmentDto.MatchString)]
        };
    }
}