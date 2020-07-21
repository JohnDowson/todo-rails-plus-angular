class TodoController < ApplicationController
  def create
    todo = params.require(:todo).permit(:text, :completed, :project_id)
    todo = Todo.create(todo)
    render json: todo.json()
    end

  def update
    id = params.require(:id)
    todo = params.require(:todo).permit(:text, :completed, :project_id)
    Todo.find_by(id: id).update!(todo)
  end
end
