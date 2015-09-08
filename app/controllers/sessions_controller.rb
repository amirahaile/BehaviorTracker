class SessionsController < ApplicationController

  def new
    if session[:user_id]
     flash[:notice] = "You're already logged in."
    end
  end

  def create # login
    if find_user && authenticate
      session[:user_id] = @user.id
      redirect_to new_location_path
    else
      flash[:notice] = "That email or password does not match our records."
      render :new
    end
  end

  private

  def find_user
    if User.find_by(email: params[:session][:email])
      @user = User.find_by(email: params[:session][:email])
      return true
    else
      false
    end
  end

  def authenticate
    if @user.authenticate(params[:session][:password])
      true
    else
      false
    end
  end
end
