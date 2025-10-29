# frozen_string_literal: true

class PagesController < ApplicationController
  def overview
    @nav_selected_item_id = :overview
  end

  def getting_started
    @nav_selected_item_id = :getting_started
  end

  def your_first_component
    @nav_selected_item_id = :your_first_component
    render "pages/todo_list_app/your_first_component"
  end

  def live_component_and_hotwire
    @nav_selected_item_id = :live_component_and_hotwire
    render "pages/todo_list_app/live_component_and_hotwire"
  end

  def adding_new_todos
    @nav_selected_item_id = :adding_new_todos
    render "pages/todo_list_app/adding_new_todos"
  end

  def removing_todos
    @nav_selected_item_id = :removing_todos
    render "pages/todo_list_app/removing_todos"
  end

  def putting_it_all_together
    @nav_selected_item_id = :putting_it_all_together
    render "pages/todo_list_app/putting_it_all_together"
  end

  def state_tracking
    @nav_selected_item_id = :state_tracking
  end
end
