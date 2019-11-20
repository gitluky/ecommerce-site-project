Rails.application.routes.draw do
  resources :orders, only: [:index, :edit, :update]
  resources :shipping_addresses
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

  get '/shipping_addresses/:id/remove_address', to: 'shipping_addresses#remove_address', as: 'remove_address'
  get '/navbar', to: 'home#navbar'
  get '/csrf', to: 'home#csrf'
  post '/products/search', to: 'products#search'
  get '/checkout', to: 'orders#new'
  post '/process_order', to: 'orders#create'
  get '/success', to: 'orders#success'
  get '/cancelled', to: 'orders#cancelled'
end
