Rails.application.routes.draw do
  devise_for :users
  root 'movies#index'

  resources :movies
  get '/movies/remove/:id', to: 'movies#remove'

  resources :watch
  get '/watch/remove/:id', to: 'watch#remove'
  # test partial
  get '/watch/test', to: 'watch#test'

  get  '/search',  to: 'movies#search'
  post '/results', to: 'movies#results'
  get  '/results', to: 'movies#results'
end
