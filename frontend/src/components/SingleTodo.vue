<template>
    <li :class="!message.todo ? 'checked':''">
        <b-icon class="cursor" v-if="message.todo" icon="check2-circle" @click='toggle(message.id, message.todo)'></b-icon>
        <b-icon class="cursor" v-else icon="check-circle-fill" @click='toggle(message.id, message.todo)'></b-icon> 
        <span>{{message.name}} <span id="grey">by {{message.author}}</span></span>
        <b-icon class="cursor" icon="x-circle" @click='deleteTask(message.id)'></b-icon>
    </li>
</template>

<script>
    export default {
        name: 'SingleTodo',
        props: ['message'],
        methods: {
            toggle: async function(id, todo) {
                await this.axios.put("http://localhost:8080/tasks/" + id, {todo: !todo});
                this.$emit("onchange");
                await this.$store.dispatch("PUT", id); 
            },
            deleteTask: async function(id) {
                await this.axios.delete("http://localhost:8080/tasks/" + id);
                this.$emit("onchange");
                await this.$store.dispatch("DELETE", id);
            }
        }                 
    }
</script> 

<style scoped> 
    li {
        list-style: none; 
        margin-bottom: 10px; 
        border: 2px solid gray;   
        font-size: 20px;  
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    li:hover {
        background: #343a40;
        color: whitesmoke;
    }
    #grey {
        color: gray;
        margin-left: 10px;
    }
    .cursor {
        cursor: pointer;
    }
    .checked {
        text-decoration-line: line-through;
    }
    @media screen and (max-width: 1000px) {
        li {
            width: 100%;
        }
    }    
</style>