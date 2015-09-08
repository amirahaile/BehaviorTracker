require 'rails_helper'

RSpec.describe Location, type: :model do
  describe "Associations" do
    it "belongs to a User" do
      user     = create :user
      location = create :location
      user.locations << location

      expect(user.locations).to include location
    end
  end
end
