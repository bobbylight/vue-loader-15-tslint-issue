<template>
    <div>
        Hello {{what}}!
    </div>
</template>

<script lang="ts">
@Component
export default class App extends Vue {

    private what: string = 'world';
}
</script>