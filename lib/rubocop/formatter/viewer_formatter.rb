# frozen_string_literal: true

require 'erb'
require 'json'
require 'pathname'

module RuboCop
  module Formatter
    # This formatter formats the report data in Vue based interactive viewer.
    class ViewerFormatter < BaseFormatter
      APP_JS_PATH   = File.expand_path('../../../viewer/dist/js/app.js', __dir__)
      TEMPLATE_PATH =
          File.expand_path('../../../assets/output.html.erb', __dir__)

      include PathUtil

      attr_reader :output_hash

      def initialize(output, options = {})
        super
        @output_hash = {
            metadata: metadata_hash,
            files:    [],
            summary:  {offense_count: 0},
        }
      end

      def started(target_files)
        output_hash[:summary][:target_file_count] = target_files.count
      end

      def file_finished(file, offenses)
        output_hash[:files] << hash_for_file(file, offenses)
        output_hash[:summary][:offense_count] += offenses.count
      end

      def finished(inspected_files)
        output_hash[:summary][:inspected_file_count] = inspected_files.count

        render_html
      end

      def render_html
        app_js = File.read(APP_JS_PATH, encoding: Encoding::UTF_8)

        context = ERBContext.new(output_hash, app_js)

        template = File.read(TEMPLATE_PATH, encoding: Encoding::UTF_8)

        erb = ERB.new(template)

        html = erb.result(context.binding)

        output.write html
      end

      # This class provides helper methods used in the ERB template.
      class ERBContext
        attr_reader :json_data, :app_js

        def initialize(json_data, app_js)
          @json_data = json_data
          @app_js    = app_js
        end

        # rubocop:disable Lint/UselessMethodDefinition
        def binding
          super
        end

        # rubocop:enable Lint/UselessMethodDefinition
      end

      def metadata_hash
        {
            rubocop_version: RuboCop::Version::STRING,
            ruby_engine:     RUBY_ENGINE,
            ruby_version:    RUBY_VERSION,
            ruby_patchlevel: RUBY_PATCHLEVEL.to_s,
            ruby_platform:   RUBY_PLATFORM,
        }
      end

      def hash_for_file(file, offenses)
        {
            path:     smart_path(file),
            offenses: offenses.map { |o| hash_for_offense(o) },
        }
      end

      def hash_for_offense(offense)
        {
            severity:  offense.severity.name,
            message:   offense.message,
            cop_name:  offense.cop_name,
            corrected: offense.corrected?,
            location:  hash_for_location(offense),
        }
      end

      def hash_for_location(offense)
        {
            source:       source_lines(offense),
            start_line:   offense.line,
            last_line:    offense.last_line,
            start_column: offense.column,
            last_column:  offense.last_column,
            length:       offense.location.length,
        }
      end

      def source_lines(offense)
        (offense.line..offense.last_line).map do |line_num|
          offense.location.source_buffer.source_line(line_num)
        end.join("\n")
      end
    end
  end
end
