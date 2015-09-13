require 'rails_helper'

RSpec.describe LocationsController, type: :controller do
  describe "GET #index" do
    it "finds the user" do
      user = create :user
      session[:user_id] = user.id
      get :index

      # expect(:user).to be user
    end
  end

  describe "POST #create" do
    before :each do
      @user = create :user
      session[:user_id] = @user.id
      @params = { latitude: 48.86770, longitude: 2.35092 }
    end


    it "creates a new instance of Location" do
      num_of_locations = Location.all.count
      post :create, @params

      expect(Location.all.count).to be num_of_locations + 1
    end

    it "creates an association between the user and instance of Location" do
      post :create, @params
      expect(@user.locations.count).to be 1
    end

    it "renders the new view" do

    end
  end

  describe "GET #show" do
    it "finds the location" do
      location = create :location
      params = { id: location.id }
      get :show, params

      expect(:location).to be location
    end
  end

  describe "DELETE #destroy" do
    before :each do
      @location = create :location
      @params = { id: @location.id }
    end

    it "finds the location" do
      get :destroy, @params
      expect(:location).to be @location
    end

    it "deletes the location instance" do
      num_of_locations = Location.all.count
      get :destroy, @params

      expect(Location.all.count).to be num_of_locations - 1
    end

    it "redirects to the location index view" do
      get :destroy, @params
      expect(response).to redirect_to locations_path
    end
  end
end
