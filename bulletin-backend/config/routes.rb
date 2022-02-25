Rails.application.routes.draw do
  root "login#login"

  post "/login", to: "users#login"
  post "/posts/import", to: "posts#import_csv"
  resources :users
  resources :posts
end
