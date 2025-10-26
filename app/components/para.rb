# frozen_string_literal: true

class Para < ApplicationComponent
  def initialize(**system_arguments)
    @system_arguments = system_arguments
  end

  def call
    render(Primer::Beta::Text.new(tag: :p, font_size: 4, p: 0, m: 0, **@system_arguments)) { rendered_content }
  end

  private

  def rendered_content
    content
      .gsub(/`([^`]+)`/) do
        Code.new.with_content($1).render_in(view_context)
      end
      .html_safe
  end
end
