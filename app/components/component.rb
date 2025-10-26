# frozen_string_literal: true

class Component < ViewComponent::Base
  def initialize(instance:)
    @instance = instance
  end

  def call
    render(@instance)
  end
end
