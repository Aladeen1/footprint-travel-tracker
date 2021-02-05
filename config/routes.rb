Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'flights#new'
  resources :flights, only: [:new, :create, :destroy]
  resources :users, only: [:show,:update]
  resources :rankings, only: [:new, :show, :create]
  resources :contest_registrations, only: [:create, :destroy]
end
