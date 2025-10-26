# frozen_string_literal: true

class DirectoryNode < Primer::Alpha::TreeView::SubTreeNode
  def initialize(file_browser:, current_path:, icon_arguments: nil, expanded_icon_arguments: nil, collapsed_icon_arguments: nil, **system_arguments)
    @file_browser = file_browser
    @current_path = current_path
    @expanded_icon_arguments = expanded_icon_arguments || icon_arguments || {}
    @collapsed_icon_arguments = collapsed_icon_arguments || icon_arguments || {}

    super(**system_arguments)
  end

  def with_directory(**system_arguments, &block)
    with_sub_tree(
      **system_arguments,
      component_klass: self.class,
      file_browser: @file_browser,
      current_path: @current_path,
      &block
    )
  end

  def with_file(**system_arguments, &block)
    with_leaf(
      **system_arguments,
      component_klass: FileNode,
      file_browser: @file_browser,
      current_path: @current_path,
      &block
    )
  end
end
