class UsersController < ApplicationController
  before_action :require_login, except: [:index, :new, :create]

  def index; end

  def new
    @user = User.new
    flash[:notice] = "You're already logged in." if session[:user_id]
  end
end
