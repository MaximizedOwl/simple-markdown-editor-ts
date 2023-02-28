# -*- encoding: utf-8 -*-
# stub: licensed 4.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "licensed".freeze
  s.version = "4.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["GitHub".freeze]
  s.bindir = "exe".freeze
  s.date = "2023-02-08"
  s.description = "Licensed automates extracting and validating the licenses of dependencies.".freeze
  s.email = ["opensource+licensed@github.com".freeze]
  s.executables = ["licensed".freeze]
  s.files = ["exe/licensed".freeze]
  s.homepage = "https://github.com/github/licensed".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6.0".freeze)
  s.rubygems_version = "3.2.15".freeze
  s.summary = "Extract and validate the licenses of dependencies.".freeze

  s.installed_by_version = "3.2.15" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<licensee>.freeze, ["~> 9.16"])
    s.add_runtime_dependency(%q<thor>.freeze, ["~> 1.2"])
    s.add_runtime_dependency(%q<pathname-common_prefix>.freeze, ["~> 0.0.1"])
    s.add_runtime_dependency(%q<tomlrb>.freeze, ["~> 2.0"])
    s.add_runtime_dependency(%q<ruby-xxHash>.freeze, ["~> 0.4.0"])
    s.add_runtime_dependency(%q<parallel>.freeze, ["~> 1.22"])
    s.add_runtime_dependency(%q<reverse_markdown>.freeze, ["~> 2.1"])
    s.add_runtime_dependency(%q<json>.freeze, ["~> 2.6"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_development_dependency(%q<minitest>.freeze, ["~> 5.17"])
    s.add_development_dependency(%q<mocha>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<rubocop-github>.freeze, ["~> 0.20"])
    s.add_development_dependency(%q<byebug>.freeze, ["~> 11.1"])
  else
    s.add_dependency(%q<licensee>.freeze, ["~> 9.16"])
    s.add_dependency(%q<thor>.freeze, ["~> 1.2"])
    s.add_dependency(%q<pathname-common_prefix>.freeze, ["~> 0.0.1"])
    s.add_dependency(%q<tomlrb>.freeze, ["~> 2.0"])
    s.add_dependency(%q<ruby-xxHash>.freeze, ["~> 0.4.0"])
    s.add_dependency(%q<parallel>.freeze, ["~> 1.22"])
    s.add_dependency(%q<reverse_markdown>.freeze, ["~> 2.1"])
    s.add_dependency(%q<json>.freeze, ["~> 2.6"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.17"])
    s.add_dependency(%q<mocha>.freeze, ["~> 2.0"])
    s.add_dependency(%q<rubocop-github>.freeze, ["~> 0.20"])
    s.add_dependency(%q<byebug>.freeze, ["~> 11.1"])
  end
end
