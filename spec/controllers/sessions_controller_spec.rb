require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe "POST create" do
    context "valid login" do
      before :each do
        create :user
      end

      let(:params) { { session: { email: "betty@goldengirls.com",
                                  password: "i<3stOlaf" } } }

      it "sets the session's user_id" do
        post :create, params
        expect(session[:user_id]).to eq 1
      end

      it "redirects to new_location_path" do
        post :create, params
        expect(response).to redirect_to new_location_path
      end
    end

    context "invalid login" do
      let(:params) { { session: { email: "betty@goldengirls.com",
                                  password: "i<3stOlaf" } } }

      it "sends a flash notice" do
        post :create, params
        expect(flash[:notice]).to eq "That email or password does not match our records."
      end

      it "renders the form again" do
        post :create, params
        expect(response).to render_template :new
      end
    end
  end
end
