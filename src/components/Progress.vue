<template>
    <div class="progress-bg">
        <div class="progress-value" :style="{width:`${value*100/max}%`}"></div>
    </div>
</template>

<script>
    export default {
        name: "Progress",
        props: {
            max: {
                default: 100
            },
            value: {
                default: 0
            },
        },
    }
</script>

<style scoped>

    .progress-bg{
        background-color: #eee;
        min-width: 100px;
        flex: 1;
        height: 8px;
        margin: 0 16px;
    }
    .progress-value{
        height: inherit;
        background-color: #ffa32f;
        transition: width 0.3s ease 0s;
    }
</style>