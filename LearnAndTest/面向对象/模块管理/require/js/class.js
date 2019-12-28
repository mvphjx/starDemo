define(function() {
        var allStudents = [];
        return {
            classID: "001",
            department: "computer",
            addToClass: function(student) {
                allStudents.push(student);
            },
            getStudents: function() {
                return allStudents;
            }
        };
    }
);
