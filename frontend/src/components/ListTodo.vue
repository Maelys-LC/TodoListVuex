<template>
    <div>
        <b-form id="form">        
            <b-input-group prepend="Filter by author" class="input">
                <b-input  type="text" v-model="author" class="blank"></b-input>
                <b-button @click="filterByAuthor" variant="outline-dark">Filter</b-button>                                 
            </b-input-group>
        </b-form>
        <ul>
            <draggable v-model="list">
                <!-- <transition-group> -->
                    <SingleTodo v-for="element in list" :key="element.id" :message="element" />
                <!-- </transition-group> -->
            </draggable>
        </ul>
    </div>   
</template>

<script>
    import SingleTodo from './SingleTodo.vue'
    import draggable from 'vuedraggable'

    export default {
        name: 'ListTodo',
        props: ['whatToDisplay'],
        data: function() {
            return {
                list: [],
                author: "",
                status: ""
            }
        },
        components: {
            SingleTodo,
            draggable      
        },
        beforeMount() {
            this.filterTodo();
        },
        methods: {            
          filterTodo: function() {
              if (this.whatToDisplay === "done") {
                  this.status = this.$store.getters.todoDone
                  this.list = this.$store.getters.todoDone
              } else if (this.whatToDisplay === "todo") {
                  this.status = this.$store.getters.todoNotDone 
                  this.list = this.$store.getters.todoNotDone
              } else if (this.whatToDisplay === "all") {
                  this.status = this.$store.state.todo
                  this.list = this.$store.state.todo
              }
            },
            filterByAuthor: function() {
                if (this.author) {
                    this.list = this.status
                    this.list = this.list.filter(element => element.author.toLowerCase() === this.author.toLowerCase());
                    console.log(this.list);
                    console.log(this.author)
                    this.author = "";
                }                
            }            
        }   
    }   
</script> 

<style scoped>
    #form {
        margin-bottom: 10px;
    }
    ul {
        margin: 0;
    }
</style>