<template>
  <div>
    <h2>----------------------------------------------------------------</h2>
    <span>输入筛选学生的年龄限制：</span>
    <input type="text" name="" id="" @blur="changeAge" />
    <ul>
      <li v-for="student in $store.getters.moreAgeFunc(age)" :key="student.id">
        {{ student }}
      </li>
    </ul>

    <h2>----------------------------------------------------------------</h2>
    <ul>
      <li v-for="student in $store.state.students" :key="student.id">
        {{ student }}
      </li>
    </ul>

    <h2>----------------------------------------------------------------</h2>
    <h2>输入学生的信息，点击按钮可以添加学生信息</h2>
    <p>
      <span>姓名：</span>
      <input type="text" @blur="setStuName" />
    </p>
    <p>
      <span>年龄：</span>
      <input type="text" @blur="setStuAge" />
    </p>
    <p>
      <span>身高：</span>
      <input type="text" @blur="setStuHeight" />
    </p>
    <button @click="addStudent">添加</button>

    <h2>----------------------------------------------------------------</h2>
    <h2>给hsj添加爱好信息</h2>
    <input type="text" v-model="hobby" />
    <button @click="addHobby">添加</button>

    <h2>----------------------------------------------------------------</h2>
    <h2>拿到modules里面定义的state: {{ $store.state.a.name }}</h2>
    <h2>拿到普通的state: {{ $store.state.name }}</h2>

    <h2>----------------------------------------------------------------</h2>
    <h2>modules中的context参数及解构</h2>
    <button @click="printContext">打印</button>
  </div>
</template>

<script>
import { ADDSTUDENT, ADDSTUDENTHOBBY } from "../store/mutations-type";

export default {
  data() {
    return {
      age: 0,
      student: {
        name: "",
        age: 0,
        height: 0,
      },
      hobby: "",
    };
  },
  methods: {
    changeAge(event) {
      this.age = event.target.value;
    },
    setStuName(event) {
      this.student.name = event.target.value;
    },
    setStuAge(event) {
      this.student.age = event.target.value;
    },
    setStuHeight(event) {
      this.student.height = event.target.value;
    },
    addStudent() {
      // 如果涉及到异步操作，为了保证在运行的时候不出错（同时也保证在devtools中有记录）
      // 修改state的时候，需要通过dispatch在action中进行异步操作，同时在action中进行commit
      // this.$store.dispatch("aaddStudent", this.student);

      // 如果想要在成功修改state之后得到一个返回，可以通过在actions的方法中返回一个promise
      // 这个promise相当于替换了this.$store.dispatch()，那么就可以在他的后面使用then方法，来返回回调内容(同时还可以传递参数到组件中)
      this.$store.dispatch("aaddStudent", this.student).then((message) => {
        console.log(message);
      });
    },
    addHobby() {
      this.$store.commit(ADDSTUDENTHOBBY, this.hobby); // 如果不是异步操作，可以直接通过commit交给mutations
    },
    printContext() {
      this.$store.dispatch("achangeStuName");
    },
  },
};
</script>

<style></style>
