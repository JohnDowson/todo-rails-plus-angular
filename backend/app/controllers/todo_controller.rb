class TodoController < ApplicationController
  def create
    Todo.create(
      text: params[:text],
      completed: params[:completed],
      project: Project.find_by(id: params[:project_id])
    )
    end

  def update
    id = params.require(:id)
    todo = params.require(:todo).permit(:text, :completed, :project_id)
    Todo.find_by(id: id).update!(todo)
  end
end
