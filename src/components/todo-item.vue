<template>
  <v-list-item class= "todo__item">
    <v-checkbox class="todo__checkbox" 
    :input-value = "data.done"
    @change="onChangeTodoDone"
    color="blue"
    hide-details>
    </v-checkbox>

    <v-list-item-content>
      <v-text-field
      class="todo__title"
      ref="textField"
      :value="data.title"
      @keydown="onChangeTodoText"
      @keydown.enter="addTodo"
      slot="false"></v-text-field>

      <v-list-item-subtitle>Created : {{data.created}}</v-list-item-subtitle>
      <v-list-item-subtitle>
        Last Updated : {{data.lastUpdated}}
      </v-list-item-subtitle>     
    </v-list-item-content>

      <v-btn colour="error" fab small dark @click="deleteToDo">
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
  </v-list-item>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    data:
    {
      id:String,
      title: String,
      done: Boolean,
      created:String,
      lastUpdated: String
    },
    index:Number,
    totsl:Number
  },

  mounted()
  {
    if(this.$props.data.title === "" &&
    this.$props.index === this.$$props.total - 1)
    {
      this.focusInput();
    }
  },
  methods :
  {
    addToDo(event)
    {
      if(event.target.value !== "" &&
        this.$props.index === this.$props.total - 1)
      {
        this.$store.dispatch("addTodo", {
          id: this.$props.data.id,
        });
      }
    },
    focusInput()
    {
      this.$refs.textfield.focus();
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
