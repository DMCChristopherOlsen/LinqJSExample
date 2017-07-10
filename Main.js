$(document).ready(function(){
    people.forEach(function(person){
        $('#all-people').append(person.GetTableRow());
    });

    var sortedByLastName = Enumerable.From(people).OrderBy(function(person){
                                            return person.LastName;
                                        }).ToArray();
    sortedByLastName.forEach(function(person){
        $('#all-people-sorted-by-last-name').append(person.GetTableRow());
    });


    var onlyDLastNameOrderBy = Enumerable.From(people).Where(function(person){
                                                return person.LastName[0] == 'D';
                                            }).OrderByDescending(function(person){
                                                return person.AgeInYears;
                                            }).ToArray();
    onlyDLastNameOrderBy.forEach(function(person){
        $('#d-people-sorted-by-age').find('tbody').append(person.GetTableRow());
    });

    var groupedByAge = Enumerable.From(people).GroupBy(function(person){
                                                        return person.AgeInYears;
                                                    }, function(person){
                                                        return person;
                                                    }, function(key, group){
                                                        return new Group(key, group.Count());
                                                }).OrderBy(function(group){
                                                    return group.Key;
                                                }).ToArray();
    
    groupedByAge.forEach(function(group){
        $('#people-grouped-by-age').find('tbody').append(group.GetTableRow());
    });


    var flattenedOccupations = Enumerable.From(industries).SelectMany(function(industry){
        return Enumerable.From(industry.Occupations).Select(function(occupation){
            return {
                Name: occupation,
                Industry: industry.Name
            };
        }).ToArray();
    }).ToArray();
    
    var peopleJoinedWithIndustries = Enumerable.From(people).Join(flattenedOccupations,
                                                                    function(person){
                                                                        return person.Occupation;
                                                                    },
                                                                    function(occupation){
                                                                        return occupation.Name;
                                                                    },
                                                                    function(person, occupation){
                                                                        return {
                                                                            FullName: person.FirstName + " " + person.LastName,
                                                                            Industry: occupation.Industry
                                                                        };
                                                                    }).ToArray();
    peopleJoinedWithIndustries.forEach(function(item){
        $('#people-joined-with-industry').find('tbody').append('<tr><td>' + item.FullName + '</td><td>' + item.Industry + '</td></tr>');
    });


    // var peopleWithIndustry = Enumerable.From(people).Select(function(person){
    //     var personIndustry = Enumerable.From(industries).FirstOrDefault('', function(industry){
    //                                                                         return Enumerable.From(industry.Occupations).Any(function(occupation){
    //                                                                             return occupation == person.Occupation;
    //                                                                         });
    //                                                                     });
    //                                                                     return {
    //                                                                         FullName: person.LastName + ', ' + person.FirstName,
    //                                                                         Industry: personIndustry.Name
    //                                                                     };
    //                                                                 }).ToArray();
    // peopleWithIndustry.forEach(function(person){
    //     $('#people-with-industry').find('tbody').append('<tr><td>' + person.FullName + '</td><td>' + person.Industry + '</td></tr>');
    // });

    var percentageByIndustry = Enumerable.From(peopleJoinedWithIndustries).GroupBy(function(person){
                                                                                return person.Industry;
                                                                            }, function(person){
                                                                                return person;
                                                                            }, function(industryName, group){
                                                                                return {
                                                                                    Industry: industryName,
                                                                                    Percentage: ((group.Count() / (people.length != 0 ? people.length : 1)) * 100) + '%'
                                                                                };
    }).ToArray();
    percentageByIndustry.forEach(function(item){
        $('#people-with-industry-percentage').find('tbody').append('<tr><td>' + item.Industry + '</td><td>' + item.Percentage + '</td></tr>');
    });
    

})