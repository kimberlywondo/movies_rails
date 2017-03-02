Rails.application.routes.draw do
  devise_for :users
  root 'movies#index'
  resources :movies
  get  '/search',  to: 'movies#search'
  post '/results', to: 'movies#results'
  get  '/results', to: 'movies#results'
end
