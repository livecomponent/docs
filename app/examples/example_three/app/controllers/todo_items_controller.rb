# frozen_string_literal: true

class TodoItemsController < ApplicationController
  def update
    @todo_item = TodoItem.find(params[:id])
    @todo_item.update(todo_item_params)
  end

  def create
    @todo_list = TodoList.find(params[:todo_list_id])
    @todo_item = @todo_list.todo_items.create(todo_item_params)
  end

  def destroy
    TodoItem.delete(params[:id])
  end

  private

  def todo_item_params
    params.require(:todo_item).permit(:text)
  end
end
