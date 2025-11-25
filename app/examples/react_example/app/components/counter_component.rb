class CounterComponent < ViewComponent::Base
  include LiveComponent::Base

  def initialize(**kwargs)
    @kwargs = kwargs
  end
end
