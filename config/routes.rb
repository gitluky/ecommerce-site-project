Rails.application.routes.draw do
  root 'home#index'
  resources :categories do
    resources :products
  end
  devise_for :users
end
