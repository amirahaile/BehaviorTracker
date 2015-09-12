class LocationsController < ApplicationController
  before_action :require_login, only: [:index]

  def index
    @user = User.find(session[:user_id])
  end

  def new; end

  def create
    location = Location.create(latitude: params[:latitude],
                               longitude: params[:longitude])
    user = User.find(session[:user_id])
    user.locations << location

    # 500 error - missing template locations#create
    # NOTE: is 'render' right though?
    render :new
  end

  def show
    @location = Location.find(params[:id])
  end

  def destroy
    location = Location.find(params[:id])
    location.destroy
    redirect_to locations_path
  end
end
