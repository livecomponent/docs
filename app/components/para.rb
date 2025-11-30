# frozen_string_literal: true

class Para < TextBlock
  def initialize(**system_arguments)
    @system_arguments = system_arguments.merge(font_size: 4, p: 0, m: 0)
  end
end
