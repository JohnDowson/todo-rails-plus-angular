class ProjectController < ApplicationController
  def index
    render json: Project.all.map { |proj| proj.json }
  end
  def create
    project = params.require(:project).permit(:title)
    render json: Project.create(project).json
  end
  def delete
    id = params.require(:id)
    project = Project.find_by(id: id)
    project.destroy
  end
end
