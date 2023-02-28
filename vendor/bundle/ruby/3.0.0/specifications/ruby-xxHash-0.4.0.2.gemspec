# -*- encoding: utf-8 -*-
# stub: ruby-xxHash 0.4.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "ruby-xxHash".freeze
  s.version = "0.4.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Justin W Smith".freeze]
  s.date = "2022-02-01"
  s.description = "A pure Ruby implementation of xxhash.".freeze
  s.email = ["justin.w.smith@gmail.com".freeze]
  s.homepage = "https://github.com/justinwsmith/ruby-xxhash".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.2.15".freeze
  s.summary = "A pure Ruby implementation of xxhash.".freeze

  s.installed_by_version = "3.2.15" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  else
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
  end
end
