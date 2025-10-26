# frozen_string_literal: true

class FileBrowser
  class Package
    attr_reader :entries

    def self.instance
      @instance ||= new.tap do |inst|
        path, _ = Object.const_source_location(self.name)
        dir = path.chomp(".rb")

        Dir.chdir(dir) do
          Dir.glob(File.join("**", "*.*")) do |relative_path|
            inst.add_file(prefix: dir, relative_path: relative_path)
          end
        end
      end
    end

    private def initialize
      @entries = []
    end

    def add_entry(entry)
      @entries << entry
    end

    def add_file(prefix:, relative_path:)
      add_entry(
        FileEntry.new(
          prefix: prefix,
          relative_path: relative_path
        )
      )
    end
  end
end
