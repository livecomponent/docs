Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "pages#overview"

  get "/overview", to: "pages#overview", as: :overview
  get "/getting-started", to: "pages#getting_started", as: :getting_started
  get "/todo-list-app/your-first-component", to: "pages#your_first_component", as: :your_first_component
  get "/todo-list-app/live-component-and-hotwire", to: "pages#live_component_and_hotwire", as: :live_component_and_hotwire
  get "/todo-list-app/adding-new-todos", to: "pages#adding_new_todos", as: :adding_new_todos
  get "/todo-list-app/removing-todos", to: "pages#removing_todos", as: :removing_todos
  get "/todo-list-app/putting-it-all-together", to: "pages#putting_it_all_together", as: :putting_it_all_together
  get "/state-tracking", to: "pages#state_tracking", as: :state_tracking
  get "/slots", to: "pages#slots", as: :slots
  get "/serialization", to: "pages#serialization", as: :serialization
  get "/reflexes", to: "pages#reflexes", as: :reflexes
  get "/lifecycle-hooks", to: "pages#lifecycle_hooks", as: :lifecycle_hooks
  get "/react-integration", to: "pages#react_integration", as: :react_integration

  resources :examples, param: :name, only: [:show]
  resources :todo_items
end
