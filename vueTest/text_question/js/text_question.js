
var dataDemo = {
    "webReadingQuestionList": [
        {
            "question": {
                "questionType": 1,
                "questionText": "这是一个问题",
                "elementLob": null,
                "answerMask": 1
            },
            "choices": [{"choiceId": 1, "choiceText": "选项1", "elementLob": null}, {
                "choiceId": 2,
                "choiceText": "选项2",
                "elementLob": null
            }, {"choiceId": 3, "choiceText": "选项3", "elementLob": null}, {
                "choiceId": 4,
                "choiceText": "选项4",
                "elementLob": null
            }]
        }
    ],
    "repoQuestion": {
        "question": {
            "id": 52,
            "name": "阅读题",
            "questionLevel": 1,
            "questionType": 1,
            "materialType": 1,
            "materialId": 0,
            "score": 0,
            "status": 1,
            "usageFlag": 1,
            "featureSpec": "string",
            "description": "阅读题",
            "createTime": null,
            "createUser": null,
            "updateTime": null,
            "updateUser": null
        },
        "editInfo": null,
        "checkInfo": null,
        "checkCands": [],
        "subQuestions": [{
            "repoQuestionId": 52,
            "materialQuestionId": 109,
            "questionOrder": 1,
            "score": 0,
            "status": 1,
            "description": "阅读题",
            "createTime": null,
            "createUser": null,
            "updateTime": null,
            "updateUser": null
        }]
    }
};
dataDemo.submit = false;
dataDemo.showAnswer = false;//
dataDemo.answer=null;
dataDemo.status='course';
var questionSubject = new Vue({
    el: '#question-subject',
    data: dataDemo,
    methods:{
        choose(choiceId){
            if(!this.submit){
                this.answer=choiceId;
            }
        },
        finish(){
            this.submit=true;
            if(this.status=='course'){
                this.showAnswer=true;
            }
        },
        getAnswer(choiceId){
            return this.answer;
        }

    },
    computed:{
        answerText:function(){
            var answerMask = this.webReadingQuestionList[0].question.answerMask;
            var choices = this.webReadingQuestionList[0].choices;
            for (let i = 0; i < choices.length; i++) {
                if(answerMask===choices[i].choiceId){
                    return choices[i].choiceText;
                }
            }
        }
    }
});


