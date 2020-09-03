<template>
    <div>
        <b-form id="form">        
            <b-input-group prepend="Filter by author" class="input">
                <b-input  type="text" v-model="author" class="blank"></b-input>                                              
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
                author: ""
            }
        },
        computed: {
            list: {
                get: function() {
                    let list = this.$store.getters.todoFiltered(this.whatToDisplay);
                    if (this.author) {
                        return list.filter(element => this.author.toLowerCase() === element.author.toLowerCase());
                    } else {
                    return list
                    }                
                },
                set: function(value) {
                    if (this.whatToDisplay === "all") {
                        this.$store.dispatch("UPDATE", value);
                    }
                }
            }           
        },
        components: {
            SingleTodo,
            draggable      
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