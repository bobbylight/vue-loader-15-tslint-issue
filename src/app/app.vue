<template>
    <div>
        Hello {{what}}!
    </div>
</template>

<script lang="ts">
export default {

    data() {
        return {
            what: 'world'
        };
    }
};
</script>