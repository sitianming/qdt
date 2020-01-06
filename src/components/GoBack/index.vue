<template>
    <div class="goback" @click="click">
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            text: `< 返回`
        }
    },
    methods:{
        click(){
            window.history.back()
        }
    }
}
</script>

<style lang="scss" scoped>
    .goback {
        position: absolute;
        top: 0;
        right: 0;
        border: 1px solid #ddd;
        padding: 5px 5px;
        border-radius: 3px;
        font-size: 12px;
        line-height: 12px;
        cursor: pointer;
        font-weight: normal;
    }
</style>