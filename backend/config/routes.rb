Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :users, only: [:index, :create, :show, :update, :destroy]

  # Authentication routes
  post "login", action: :create, controller: "sessions"
  post "signup", action: :create, controller: "users"
  delete "logout", action: :destroy, controller: "sessions"
  get "current_user", action: :me, controller: "sessions"
end
