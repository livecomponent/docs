# frozen_string_literal: true

class FileNode < Primer::Alpha::TreeView::LeafNode
  def initialize(file_browser:, path:, current_path:, file_content: "", **system_arguments)
    @file_browser = file_browser
    @path = path

    @file_browser.add_file_content(@path, file_content)
    puts "path: #{path}, current_path: #{current_path}"

    super(
      path: path,
      current: path == current_path,
      **system_arguments
    )
  end

  def before_render
    icon = case File.extname(@label)
    when ".rb"
      RubyIcon.new
    when ".ts"
      TypescriptIcon.new
    when ".js"
      JavascriptIcon.new
    when ".erb"
      ErbIcon.new
    end

    if icon
      slot = ViewComponent::Slot.new(self)
      slot.__vc_component_instance = Primer::Alpha::TreeView::Visual.new(
        id: leading_visual_label_id,
        visual: icon
      )
      @__vc_set_slots ||= {}
      @__vc_set_slots[:leading_visual] = slot
    else
      with_leading_visual_icon(icon: :file)
    end
  end
end
