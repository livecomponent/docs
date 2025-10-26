# frozen_string_literal: true

class ExamplesController < ApplicationController
  def show
    example_name = params[:name]
    example_path = File.join("examples", example_name, "index")
    render example_path, layout: "examples"
  end
end
