define(["student", "class"], function (student, clz) {
    return {
        addNewStudent: function (name, gender) {//添加一个学生
            clz.addToClass(student.createStudent(name, gender));
        },
        getStudents: function () {//获取所有学生
            return clz.getStudents();
        }
    };
});
