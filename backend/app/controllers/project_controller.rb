class ProjectController < ApplicationController
  def index
    render json: Project.all.map { |proj| proj.json }
  end
  def create
    project = params.require(:project).permit(:text)
    render json: Project.create(project).json
  end
end
