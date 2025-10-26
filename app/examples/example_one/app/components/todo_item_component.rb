class TodoItemComponent < ApplicationComponent
  include LiveComponent::Base

  def initialize(todo_item:, editing: false)
    @todo_item = todo_item
    @editing = editing
  end
end
