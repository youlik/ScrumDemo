<template>
    <ul>
        <li v-for="(item, i) in list" :key="i">
            <span>{{ item.title }}</span>
            <sub-list v-if="status" :list="item.nodes"></sub-list>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'subList',
    data () {
        return {
            status: true
        }
    },
    props: {
        list: Array
    },
    created() {
        // console.log(typeof this.list);
       if(this.list === 'undefined') {
           this.status = false;
       }
    },
}
</script>

<style scoped>
#tree {
  display: block;
  position: relative;
  padding: 5px 15px;
}
#tree ul {
  position: relative;
  padding-left: 60px;
  margin: 0;
}
#tree ul > li {
  position: relative;
  padding: 5px 0;
}
#tree > ul {
  padding: 0;
  margin: 0;
}
/* 水平线 */
#tree > ul ul > li:after {
  content: "  ";
  position: absolute;
  top: 30px;
  left: -45px;
  width: 45px;
  border-top: 1px solid #ddd;
}
/** 垂直方向连线 */
#tree ul > li:not(:last-child):before {
  content: " ";
  position: absolute;
  top: 0;
  left: -45px;
  height: 100%;
  border: none;
  border-left: 1px solid #ddd;
}

#tree ul > li:last-child:before {
  content: " ";
  position: absolute;
  top: 0;
  left: -45px;
  height: 30px;
  border: none;
  border-left: 1px solid #ddd;
}

ul {
  list-style-type: none;
  text-align: left;
}
span {
  display: inline-block;
  text-align: center;
  height: 45px;
  color: #888;
  line-height: 45px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 8px;
  font-size: 1.5em;
  cursor: pointer;
}

/* 获得焦点改变背景色 */
#tree span:hover,
#tree span:hover + ul span {
  color: #fff;
  background-color: deepskyblue;
}
/* 获得焦点改变边框和连线的颜色 */
#tree span:hover,
#tree span:hover + ul span,
#tree span:hover + ul li:before,
#tree span:hover + ul li:after {
  border-color: blue;
}
</style>

