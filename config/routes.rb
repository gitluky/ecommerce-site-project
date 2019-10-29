Rails.application.routes.draw do
  resources :carts, only: [:show]
  resources :line_items, only: [:create, :update, :destroy]
  root 'home#index'
  resources :categories do
    resources :products
  end
  devise_for :users
end
