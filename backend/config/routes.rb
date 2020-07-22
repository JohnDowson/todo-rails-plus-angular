Rails.application.routes.draw do
  get '/projects', to: 'project#index'
  post 'projects', to: 'project#create'
  delete '/projects/:id', to: 'project#delete'
  post '/todos', to: 'todo#create'
  patch '/todos/:id', to: 'todo#update'
  delete '/todos/:id', to: 'todo#delete'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
