<template>
    <div class="start">
        <h3>快速开始</h3>
        <div class="install">
            <h4>安装</h4>
            <pre>npm i --save vue-area-linkage</pre>
            <p>或者</p>
            <pre>yarn add vue-area-linkage</pre>
        </div>
        <div class="register">
            <h4>全局注册</h4>
            <pre>import Vue from 'vue';<br/><br/>import 'vue-area-linkage/dist/index.css'; // v2 or higher<br/><br/>import VueAreaLinkage from 'vue-area-linkage';<br/><br/>Vue.use(VueAreaLinkage);<br/></pre>
        </div>
        <br/>
    </div>
</template>

<script>
    import './index.less';
    export default {

    }
</script>