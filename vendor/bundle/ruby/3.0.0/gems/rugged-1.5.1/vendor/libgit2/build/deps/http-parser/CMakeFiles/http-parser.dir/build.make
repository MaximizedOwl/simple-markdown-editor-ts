# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/local/Cellar/cmake/3.25.2/bin/cmake

# The command to remove a file.
RM = /usr/local/Cellar/cmake/3.25.2/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build

# Include any dependencies generated for this target.
include deps/http-parser/CMakeFiles/http-parser.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include deps/http-parser/CMakeFiles/http-parser.dir/compiler_depend.make

# Include the progress variables for this target.
include deps/http-parser/CMakeFiles/http-parser.dir/progress.make

# Include the compile flags for this target's objects.
include deps/http-parser/CMakeFiles/http-parser.dir/flags.make

deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o: deps/http-parser/CMakeFiles/http-parser.dir/flags.make
deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o: /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/deps/http-parser/http_parser.c
deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o: deps/http-parser/CMakeFiles/http-parser.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o"
	cd /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser && /Library/Developer/CommandLineTools/usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -MD -MT deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o -MF CMakeFiles/http-parser.dir/http_parser.c.o.d -o CMakeFiles/http-parser.dir/http_parser.c.o -c /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/deps/http-parser/http_parser.c

deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/http-parser.dir/http_parser.c.i"
	cd /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser && /Library/Developer/CommandLineTools/usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/deps/http-parser/http_parser.c > CMakeFiles/http-parser.dir/http_parser.c.i

deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/http-parser.dir/http_parser.c.s"
	cd /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser && /Library/Developer/CommandLineTools/usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/deps/http-parser/http_parser.c -o CMakeFiles/http-parser.dir/http_parser.c.s

http-parser: deps/http-parser/CMakeFiles/http-parser.dir/http_parser.c.o
http-parser: deps/http-parser/CMakeFiles/http-parser.dir/build.make
.PHONY : http-parser

# Rule to build all files generated by this target.
deps/http-parser/CMakeFiles/http-parser.dir/build: http-parser
.PHONY : deps/http-parser/CMakeFiles/http-parser.dir/build

deps/http-parser/CMakeFiles/http-parser.dir/clean:
	cd /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser && $(CMAKE_COMMAND) -P CMakeFiles/http-parser.dir/cmake_clean.cmake
.PHONY : deps/http-parser/CMakeFiles/http-parser.dir/clean

deps/http-parser/CMakeFiles/http-parser.dir/depend:
	cd /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2 /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/deps/http-parser /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser /Users/makiokarasawa/Documents/Sandbox/simple-markdown-editor-ts/vendor/bundle/ruby/3.0.0/gems/rugged-1.5.1/vendor/libgit2/build/deps/http-parser/CMakeFiles/http-parser.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : deps/http-parser/CMakeFiles/http-parser.dir/depend

