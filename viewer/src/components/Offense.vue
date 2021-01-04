<template lang="pug">
  .offense
    .meta
      span.location
        slot
        | {{entry.location.start_line}}
      div
        span.severity(:class='entry.severity')
          | {{entry.severity}}
        | :
        |
        span.message
          | {{entry.message}}
    code
      | {{pre_line(entry.location)}}
      span.highlight(:class='entry.severity')
        | {{highlight_line(entry.location)}}
      | {{post_line(entry.location)}}
</template>

<script>
import SourceParsing from '../mixins/SourceParsing';

export default {
  name: 'Offense',
  mixins: [SourceParsing],
  props: {
    entry: { type: Object, required: true },
  },
};
</script>

<style scoped lang="scss">
  $severity_colors: (
          "refactor": rgba(237, 156, 40, 1.0),
          "convention": rgba(237, 156, 40, 1.0),
          "warning": rgba(150, 40, 239, 1.0),
          "error": rgba(210, 50, 45, 1.0),
          "fatal": rgba(210, 50, 45, 1.0),
  );

  .offense {
    padding-left: 4px;

    &:hover {
      padding-left: 2px;
      background-color: cornsilk;
      border-left: 2px solid #ffd633;
    }

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

    code {
      display: block;
      background: #000000;
      color: #ffffff;
      padding: 10px 15px;
      border-radius: 15px;
      white-space: pre-wrap;
      margin: 1ex 0;

      .highlight {
        @each $severity, $color in $severity_colors {
          &.#{$severity} {
            background-color: adjust-color($color, $alpha: -0.4);
          }
        }
      }
    }
  }
</style>
