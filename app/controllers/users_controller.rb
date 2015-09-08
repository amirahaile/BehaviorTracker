class UsersController < ApplicationController
  before_action :require_login, except: [:index, :new, :create]

  def index; end

  def new
    @user = User.new
    flash[:notice] = "You're already logged in." if session[:user_id]
  end

  def create
    @user = User.new(permit_params)

    if @user.save
      session[:user_id] = @user.id # logged in
      redirect_to new_location_path
    else
      render :new
    end
  end

  private

  def permit_params
    params.require(:user).permit(:first_name, :last_name, :email,
                                 :password, :password_confirmation)
  end
end
