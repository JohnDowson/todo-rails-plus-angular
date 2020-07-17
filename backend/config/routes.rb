Rails.application.routes.draw do
  get '/projects', to: 'project#index'
  post '/todos', to: 'todo#create'
  patch '/todos/:id', to: 'todo#update'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
