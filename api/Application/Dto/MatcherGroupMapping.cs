using Home.Shopping.Core.Entities;

namespace Home.Shopping.Application.Dto;

public static class MatcherGroupMapping
{
    public static MatcherGroup ToMatcherGroup(this MatcherGroupDto dto)
    {
        return new MatcherGroup
        {
            Name = dto.Name,
            OrdinalNumber = dto.OrdinalNumber,
            MatchFragments = dto.MatchFragments.Select(mf => new MatchFragment
            {
                MatchString = mf.MatchString,
                Priority = mf.Priority
            }).ToList()
        };
    }

    public static MatcherGroupDto ToMatcherGroupDto(this MatcherGroup group)
    {
        return new MatcherGroupDto
        {
            Name = group.Name,
            OrdinalNumber = group.OrdinalNumber,
            MatchFragments = group.MatchFragments.Select(mf => new MatchFragmentDto
            {
                MatchString = mf.MatchString,
                Priority = mf.Priority
            }).ToArray()
        };
    }
}