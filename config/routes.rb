Rails.application.routes.draw do
  resources :products
  root 'application#index'
  devise_for :users
end
