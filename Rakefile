# frozen_string_literal: true

require 'bundler'
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

    unless $CHILD_STATUS.success?
      warn "\n\n"
      warn 'Yarn failed to build'
      warn "\n\n"
      warn output
      warn "\n\n"
      exit(1)
    end
  end
end

Rake::Task['build'].enhance do
  Rake::Task['yarn:build'].invoke
end
