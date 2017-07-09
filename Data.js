var Person = function(firstName, lastName, occupation, ageInYears){
    this.FirstName = firstName;
    this.LastName = lastName != null ? lastName : '';
    this.Occupation = occupation;
    this.AgeInYears = ageInYears;

    this.GetTableRow = function(){
        return '<tr><td>' + this.FirstName + '</td>'
            + '<td>' + this.LastName + '</td>'
            + '<td>' + this.Occupation + '</td>'
            + '<td>' + this.AgeInYears + '</td></tr>';
    }.bind(this);
};

var Industry = function(name, occupations){
    this.Name = name;
    this.Occupations = occupations;
}

var Group = function(key, count){
    this.Key = key;
    this.Count = count;

    this.GetTableRow = function(){
        return '<tr><td>' + this.Key + '</td>'
            + '<td>' + this.Count + '</td></tr>';
    }.bind(this)
};

var people = [];
people.push(new Person('John', 'Doe', 'Doctor', 38));
people.push(new Person('Mary', 'Jane', 'Pharmacist', 29));
people.push(new Person('John', 'Downer', 'Sanitation Worker', 43));
people.push(new Person('Dee', 'Tective', 'Police Officer', 35));
people.push(new Person('Pikupin', 'Dropov', 'Russian Chaufer', 34));
people.push(new Person('Don', 'Lothario', 'Marriage Counselor', 40));
people.push(new Person('Doctor', null, 'Time traveler', 984));
people.push(new Person('Jane', 'Doe', 'Massage therapist', 29));
people.push(new Person('Christopher', 'Olsen', 'Application Developer', 34));
people.push(new Person('Kelly', 'Smith', 'Police Officer', 40));


var industries = [];
industries.push(new Industry('Healthcare', ['Doctor', 'Pharmacist']));
industries.push(new Industry('Government', ['Sanitation Worker']));
industries.push(new Industry('Law Enforcement', ['Police Officer']));
industries.push(new Industry('Service', [
    'Russian Chaufer',
    'Marriage Counselor',
    'Massage therapist'
]));
industries.push(new Industry('Software', ['Application Developer']));
industries.push(new Industry('Sci Fi', ['Time traveler']));