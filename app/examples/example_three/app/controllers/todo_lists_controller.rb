class TodoListsController < ApplicationController
  def show
    @todo_list = TodoList
      .includes(:todo_items)
      .find(params[:id])
  end
end
