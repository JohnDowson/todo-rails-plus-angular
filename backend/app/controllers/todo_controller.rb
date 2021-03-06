class TodoController < ApplicationController
  def create
    todo = params.require(:todo).permit(:text, :completed, :project_id)
    todo = Todo.create(todo)
    if todo.invalid?
      head :bad_request
    else
      render json: todo.json
    end
  end

  def update
    id = params.require(:id)
    todo = params.require(:todo).permit(:text, :completed, :project_id)
    Todo.find_by(id: id).update!(todo)
  end

  def delete
    id = params.require(:id)
    Todo.find_by(id: id).delete
  end
end
