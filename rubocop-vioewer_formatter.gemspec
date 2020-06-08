# frozen_string_literal: true

lib = File.expand_path('lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name        = 'rubocop-viewer_formatter'
  gem.version     = '1.0.1'
  gem.authors     = ['Edward Rudd']
  gem.email       = ['urkle@outoforder.cc']
  gem.description = 'A formatter for rubocop that generates a vue based-interactive app'
  gem.summary     = 'A formatter for rubocop that generates a vue based-interactive app'
  gem.homepage    = 'https://github.com/outoforder/rubocop-viewer_formatter'
  gem.license     = 'MIT'

  gem.files = `git ls-files`.split($INPUT_RECORD_SEPARATOR)
  gem.files.reject! {|fn| fn.include? "viewer/"}
  gem.files += ['viewer/dist/js/app.js']

  gem.executables   = gem.files.grep(%r{^bin/}).map {|f| File.basename(f)}
  gem.test_files    = gem.files.grep(%r{^(spec|features)/})
  gem.require_paths = ['lib']

  gem.add_dependency 'rubocop', '>= 0.70'
  gem.add_development_dependency 'bundler', '~> 1.3'
  gem.add_development_dependency 'rake', '~> 13.0'
  gem.add_development_dependency 'rspec', '~> 3.9.0'
end
