<template lang="pug">
  #app
    nav#main
      ul
        li
          router-link(:to="{name:'by_files'}") By file
        li
          router-link(:to="{name:'by_issues'}") By issue
        li
          router-link(:to="{name:'about'}") About

    router-view

</template>

<style lang="scss">
  body {
    margin: 0;
    height: 100vh;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  nav {
    ul {
      padding: 0;
      margin: 0;

      li {
        list-style: none;

        display: inline-block;
        margin-left: 2px;

        a {
          padding: 3px 7px;
          background-color: #ececec;
          border-radius: 10px;

          &.router-link-active {
            background-color: #22dddd;
          }
        }
      }
    }
  }

  nav#main {
    flex: 0 0 auto;
    padding: 10px 30px;
    text-align: center;

    a {
      font-weight: bold;
      color: #2c3e50;
    }
  }

  .scroll_wrap {
    overflow-y: auto;
  }

  .offense-view {
    display: flex;
    overflow: hidden;

    > * {
      flex: 0 0 auto;

      &:nth-child(2) {
        flex: 1 1 auto;
      }
    }
  }

  $severity_colors: (
          "refactor": rgba(237, 156, 40, 1.0),
          "convention": rgba(237, 156, 40, 1.0),
          "warning": rgba(150, 40, 239, 1.0),
          "error": rgba(210, 50, 45, 1.0),
          "fatal": rgba(210, 50, 45, 1.0),
  );

  .offense {
    .meta {
      .location {
        font-weight: bold;
      }

      .severity {
        text-transform: capitalize;
        font-weight: bold;

        @each $severity, $color in $severity_colors {
          &.#{$severity} {
            color: $color;
          }
        }
      }
    }

    pre {
      code {
        display: block;
        background: #000000;
        color: #ffffff;
        padding: 10px 15px;
        border-radius: 15px;

        .highlight {
          @each $severity, $color in $severity_colors {
            &.#{$severity} {
              background-color: adjust-color($color, $alpha: -0.4);
              border: 1px solid adjust-color($color, $alpha: -0.6);
            }
          }
        }
      }
    }
  }
</style>
