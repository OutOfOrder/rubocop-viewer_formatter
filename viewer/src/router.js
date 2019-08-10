import Vue from 'vue';
import Router from 'vue-router';
import About from './views/About.vue';
import ByFiles from './views/ByFiles';
import ByIssues from './views/ByIssues';
import FileOffenses from './views/FileOffenses';
import IssueOffenses from './views/IssueOffenses';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {name: 'by_files'},
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/files',
      name: 'by_files',
      component: ByFiles,
      children: [
        {
          path: ':fileId',
          name: 'for_file',
          component: FileOffenses,
          props: true,
        },
      ]
    },
    {
      path: '/issues',
      name: 'by_issues',
      component: ByIssues,
      children: [
        {
          path: ':issueId',
          name: 'for_issue',
          component: IssueOffenses,
          props: true,
        },
      ]
    },
  ]
});
