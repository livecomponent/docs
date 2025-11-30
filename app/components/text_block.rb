# frozen_string_literal: true

class TextBlock < ApplicationComponent
  def initialize(**system_arguments)
    @system_arguments = system_arguments
  end

  def call
    render(Primer::Beta::Text.new(tag: tag, **@system_arguments)) { rendered_content }
  end

  def tag
    :span
  end

  private

  def rendered_content
    content
      .gsub(/`([^`]+)`/) do
        Code.new.with_content($1.html_safe).render_in(view_context)
      end
      .html_safe
  end
end
