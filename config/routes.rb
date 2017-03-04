Rails.application.routes.draw do
  devise_for :users

  root 'movies#index'
  resources :movies
  resources :watch

  get  '/search',  to: 'movies#search'
  post '/results', to: 'movies#results'
  get  '/results', to: 'movies#results'

  get '/movies/remove/:id', to: 'movies#remove'
  get '/watch/remove/:id', to: 'watch#remove'

end
