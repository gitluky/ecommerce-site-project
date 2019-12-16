Rails.application.routes.draw do

  root 'home#index'

  get '/navbar', to: 'home#navbar'
  get '/csrf', to: 'home#csrf'

  resources :orders, only: [:index, :edit, :update]
  get '/checkout', to: 'orders#new'
  post '/process_order', to: 'orders#create'
  get '/success', to: 'orders#success'
  get '/cancelled', to: 'orders#cancelled'

  resources :shipping_addresses, only: [:create, :update, :destroy]
  get '/shipping_addresses/:id/remove_address', to: 'shipping_addresses#remove_address', as: 'remove_address'
  get '/shipping_addresses/user_addresses', to: 'shipping_addresses#user_addresses', as: 'user_addresses'

  resources :carts, only: [:show]

  resources :line_items, only: [:create, :show, :update]

  resources :categories do
    resources :products
  end

  get '/products/search', to: 'products#search'
  resources :products, only: [:index, :show]


  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

end
