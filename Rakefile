require 'bundler'
Bundler::GemHelper.install_tasks

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec) do |config|
  config.verbose = false
end

namespace :yarn do
  desc 'Run yarn build'
  task :build do
    output = `(cd viewer; yarn build) 2>&1`

    unless $?.success?
      $stderr.puts "\n\n"
      $stderr.puts "Yarn failed to build"
      $stderr.puts "\n\n"
      $stderr.puts output
      $stderr.puts "\n\n"
      exit(1)
    end
  end
end

Rake::Task['build'].enhance do
  Rake::Task['yarn:build'].invoke
end