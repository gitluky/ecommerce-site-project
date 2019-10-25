Rails.application.routes.draw do
  resources :categories
  resources :products
  root 'application#index'
  devise_for :users
end
