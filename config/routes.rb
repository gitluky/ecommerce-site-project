Rails.application.routes.draw do
  resources :carts
  resources :line_items
  root 'home#index'
  resources :categories do
    resources :products
  end
  devise_for :users
end
