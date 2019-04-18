<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        {{ title }}
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <Todolist />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Todolist from '@/components/TodoList.vue';

@Component({
    components: {
        HelloWorld,
        Todolist,
    },
})
export default class Home extends Vue {
    public title: string = 'Hi Vue.js';

    constructor() {
        super();
    }
}
</script>
