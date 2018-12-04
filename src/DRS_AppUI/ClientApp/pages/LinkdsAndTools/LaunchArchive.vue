<template>
    <not-found></not-found>

</template>
<style scoped>

</style>
<script>
    import NotFound from '../../layouts/notFound'

    export default {
        name: 'launchArchive',
        props: {
            args: {
                type: Object,
                required: true
            }
        },
        components: {
            NotFound
        }
    }
</script>