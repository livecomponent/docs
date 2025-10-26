# frozen_string_literal: true

class FileBrowser
  class FileEntry
    attr_reader :prefix, :relative_path

    def initialize(prefix:, relative_path:)
      @prefix = prefix
      @relative_path = relative_path
    end

    def contents
      @contents ||= File.read(absolute_path)
    end

    def absolute_path
      @absolute_path ||= File.join(prefix, relative_path)
    end
  end
end
