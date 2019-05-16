<template>
  <div id="tree">
    <ul>
      <li>
        <span>需求地图</span>
        <sub-list :list="data"></sub-list>
        <!-- <ul>
          <li v-for="(epic, epic_i) in data" :key="epic_i">
            <span>{{ epic.title }}</span>
            <ul>
              <li v-for="(user, user_i) in epic.nodes" :key="user_i">
                <span>{{ user.title }}</span>
                <ul>
                  <li v-for="(task, task_i) in user.nodes" :key="task_i">
                    <span>{{ task.title }}</span>
                    <ul>
                      <li v-for="(tak, tak_i) in task.nodes" :key="tak_i">
                        <span>{{ tak.title }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { getIssue } from "@/api/getIssue";
import { fixData } from '@/assets/js/fixData'
import subList from './subList'
export default {
  data() {
    return {
      Epic: [
        {
          story:
            "作为A111,我希望看到A111111111111111111111111,以便于A111111111111111111111111111",
          user: [
            {
              story:
                "作为B111,我希望看到B111111111111111111111111,以便于B111111111111111111111111111",
              Task: [
                "作为C111,我希望看到A111111111111111111111111,以便于A111111111111111111111111111",
                "作为C222,我希望看到A222222222222222222222222,以便于A222222222222222222222222222",
                "作为C333,我希望看到A333333333333333333333333,以便于A333333333333333333333333333"
              ]
            },
            {
              story:
                "作为B222,我希望看到B222222222222222222222222,以便于B222222222222222222222222222"
            }
          ]
        },
        {
          story:
            "作为B111,我希望看到B111111111111111111111111,以便于A111111111111111111111111111",
          user: [
            {
              story:
                "作为B111,我希望看到G111111111111111111111111,以便于B111111111111111111111111111",
              Task: [
                "作为C111,我希望看到A111111111111111111111111,以便于A111111111111111111111111111",
                "作为C222,我希望看到A222222222222222222222222,以便于A222222222222222222222222222",
                "作为C333,我希望看到A333333333333333333333333,以便于A333333333333333333333333333"
              ]
            },
            {
              story:
                "作为B222,我希望看到B222222222222222222222222,以便于B222222222222222222222222222"
            }
          ]
        }
      ],
      data: null
    };
  },
  components: {
    subList
  },
  methods: {
    init() {
      var req = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){id name issues(first:10){ totalCount nodes{ title  number  body  timelineItems(first:10){   nodes{  ...on CrossReferencedEvent{    source{  ...on Issue{    number  }  }target{  ...on Issue{    number  } }}} }}}}}}'
      };
      getIssue(req).then(res => {
        this.data = fixData(res.data.data.organization.repository.issues.nodes)
      });
    }
  },
  created() {
    this.init();
  }
};
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
