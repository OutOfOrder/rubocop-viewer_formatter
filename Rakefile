# frozen_string_literal: true

require 'bundler/gem_tasks'
Bundler::GemHelper.install_tasks

require 'English'

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec) do |config|
  config.verbose = false
end

namespace :yarn do
  desc 'Run yarn build'
  task :build do
    output = `(cd viewer; yarn build) 2>&1`

    if $CHILD_STATUS.success?
      puts 'Built app.js successfully'
    else
      warn "\n\n"
      warn 'Yarn failed to build'
      warn "\n\n"
      warn output
      warn "\n\n"
      exit(1)
    end
  end
end

desc 'Build a sample using the given JSON data dump file. default output sample.html'
task sample: ['yarn:build']
task :sample, [:json_file,:output_html] do |t, args|
  args.with_defaults(output_html: 'sample.html')
  raise 'Must pass json_file input' if args[:json_file].nil?

  require 'rubocop/path_util'
  require 'rubocop/version'
  require 'rubocop/formatter/base_formatter'
  require_relative 'lib/rubocop/formatter/viewer_formatter'

  data = JSON.parse(File.read(args[:json_file]))
  output = File.open(args[:output_html], 'w')

  formatter = RuboCop::Formatter::ViewerFormatter.new(output)
  formatter.output_hash.clear
  formatter.output_hash.merge!(data)
  formatter.render_html
end


task build: 'yarn:build'
