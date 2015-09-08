require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "GET new" do
    it "sends a notice if you're already logged in" do
      user = create :user
      session[:user_id] = user.id
      get :new

      expect(flash[:notice]).to eq "You're already logged in."
    end
  end

  describe "POST create" do
    let (:valid_user) { { :user => { first_name: "Rose", last_name: "Nylund",
                          email: "betty@goldengirls.com", password: "i<3stOlaf",
                          password_confirmation: "i<3stOlaf" } } }
    let (:invalid_user) { { :user => { first_name: nil, last_name: "Nylund",
                          email: nil, password: "i<3stOlaf",
                          password_confirmation: nil } } }

    it "saves a valid User object" do
      post :create, valid_user
      expect(User.all.count).to eq 1
    end

    it "doesn't save an invalid User object" do
      post :create, invalid_user
      expect(User.all.count).to eq 0
    end

    it "redirects valid User objects to new_location_path" do
      post :create, valid_user
      expect(response).to redirect_to new_location_path
    end

    it "invalid User objects go back to render the form" do
      post :create, invalid_user
      expect(response).to render_template :new
    end
  end
end
