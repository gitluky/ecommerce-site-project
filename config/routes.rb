Rails.application.routes.draw do
  resources :carts, only: [:show]
  resources :line_items, only: [:create, :update, :destroy]
  root 'home#index'
  resources :categories do
    resources :products
  end
  resources :products
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end
