const mydata = {

  originNames: ['hu','liu','zhang','li','huang'],
  originHobbies: ['乒乓球','羽毛球','台球','足球'],
  originFruits: ['苹果', '香蕉', '橘子', '西瓜'],

  inputUserName: "",
  inputPassword: "",
  selectGender: "男",
  selectName: "John",
  selectHobbies: [],
  selectFruits: [],
  checkAgreement: false,
  
}

let app = new Vue({
  el: '#test',
  data: mydata,
  methods: {},
  computed: {

  },

})