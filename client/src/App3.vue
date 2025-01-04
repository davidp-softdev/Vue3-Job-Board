<script setup>
import { ref, onMounted } from "vue";

const name = ref("John Doe");
const status = ref("active");
const tasks = ref(["Task One", "Task Two", "Task Thee"]);
const newTask = ref('Enter Task name..')

const toggleStatus = () => {
  console.log("## Toggle Status");

  if (status.value === "active") {
    status.value = "pending";
    console.log("Value changed -> Pending");
  } else if (status.value === "pending") {
    status.value = "inactive";
    console.log("Value changed -> Inactive");
  } else {
    status.value = "active";
    console.log("Else -> Active");
  }

const addTask = () => {
  if(newTask.value.trim() != ''){
    tasks.value.push(newTask.value)
    newTask.value = ''
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      tasks.value = data.map((task) => task.title)
    } catch (error) {
      console.log('Error fetching tasks')
    }
  })
}

};
</script>

<template>
  <h1>{{ name }}</h1>
  <br />
  <p v-if="status === active">User is Active</p>
  <p v-else-if="status === pending">User is Pending</p>
  <p v-else>User is Inactive</p>

<form @submit.prevent="addTask">
<label for=""newTask>Add Task</label>
<input type="text" id="newTask" name="newTask" v-model="newTask"></input>
<button type="submit">Submit</button>
</form>

  <h3>Tasks</h3>
  <ul>
    <li v-for="task in tasks" :key="task">
      {{ task }}
    </li>
  </ul>

  <br />
  <!-- <button v-on:click="toggleStatus">Change Status</button> -->
  <button @click="toggleStatus">Change Status</button>
</template>
